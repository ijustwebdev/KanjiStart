import React, {useEffect, useState} from "react"
import Kanji from "./Kanji.js"
import Meanings from "./Meanings.js"
import Footer from "./Footer.js"

export default function App(){

    // create our state and setstate that holds the current kanji
    const [currentKanji, setCurrentKanji] = useState({})
    // fetch a kanji, will be randomized later unless I can think of 
    // an easy search method. maybe random but by grade or other category
    useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('https://kanjiapi.dev/v1/kanji/裁')
        const newData = await response.json()
        setCurrentKanji(newData)
        }
        fetchData()
    },[])

    return(
        <div id="flexWrapper">
            <Kanji character={currentKanji}/> 
            <Meanings character={currentKanji}/> 
            <Footer character={currentKanji}/> 
        </div>
    )
}