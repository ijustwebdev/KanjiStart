import React from "react"

export default function Meanings(props){

    const kunReading = props.character.kun_readings
    const onReading = props.character.on_readings
    const englishReading = props.character.meanings
    const strokeCount = props.character.stroke_count
    const jlpt = props.character.jlpt
    const grade = props.character.grade

    // TODO: add functionality to display additional readings/meanings to the user
    //! this is probably a huge problem
    //! .slice seems to directly modify meaningElements which I do not think we want
    //! at least as far as best practices goes.
    const meaningElements = englishReading.slice(1).map((meaning) => {
        return(
            <li className="subMeaning" key={meaning}>{meaning}</li>
        )
    })
    return(
        <div id="meaningDiv">
            <div className="meaningChildDiv">
                {
                kunReading[0] ? 
                <div className="entryEl">
                    <span className="meaningElLabel">
                        訓読み
                    </span>
                    <span className="meaningElInfo">
                        <span class="meaningDividers">
                            -
                        </span> 
                        {kunReading[0]}
                    </span>
                </div> 
                : 
                <p>kunyomi not found</p>}
                {/* the following two statements are similar to the above so I won't break them down. */}
                {onReading[0] ? <div className="entryEl"><span className="meaningElLabel">音読み</span><span className="meaningElInfo"> <span class="meaningDividers">-</span> {onReading[0]}</span></div> : null}
                {englishReading[0] ? <div className="entryEl"><span className="meaningElLabel">Meaning</span><span className="meaningElInfo"> <span class="meaningDividers">-</span> {englishReading[0]}</span></div> : null}
                {/* broke this component down because I wanted to make sure I got the onclick correct */}
                {
                meaningElements.length >= 1 ? 
                    <div id="conditionalMeanings" onClick={props.onClick}>
                    <span className="material-symbols-outlined moreMeanings" id="add">add</span>
                    <span className="moreMeanings" id="moreMeaningsText">More Meanings</span>
                    </div> 
                :
                null
                }
                {/* we got meanings? show them meanings. */}
                {props.meanings ? <div id="extraMeanings">{meaningElements}</div> : null}
            </div>
            <div className="meaningChildDiv">
                <div className="entryEl"><span className="meaningElLabel">STROKE COUNT</span><span className="meaningElInfo"> <span class="meaningDividers">-</span> {strokeCount}</span></div>
                <div className="entryEl"><span className="meaningElLabel">JLPT</span><span className="meaningElInfo"> <span class="meaningDividers">-</span> {jlpt}</span></div>
                <div className="entryEl"><span className="meaningElLabel">GRADE</span><span className="meaningElInfo"> <span class="meaningDividers">-</span> {grade}</span></div>
            </div>
        </div>
    )
}