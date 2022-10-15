import React from "react"
import settingsIcon from "./Assets/settings.png"
import reactIcon from "./Assets/GitHub-Mark-Light-32px.png"

export default function Footer(){
    return(
        <div id="footer">
            <div id="centerFooter">
                <a href="www.google.com">
                <span className="material-symbols-outlined" id="searchIcon">search</span>
                <span id="searchLinkText">Open Jisho to search for this kanji</span>
                </a>
            </div>
            <div id="icons">
                <img src={settingsIcon} alt="Settings Button" id="settingsIcon"></img>
                <img src={reactIcon} alt="Github Link" id="githubIcon"></img>
            </div>
        </div>
    )
}