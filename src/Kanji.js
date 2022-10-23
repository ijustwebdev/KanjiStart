import React from "react"

export default function Kanji(props){
    return(
        <div id="coloredBgAndKanji">
            <span id="kanjiCharacter">{props.character.kanji}</span>
        </div>
    )
}