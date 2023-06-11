import React from "react"

export default function Kanji(props){
    return(
        <div id="coloredBgAndKanji" style={{backgroundColor: props.colorSettings.primary}}>
            <span id="kanjiCharacter" style={{color: props.colorSettings.secondary}}>{props.character.kanji}</span>
        </div>
    )
}