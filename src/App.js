import React, {useEffect, useState} from "react"
import Kanji from "./Kanji.js"
import Meanings from "./Meanings.js"
import Footer from "./Footer.js"

export default function App(){

    const [currentKanji, setCurrentKanji] = useState(
        JSON.parse(localStorage.getItem("kanjiobj")) || {}
    )
    // fetch a kanji, will be randomized later unless I can think of 
    // an easy search method. maybe random but by grade or other category
    useEffect(() => { 
        if(Object.keys(currentKanji).length === 0){
        const fetchData = async () => {
            const response = await fetch('https://kanjiapi.dev/v1/kanji/高')
            const newData = await response.json()
            localStorage.setItem("kanjiobj", JSON.stringify(newData))
            setCurrentKanji(newData)
            }
            fetchData()
            console.warn("currentKanji Set")
        }
        else{
            console.warn("currentKanji Full")
            console.log(currentKanji)
        }
    },[currentKanji])

    return(
        <div id="flexWrapper">
            <Kanji character={currentKanji}/> 
            <Meanings character={currentKanji}/> 
            <Footer character={currentKanji}/> 
        </div>
    )
}