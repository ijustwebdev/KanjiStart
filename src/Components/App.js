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
        JSON.parse(localStorage.getItem("kanjiobj")) || null
    )
    const [showingMeanings, setShowingMeanings] = useState(false)
    const [showingModal, setShowingModal] = useState(false)
    const [settingsData, setSettingsData] = useState(
        JSON.parse(localStorage.getItem("settingsData")) || null
    )

    // check localstorage for a date. if we don't have one set one.
    if(JSON.parse(localStorage.getItem("LastChangedDate")) == null){
        localStorage.setItem("LastChangedDate", JSON.stringify(dayjs()))
    }
    
    async function fetchData(){
        const response = await fetch('https://kanjiapi.dev/v1/kanji/今')
        const newData = await response.json()
        // sets our localstorage and currentKanji object to be the data we just got back from the fetch request
        localStorage.setItem("kanjiobj", JSON.stringify(newData))
        setCurrentKanji(newData)
    }

    // this function is to be called by .filter in our getRandomGrade() function. it returns all "true" keys in our settings object. 
    function filterObj(key){
        if(typeof settingsData[key] === "boolean" && settingsData[key] === true){
            return true
        }
        return false
    }

    // gets a random grade. grabs the true booleans which is logically which grades the user has off/on. then picks one randomly and returns it.
    function getRandomGrade(){
        const selectedGrades = Object.keys(settingsData).filter(filterObj)
        const rand = Math.floor((Math.random() * selectedGrades.length) + 1)
        return rand
    }

    // checks to see if we have some state in currentKanji that does not match null. if not, fetchData().
    if(currentKanji == null){
        fetchData()
    }

    // check if we have settings, if not generate defaults and store them in localStorage and settingsData.
    if(settingsData == null){
        const data = {
            grade1: true,
            grade2: true,
            grade3: true,
            grade4: true,
            grade5: true,
            grade6: true,
            hourInterval: 12,
            grade1length: 80,
            grade2length: 160,
            grade3length: 200,
            grade4length: 200,
            grade5length: 185,
            grade6length: 181
        }
        setSettingsData(data)
        localStorage.setItem("settingsData", JSON.stringify(data))
    }

    // this statement gets our LastChangedDate from localstorage and checks the difference in hours between that time and now. 
    // if it's >= our user's hour interval setting then fetch a new kanji and set the new LastChangedDate.
    const now = dayjs()
    if(now.diff(JSON.parse(localStorage.getItem("LastChangedDate")), "hour") >= settingsData.hourInterval){
        getRandomGrade()
        localStorage.setItem("LastChangedDate", JSON.stringify(now))
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
    
    // this function just sets the localstorage to what the user has selected in the settings menu
    // TODO form validation. require at least one checkbox grade to be selected.
    function handleSubmit(event){
        event.preventDefault()
        // if user has less than (somehow) or equal to 0 "true" Booleans in settings they're attempting to select 0 grades. 
        if(Object.keys(settingsData).filter(filterObj).length <= 0){
            // show an error message and let them fix it. 
            alert("Please select at least one grade.")
            return false
        }
        // user has at least one grade selected. save and close the modal.
        localStorage.setItem("settingsData", JSON.stringify(settingsData))
        flipModal()
    }

    // just a function to flip a bool to show/hide our extra information
    function flipMeanings(){
        setShowingMeanings(prevMeaning => !prevMeaning)
    }

    // another simple function, could have made this more universal somehow but I need to set state for many objects. 
    // need some way to import which useState set function is being called if possible
    function flipModal(){
        setShowingModal(prevModalState => !prevModalState)
        
    }

    return(
        <div id="flexWrapper">
            {currentKanji !== null ? <Kanji character={currentKanji}/> : null} 
            {currentKanji !== null ? <Meanings character={currentKanji} meanings={showingMeanings} onClick={flipMeanings}/> : null}
            {currentKanji !== null ? <SidebarLinks character={currentKanji} onClick={flipModal}/> : null}
            <AnimatePresence>
            {currentKanji !== null && settingsData.grade1 !== null ? <SettingsModal showingModal={showingModal} handleChange={handleChange} handleSubmit={handleSubmit} settingsData={settingsData} key="background2"/>  : null}
            {currentKanji !== null && settingsData.grade1 !== null ? <SettingsBg showingModal={showingModal} onClick={flipModal} key="window2"/> : null}
            </AnimatePresence>
        </div>
    )
}