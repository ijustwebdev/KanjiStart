import React from "react"

export default function Kanji(props){
    return(
        <div id="coloredBgAndKanji" style={{backgroundColor: props.colorSettings.secondary}}>
            <span id="kanjiCharacter" style={{color: props.colorSettings.primary}}>{props.character.kanji}</span>
        </div>
    )
}