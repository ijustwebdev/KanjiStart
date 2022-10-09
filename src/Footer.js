import React from "react"

export default function Footer(){
    return(
        <div id="footer">
            <span class="material-symbols-outlined" id="searchIcon">search</span>
            <span id="searchLinkText">Open Jisho to search for this kanji</span>
            <div id="icons">
                <img src="Assets/settings.png" alt="Settings Button"></img>
                {/* <img src="./Assets/github.png" alt="Github Link"></img> */}
            </div>
        </div>
    )
}