import React from "react"
import settingsIcon from "../Assets/settings.png"
import reactIcon from "../Assets/GitHub-Mark-Light-32px.png"

export default function SidebarLinks(props){
    return(
        <div id="sidebar">
                <button className="icon" id="settingsButton" onClick={props.onClick}>
                    <img src={settingsIcon} alt="Settings Button"></img>
                </button>
                <a className="icon" href="https://github.com/ijustwebdev">
                    <img src={reactIcon} alt="Github Link"></img>
                </a>
        </div>
    )
}