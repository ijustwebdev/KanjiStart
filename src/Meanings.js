import React from "react"

export default function Meanings(props){
    // TODO: add functionality to display additional readings/meanings to the user

    const kunReading = props.character.kun_readings
    const onReading = props.character.on_readings
    const englishReading = props.character.meanings
    const strokeCount = props.character.stroke_count
    const jlpt = props.character.jlpt
    const grade = props.character.grade

    return(
        <div id="meaningDiv">
            <div className="meaningChildDiv">
                {/* here we're checking to make sure the kanji object's fields exist and have an item in index 0. */}
                {/* this is so we can specify that we want to render the first value of each key in our if statement.*/}
                {/* without checking both their existence and 0 index before rendering we will error because we cannot display */}
                {/* the 0 index of a value that does not yet exist due to the fetch function not populating our state on first render */}
                {kunReading && kunReading[0] !== undefined ? <span  className="meaningEl">訓読み - {kunReading[0]}</span> : <span className="loading">Loading...</span>}
                {onReading && onReading[0] !== undefined ? <span className="meaningEl">音読み - {onReading[0]}</span> : <span className="loading">Loading...</span>}
                {englishReading && englishReading[0] !== undefined ? <span className="meaningEl">Meaning - {englishReading[0]}</span> : <span className="loading">Loading...</span>}
                
            </div>
            <div className="meaningChildDiv">
                {strokeCount ? <span className="meaningEl">Stroke Count - {strokeCount}</span> : <span className="loading">Loading...</span>}
                {jlpt ? <span className="meaningEl">JLPT - {jlpt}</span> : <span className="loading">Loading...</span>}
                {grade ? <span className="meaningEl">Grade - {grade}</span> : <span className="loading">Loading...</span>}
            </div>
        </div>
    )
}