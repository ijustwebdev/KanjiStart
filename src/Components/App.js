import React, {useEffect, useState} from "react"
import Kanji from "./Kanji.js"
import Meanings from "./Meanings.js"
import SidebarLinks from "./SidebarLinks.js"
import SettingsModal from "./SettingsModal.js"
import anime from "animejs/lib/anime.es.js"

export default function App(){
    // TODO hour interval to grab a new kanji at
    const [currentKanji, setCurrentKanji] = useState(
        JSON.parse(localStorage.getItem("kanjiobj")) || null
    )
    const [showingMeanings, setShowingMeanings] = useState(false)
    const [showingModal, setShowingModal] = useState(false)
    const [settingsData, setSettingsData] = useState(
        JSON.parse(localStorage.getItem("settingsData")) || null
    )

    // currently checks to see if we have some state in currentKanji and settingsData and if not populates with some default data.
    if(currentKanji == null){
        const fetchData = async () => {
            const response = await fetch('https://kanjiapi.dev/v1/kanji/蛍')
            const newData = await response.json()
            // sets our localstorage and currentKanji object to be the data we just got back from the fetch request
            localStorage.setItem("kanjiobj", JSON.stringify(newData))
            setCurrentKanji(newData)
            }
        fetchData()
    }
    // check if we have settings, if not generate them and store them in localStorage then set our settingsData default state.
    if(settingsData == null){
        const data = {
            grade1: true,
            grade2: true,
            grade3: true,
            grade4: true,
            grade5: true,
            grade6: true,
            hourInterval: 12
        }
        setSettingsData(data)
        localStorage.setItem("settingsData", JSON.stringify(data))
    }


    // ? I guess I don't understand useEffect or what it's supposed to be used for. 
    // useEffect((settingsData) => { 
    //     if(currentKanji == null){
    //         const fetchData = async () => {
    //             const response = await fetch('https://kanjiapi.dev/v1/kanji/蛍')
    //             const newData = await response.json()
    //             // sets our localstorage and currentKanji object to be the data we just got back from the fetch request
    //             localStorage.setItem("kanjiobj", JSON.stringify(newData))
    //             setCurrentKanji(newData)
    //             }
    //             fetchData()
    //         }
    //         // check if we have settings, if not generate them and store them in localStorage then set our settingsData default state.
    //         if(settingsData == null){
    //             const data = {
    //                 grade1: true,
    //                 grade2: true,
    //                 grade3: true,
    //                 grade4: true,
    //                 grade5: true,
    //                 grade6: true,
    //                 hourInterval: 12
    //             }
    //             setSettingsData(data)
    //             localStorage.setItem("settingsData", JSON.stringify(data))
    //         }
    // },[currentKanji])

    // function to handle our settings form items being checked or selected.
    function handleChange(event){
        const {name, checked, type, value} = event.target
        setSettingsData(prevSettingsData => {
            return{
                ...prevSettingsData,
                [name]: type === "checkbox" ? checked : parseInt(value)
            }
        })
    }

    // this function just sets the localstorage to what the user has selected in the settings menu
    function handleSubmit(event){
        event.preventDefault()
        localStorage.setItem("settingsData", JSON.stringify(settingsData))
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


    // TODO below is pseudocode for our function that will get a new kanji
    // check if the interval between now and last kanji fetch has elapsed
    // check grades selected
    // pick grade randomly from selected
    // get a random number that maxes out at the .length of that grade object
    // fetch request to kanjiapi for the kanji we just grabbed with our random number
    // .setItem("kanjiobj") with our new kanji data

    //? hardcoded kanji grade object lengths
    // grade1: 80
    // grade2: 160
    // grade3: 200
    // grade4: 200
    // grade5: 185
    // grade6: 181

    return(
        <div id="flexWrapper">
            {currentKanji !== null ? <Kanji character={currentKanji}/> : null} 
            {currentKanji !== null ? <Meanings character={currentKanji} meanings={showingMeanings} onClick={flipMeanings}/> : null}
            {currentKanji !== null ? <SidebarLinks character={currentKanji} onClick={flipModal}/> : null}
            {currentKanji !== null && settingsData.grade1 !== null ? <SettingsModal showingModal={showingModal} onClick={flipModal} handleChange={handleChange} handleSubmit={handleSubmit} settingsData={settingsData}/> : null}
        </div>
    )
}