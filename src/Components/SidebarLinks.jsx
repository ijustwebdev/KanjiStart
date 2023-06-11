import React from "react"
import settingsIcon from "../Assets/settings.png"
import reactIcon from "../Assets/GitHub-Mark-Light-32px.png"
import paletteIcon from "../Assets/colorW.png"
import { isDarkColor } from "is-dark-color/dist/isDarkColor"


export default function SidebarLinks(props){

    let iconLight 
    if(isDarkColor(props.colorSettings.secondary)){
        iconLight = false
    }
    else if(!isDarkColor(props.colorSettings.secondary)){
        iconLight = true
    }


    return(
        <div id="sidebar">
                <button className="icon" id="settingsButton" onClick={props.settingsOnClick}>
                    <img src={settingsIcon} alt="Settings Button" style={{filter: iconLight ? "invert(1)"  : "none"}}></img>
                </button>
                <button className="icon" id="settingsButton" onClick={props.colorOnClick}>
                    <img src={paletteIcon} alt="Color Button" style={{filter: iconLight ? "invert(1)"  : "none"}} ></img>
                </button>
                <a className="icon" href="https://github.com/ijustwebdev">
                    <img src={reactIcon} alt="Github Link" style={{filter: iconLight ? "invert(1)"  : "none"}} ></img>
                </a>
        </div>
    )
}