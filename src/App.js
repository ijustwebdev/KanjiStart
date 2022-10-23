import React, {useEffect, useState} from "react"
import Kanji from "./Kanji.js"
import Meanings from "./Meanings.js"
import SidebarLinks from "./SidebarLinks.js"

export default function App(){
    // TODO: need to have settings stored locally that controls colors, grade of kanji allowed to be grabbed, and anything else
    // TODO: I can think of. 
    const [currentKanji, setCurrentKanji] = useState(
        JSON.parse(localStorage.getItem("kanjiobj")) || null
    )
    const [showingMeanings, setShowingMeanings] = useState(false)
    // fetch a kanji, will be randomized later unless I can think of 
    // an easy search method. maybe random but by grade or other category
    useEffect(() => { 
        if(currentKanji == null){
        const fetchData = async () => {
            const response = await fetch('https://kanjiapi.dev/v1/kanji/近')
            const newData = await response.json()
            localStorage.setItem("kanjiobj", JSON.stringify(newData))
            setCurrentKanji(newData)
            }
            fetchData()
            console.warn("currentKanji Set")
        }
    },[currentKanji, showingMeanings])

    function flipMeanings(){
        setShowingMeanings(prevMeaning => !prevMeaning)
    }


    return(
        <div id="flexWrapper">
            {currentKanji !== null ? <Kanji character={currentKanji}/> : null} 
            {currentKanji !== null ? <Meanings character={currentKanji} meanings={showingMeanings} onClick={flipMeanings}/> : null}
            {currentKanji !== null ? <SidebarLinks character={currentKanji}/> : null}
        </div>
    )
}