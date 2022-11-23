import React, {useState} from "react"
import Kanji from "./Kanji.js"
import Meanings from "./Meanings.js"
import SidebarLinks from "./SidebarLinks.js"
import SettingsModal from "./SettingsModal.js"
import {AnimatePresence} from "framer-motion"
import SettingsBg from "./SettingsBg.js"
import dayjs from "dayjs"

export default function App(){
    
    const [currentKanji, setCurrentKanji] = useState(
        JSON.parse(localStorage.getItem("kanjiobj")) || []
    )
    const [showingMeanings, setShowingMeanings] = useState(false)
    const [showingModal, setShowingModal] = useState(false)

    // : previous call for settingsData. No longer needed.
    // const [settingsData, setSettingsData] = useState(
    //     JSON.parse(localStorage.getItem("settingsData")) || [false]
    // )
    
    const [settingsData, setSettingsData] = useState(() => {
        const localItem = JSON.parse(localStorage.getItem("settingsData"))
        if(localItem){
            console.log("settingsData true. grabbing from localstorage")
            return JSON.parse(localStorage.getItem("settingsData"))
        }
        if(!localItem){
            console.log("settingsData false. creating default settingsData")
            const data = {
                grade1: true,
                grade2: true,
                grade3: true,
                grade4: true,
                grade5: true,
                grade6: true,
                hourInterval: 12
            }
            localStorage.setItem("settingsData", JSON.stringify(data))
            return data
        }
        else{
            console.log("settingsData else fired?")
            return console.log(settingsData)
        }
    })

    // : previously served to generate default settings if we did not have any. no longer needed as our settingsData state is now generated on initialization. 
    // check if we have settings. if not generate defaults and store them in localStorage and settingsData.
    // if(settingsData[0] === false){
    //     const data = {
    //         grade1: true,
    //         grade2: true,
    //         grade3: true,
    //         grade4: true,
    //         grade5: true,
    //         grade6: true,
    //         hourInterval: 12
    //     }
    //     setSettingsData(data)
    //     localStorage.setItem("settingsData", JSON.stringify(data))
    // }

    // check localstorage for a date. if we don't have one set one.
    if(JSON.parse(localStorage.getItem("LastChangedDate")) == null){
        localStorage.setItem("LastChangedDate", JSON.stringify(dayjs()))
    }
    
    // take our grade and pull a random kanji from the list 
    async function getRandomKanji(gradeNum){
        const response = await fetch(`https://kanjiapi.dev/v1/kanji/grade-${gradeNum}`)
        console.warn("api called from getRandomKanji")
        let data = await response.json()
        return Math.floor(Math.random() * data.length) * 1
    }
    
    // take our character and get the info on it
    async function getKanjiInfo(character){
        const response = await fetch(`https://kanjiapi.dev/v1/kanji/${character}`)
        console.warn("api called from getKanjiInfo")
        const data = await response.json()
        localStorage.setItem("kanjiobj", JSON.stringify(data))
        setCurrentKanji(data)
    }
    
    // checks to see if we don't have a currentKanji and calls for a default one. 
    if(currentKanji === null){
        // set first kanji to grab as a default so we're not erroring with undefined when we check for it later. 
        getKanjiInfo("始")
    }

    // gets a random grade. grabs the true booleans. then picks one randomly and returns it.
    function getRandomGrade(){
        const selectedGrades = Object.keys(settingsData).filter(filterObj)
        return Math.floor((Math.random() * selectedGrades.length) + 1)
    }


    // this function is to be called by .filter in our getRandomGrade() function. it returns all "true" keys in our settings object. 
    function filterObj(key){
        if(typeof settingsData[key] === "boolean" && settingsData[key] === true){
            return true
        }
        return false
    }

    // function to handle our settings form items being checked or selected.
    function handleChange(event){
        const {name, checked, type, value} = event.target
        // TODO make a check to ensure we have at least ONE grade selected.
        setSettingsData(prevSettingsData => {
            return{
                ...prevSettingsData,
                [name]: type === "checkbox" ? checked : parseInt(value)
            }
        })
    }
    
    // gets our LastChangedDate from localstorage and checks the difference in hours between that time and now. 
    // if the difference is >= our user's hour interval setting then fetch a new kanji and set the new LastChangedDate.
    // https://day.js.org/docs/en/display/difference for dayjs .diff docs
    if(settingsData.hourInterval){
    const now = dayjs()
        if(now.diff(JSON.parse(localStorage.getItem("LastChangedDate")), "hour") >= settingsData.hourInterval){
            async function getNewKanji(){
                const character = await getRandomKanji(getRandomGrade())
                await getKanjiInfo(character)
                localStorage.setItem("LastChangedDate", JSON.stringify(now))
            }
            getNewKanji()
        }
    }

    // handles submit event in our form and sets the localstorage to what the user has selected in the settings menu when they click submit
    function handleSubmit(event){
        event.preventDefault()
        // if user has less than (somehow) or 0 "true" Booleans in settings they're attempting to select 0 grades. 
        if(Object.keys(settingsData).filter(filterObj).length <= 0){
            // show an error message and let them fix it. 
            alert("Please select at least one grade.")
            return false
        }
        // user has at least one grade selected. save and close the modal.
        localStorage.setItem("settingsData", JSON.stringify(settingsData))
        flipModal()
    }

    // just a function to flip a bool to show/hide our extra information and another to flip the boolean state of our modal
    function flipMeanings(){
        setShowingMeanings(prevMeaning => !prevMeaning)
    }

    function flipModal(){
        setShowingModal(prevModalState => !prevModalState)
    }

    return(
        <div id="flexWrapper">
            {currentKanji ? <Kanji character={currentKanji}/> : <></>} 
            {currentKanji ? <Meanings character={currentKanji} meanings={showingMeanings} onClick={flipMeanings}/> : <></>}
            {currentKanji ? <SidebarLinks character={currentKanji} onClick={flipModal}/> : <></>}
            <AnimatePresence>
            {currentKanji ? <SettingsModal showingModal={showingModal} handleChange={handleChange} handleSubmit={handleSubmit} settingsData={settingsData} key="background2"/>  : <React.Fragment key="background2"></React.Fragment>}
            {currentKanji ? <SettingsBg showingModal={showingModal} onClick={flipModal} key="window2"/> : <React.Fragment key="window2"></React.Fragment>}
            </AnimatePresence>
        </div>
    )
}
