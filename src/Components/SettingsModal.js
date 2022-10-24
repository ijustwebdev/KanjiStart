import React from "react"

export default function SettingsModal(props){

    return(
        <>
        {props.showingModal ? 
        <div id="settingsModal" onClick={props.onClick}>
            <div id="settingsModalWindow" onClick="#">Test Settings Modal Text</div>
        </div> 
        : null}
        </>
    )
}