import React from "react"
import settingsIcon from "./Assets/settings.png"
import reactIcon from "./Assets/GitHub-Mark-Light-32px.png"

export default function SidebarLinks(props){
    return(
        <div id="sidebar">
                <img src={settingsIcon} alt="Settings Button" className="icon"></img>
                <img src={reactIcon} alt="Github Link" className="icon"></img>
        </div>
    )
}