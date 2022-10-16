import React from "react"
import settingsIcon from "./Assets/settings.png"
import reactIcon from "./Assets/GitHub-Mark-Light-32px.png"

export default function Footer(props){
    // %20 is url encoded space. %23 is url encoded #. required to grab the right page on jisho.
    const url = `http://www.jisho.org/search/${props.character.kanji}%20%23kanji`
    return(
        <div id="footer">
            <div id="centerFooter">
                <a href={url}>
                <span className="material-symbols-outlined" id="searchIcon">search</span>
                <span id="searchLinkText">Open Jisho to search for this kanji</span>
                </a>
            </div>
            <div id="icons">
                <img src={settingsIcon} alt="Settings Button" className="icon"></img>
                <img src={reactIcon} alt="Github Link" className="icon"></img>
            </div>
        </div>
    )
}