import React from "react"

export default function Meanings(props){

    // %20 is url encoded space. %23 is url encoded #. required to grab the right page on jisho.
    const url = `http://www.jisho.org/search/${props.character.kanji}%20%23kanji`

    const kunReading = props.character.kun_readings
    const onReading = props.character.on_readings
    const englishReading = props.character.meanings
    const strokeCount = props.character.stroke_count
    const jlpt = props.character.jlpt
    const grade = props.character.grade

    // TODO: add functionality to display additional readings/meanings to the user
    //! this is probably a huge problem
    //! .slice seems to directly modify meaningElements which I do not think we want
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
                        <span className="meaningDividers">
                            -
                        </span> 
                        {kunReading[0]}
                    </span>
                </div> 
                : 
                <div className="entryEl">
                    <p className="meaningElLabel">訓読み</p>
                    <span className="meaningElInfo">
                        <span className="meaningDividers">-</span>
                        N/A
                    </span>
                </div>
                }
                {/* the following two statements are similar to the above so I won't break them down. */}
                {onReading[0] ? <div className="entryEl"><span className="meaningElLabel">音読み</span><span className="meaningElInfo"><span className="meaningDividers">-</span>{onReading[0]}</span></div> : null}
                {englishReading[0] ? <div className="entryEl"><span className="meaningElLabel">MEANING</span><span className="meaningElInfo"><span className="meaningDividers">-</span>{englishReading[0]}</span></div> : null}
                {/* broke this component down because I wanted to make sure I got the onclick correct */}
                {
                meaningElements.length >= 1 ? 
                    <div id="conditionalMeanings" onClick={props.onClick}>
                    <span className="material-symbols-outlined moreMeanings">expand_more</span>
                    <span id="moreMeanings">More Meanings</span>
                    </div> 
                :
                null
                }
                {/* we got meanings? show them meanings. */}
                {props.meanings ? <div id="extraMeanings">{meaningElements}</div> : null}
            </div>
            <div className="meaningChildDiv">
                <div className="entryEl"><span className="meaningElLabel">STROKE COUNT</span><span className="meaningElInfo"><span className="meaningDividers">-</span>{strokeCount}</span></div>
                <div className="entryEl"><span className="meaningElLabel">JLPT</span><span className="meaningElInfo"><span className="meaningDividers">-</span>{jlpt}</span></div>
                <div className="entryEl"><span className="meaningElLabel">GRADE</span><span className="meaningElInfo"><span className="meaningDividers">-</span>{grade}</span></div>

                <div className="entryEl" id="jishoSearch">
                    <a href={url} >
                    {/* <span className="material-symbols-outlined search" id="searchIcon">search</span> */}
                    <span className="material-symbols-outlined" id="link">link</span>
                    <span id="searchLinkText">Open on Jisho</span>
                    </a>
                </div>

            </div>
        </div>
    )
}