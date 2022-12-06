// deps and required
import React, {useState} from "react"
import {AnimatePresence} from "framer-motion"
import dayjs from "dayjs"

// components 
import Kanji from "./Kanji.js"
import Meanings from "./Meanings.js"
import SidebarLinks from "./SidebarLinks.js"
import SettingsModal from "./SettingsModal.js"
import ColorMenu from "./ColorMenu.js"
import SettingsBg from "./SettingsBg.js"

export default function App(){
    
    const [currentKanji, setCurrentKanji] = useState(() => {
        const localKanji = JSON.parse(localStorage.getItem("kanjiObj"))
        if(localKanji){
            return localKanji
        }
        if(!localKanji){
            const dataset = ({
                grade: 3,
                jlpt: 3,
                kanji: "始",
                kun_readings: ["はじ.める", "-はじ.める", "はじ.まる"],
                on_readings: ["シ"],
                meanings: ["commence", "begin"],
                stroke_count: 8
            })
            localStorage.setItem("kanjiObj", JSON.stringify(dataset))
            return dataset
        }
    })
    const [showingColorMenu, setShowingColorMenu] = useState(false)
    const [colorSettings, setColorSettings] = useState(() =>{
        const localColorSettings = JSON.parse(localStorage.getItem("colorSettings"))
        if(localColorSettings){
            return localColorSettings
        }
        if(!localColorSettings){
            const color = ({
                primary: "#66669B",
                secondary: "#1E2935"
            })
            localStorage.setItem("colorSettings", JSON.stringify(color))
            return color
        }
    })
    const [showingMeanings, setShowingMeanings] = useState(false)
    const [showingSettingsMenu, setShowingSettingsMenu] = useState(false)

    const [settingsData, setSettingsData] = useState(() => {
        const localItem = JSON.parse(localStorage.getItem("settingsData"))
        if(localItem){
            return localItem
        }
        if(!localItem){
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
            console.log("settingsData else fired something might be wrong?")
            return console.log(settingsData)
        }
    })

    // this conditional first checks to ensure we have settingsData before checking the difference between when this runs and when we last retrieved a new kanji from the api
    // if the difference is >= our user's hour interval setting then fetch and return a new kanji and set the new lastChangedDate to be the current time.
    // https://day.js.org/docs/en/display/difference for dayjs .diff docs
    if(settingsData){
        const now = dayjs()
        if(now.diff(JSON.parse(localStorage.getItem("lastChangedDate")), "hour") >= settingsData.hourInterval){
            async function getNewKanji(){
                const grade = getRandomGrade()
                const character = await getRandomKanji(grade)
                const info = await getKanjiInfo(character)
                localStorage.setItem("lastChangedDate", JSON.stringify(now))
                return info
            }
            getNewKanji()
        }
    }
    else if (!settingsData){
        return console.log("settingsData falsy something's wrong.")
    }

    // check localstorage for a date. if we don't have one set one.
    if(JSON.parse(localStorage.getItem("lastChangedDate")) == null){
        localStorage.setItem("lastChangedDate", JSON.stringify(dayjs()))
    }
    
    // take our grade and pull a random kanji from the list 
    async function getRandomKanji(gradeNum){
        const response = await fetch(`https://kanjiapi.dev/v1/kanji/grade-${gradeNum}`)
        const randomData = await response.json()
        return randomData[Math.floor(Math.random() * randomData.length) * 1]
    }
    
    // take our character and get the info on it
    async function getKanjiInfo(character){
        const response = await fetch(`https://kanjiapi.dev/v1/kanji/${character}`)
        const data = await response.json()
        localStorage.setItem("kanjiObj", JSON.stringify(data))
        setCurrentKanji(data)
    }
    
    // gets a random grade by retrieving the true bools from our settingsData right now. then picks one randomly and returns it.
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
        hideBGandMenus()
    }

    // handles color submission
    function handleColorSubmit(event){
        event.preventDefault()
        localStorage.setItem("colorSettings", JSON.stringify(colorSettings))
        hideBGandMenus()

    }
    
    // just functions to flip state
    function flipMeanings(){
        setShowingMeanings(prevMeaning => !prevMeaning)
    }

    function flipSettingsMenu(){
        setShowingSettingsMenu(prevState => !prevState)
    }

    function hideBGandMenus(){
        setShowingColorMenu(false)
        setShowingSettingsMenu(false)
    }

    function flipColorModal(){
        setShowingColorMenu(prevModalState => !prevModalState)
    }

    // this function sets the color state of the primary or secondary color. I dont know how to make this shorter right now.
    function setColorPrimary(color){
        setColorSettings(prevSettings => {
           return { 
            ...prevSettings,
            primary: color
            }
        })
    }

    function setColorSecondary(color){
        setColorSettings(prevSettings =>{
           return { 
            ...prevSettings,
            secondary: color
            }
        })
    }


    return(
        <div id="flexWrapper" style={{color: colorSettings.primary, backgroundColor: colorSettings.secondary}}>
            {currentKanji ? <Kanji character={currentKanji} colorSettings={colorSettings} /> : <></>} 
            {currentKanji ? <Meanings character={currentKanji} meanings={showingMeanings} onClick={flipMeanings} colorSettings={colorSettings} /> : <></>}
            {currentKanji ? <SidebarLinks character={currentKanji} settingsOnClick={flipSettingsMenu} colorOnClick={flipColorModal} colorSettings={colorSettings}/> : <></>}
            <AnimatePresence>
            
            {currentKanji ? <ColorMenu showingColorMenu={showingColorMenu} colorSettings={colorSettings} setColorPrimary={setColorPrimary} setColorSecondary={setColorSecondary} handleSubmit={handleColorSubmit} key="colorMenu"></ColorMenu> : <React.Fragment key="colorMenu"></React.Fragment>}
            
            {currentKanji ? <SettingsModal showingModal={showingSettingsMenu} handleChange={handleChange} handleSubmit={handleSubmit} settingsData={settingsData} colorSettings={colorSettings} key="background2"/>  : <React.Fragment key="background2"></React.Fragment>}
            {currentKanji ? <SettingsBg showingModal={showingSettingsMenu} onClick={hideBGandMenus} showingColorMenu={showingColorMenu} key="window2"/> : <React.Fragment key="window2"></React.Fragment>}
            </AnimatePresence>
        </div>
    )
}
