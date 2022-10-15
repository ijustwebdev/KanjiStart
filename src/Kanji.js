import React from "react"

export default function Kanji(props){
    return(
        <>
            <span id="kanjiStripe"></span>
            <span id="kanjiCharacter">{props.character.kanji}</span>
        </>
    )
}