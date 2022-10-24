import React, {useEffect, useState} from "react"
import Kanji from "./Kanji.js"
import Meanings from "./Meanings.js"
import SidebarLinks from "./SidebarLinks.js"
import SettingsModal from "./SettingsModal.js"

export default function App(){
    // TODO need to have settings stored locally that controls colors, grade of kanji allowed to be grabbed, and 
    // TODO hour interval to grab a new kanji at
    const [currentKanji, setCurrentKanji] = useState(
        JSON.parse(localStorage.getItem("kanjiobj")) || null
    )
    const [showingMeanings, setShowingMeanings] = useState(false)
    const [showingModal, setShowingModal] = useState(false)
    // fetch a kanji, will be randomized later unless I can think of 
    // an easy search method. maybe random but by grade or other category
    useEffect(() => { 
        if(currentKanji == null){
        const fetchData = async () => {
            const response = await fetch('https://kanjiapi.dev/v1/kanji/近')
            const newData = await response.json()
            // sets our localstorage and currentKanji object to be the data we just got back from the fetch request
            localStorage.setItem("kanjiobj", JSON.stringify(newData))
            setCurrentKanji(newData)
            }
            fetchData()
            //! REMOVE THIS BEFORE WRAPPING UP
            console.warn("currentKanji Set")
        }
    },[currentKanji, showingMeanings])

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
    // TODO find out .length() of each grade object and hardcode them for our random number gen here since a request every time to get the length sux
    // get a random number that maxes out at the .length of that grade object
    // fetch request to kanjiapi for the kanji we just grabbed with our random number
    // .setItem("kanjiobj") with our new kanji data

    return(
        <div id="flexWrapper">
            {currentKanji !== null ? <Kanji character={currentKanji}/> : null} 
            {currentKanji !== null ? <Meanings character={currentKanji} meanings={showingMeanings} onClick={flipMeanings}/> : null}
            {currentKanji !== null ? <SidebarLinks character={currentKanji} onClick={flipModal}/> : null}
            {currentKanji !== null ? <SettingsModal showingModal={showingModal} onClick={flipModal}/> : null}
        </div>
    )
}