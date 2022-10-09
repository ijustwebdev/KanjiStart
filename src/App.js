import React from "react"
import Kanji from "./Kanji.js"
import Meanings from "./Meanings.js"
import Footer from "./Footer.js"

export default function App(){
    return(
        <div id="flexWrapper">
        <Kanji />
        <Meanings />
        <Footer />
        </div>
    )
}