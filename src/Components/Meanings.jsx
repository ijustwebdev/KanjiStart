import React, {useState} from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function Meanings(props){

    // %20 is url encoded space. %23 is url encoded "#". required to grab the correct page on jisho.
    const url = `https://www.jisho.org/search/${props.character.kanji}%20%23kanji`

    const kunReading = props.character.kun_readings
    const onReading = props.character.on_readings
    // just capitalizing the first letter of all our meanings
    const englishReading = props.character.meanings.map((meaning) => {
        return(
            meaning = meaning.charAt(0).toUpperCase() + meaning.slice(1)
        )
    })
    const strokeCount = props.character.stroke_count
    const jlpt = props.character.jlpt
    const grade = props.character.grade
    // Create meaningElements array by first removing the first entry since we're showing the first entry already. 
    const meaningElements = englishReading.slice(1).map((meaning, index) => {
        return(
            <motion.li className="subMeaning" initial={{ opacity: 0, y: "-20%"}} transition={{ duration: 0.2 }} animate={{y: "0%", opacity: "100%"}} exit={{y: "-20%", opacity: 0}} key={index}>{meaning}</motion.li>
        )
    })

    const [hoverState, setHoverState] = useState(false)
    const [hoverState2, setHoverState2] = useState(false)

    const handleMouseEnterLeave = () => {
        setHoverState(prevState => !prevState)
    }
    const handleMouseEnterLeave2 = () => {
        setHoverState2(prevState => !prevState)
    }



    return(
        <div id="meaningDiv">
            {/* left column */}
            <div className="meaningChildDiv">
                {/* broken apart element containing our label and data for the kunyomi reading */}
                {
                kunReading[0] ? 
                <div className="entryEl">
                    <span id="kunyomiLabel">kunyomi</span>
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
                    <span id="kunyomiLabel">kunyomi</span>
                    <p className="meaningElLabel">訓読み</p>
                    <span className="meaningElInfo">
                        <span className="meaningDividers">-</span>
                        N/A
                    </span>
                </div>
                }
                {/* the following two statements are similar to the above so I won't break them down. */}
                {onReading[0] ? <div className="entryEl"><span id="onyomiLabel">onyomi</span><span className="meaningElLabel">音読み</span><span className="meaningElInfo"><span className="meaningDividers">-</span>{onReading[0]}</span></div> : null}
                {englishReading[0] ? <div className="entryEl"><span className="meaningElLabel">MEANING</span><span className="meaningElInfo"><span className="meaningDividers">-</span>{englishReading[0]}</span></div> : null}
                {/* broke this component down because I wanted to make sure I got the onclick correct */}
                {
                meaningElements.length >= 1 ? 
                    <div id="conditionalMeanings" className="buttons" onClick={props.onClick} tabIndex={1} style={{color: props.colorSettings.primary, border: "solid .2vh " + props.colorSettings.primary, backgroundColor: hoverState2 ? props.colorSettings.primary : "transparent"}} onMouseEnter={handleMouseEnterLeave2} onMouseLeave={handleMouseEnterLeave2}>
                    <span className="material-symbols-outlined moreMeanings" id="darkIcon" style={{color: hoverState2 ? props.colorSettings.secondary : props.colorSettings.primary}} >expand_more</span>
                    <span id="moreMeanings" style={{color: hoverState2 ? props.colorSettings.secondary : props.colorSettings.primary}}>MORE MEANINGS</span>
                    </div> 
                :
                <></>
                }
                {/* required tags to animate meaningElements out */}
                <AnimatePresence>
                {props.meanings ? <div id="extraMeanings" key="extraMeanings">{meaningElements}</div> : null}
                </AnimatePresence>
            </div>
            {/* right column */}
            <div className="meaningChildDiv">
                <div className="entryEl"><span className="meaningElLabel">STROKE COUNT</span><span className="meaningElInfo"><span className="meaningDividers">-</span>{strokeCount}</span></div>
                <div className="entryEl"><span className="meaningElLabel">JLPT</span><span className="meaningElInfo"><span className="meaningDividers">-</span>{jlpt}</span></div>
                <div className="entryEl"><span className="meaningElLabel">GRADE</span><span className="meaningElInfo"><span className="meaningDividers">-</span>{grade}</span></div>

                <div id="jishoSearch" >
                    <a href={url} className="buttons" style={{color: props.colorSettings.primary, border: "solid .2vh " + props.colorSettings.primary, backgroundColor: hoverState ? props.colorSettings.primary : "transparent"}} onMouseEnter={handleMouseEnterLeave} onMouseLeave={handleMouseEnterLeave}>
                    {/* <span className="material-symbols-outlined search" id="searchIcon">search</span> */}
                    <span className="material-symbols-outlined" id="link" style={{color: hoverState ? props.colorSettings.secondary : props.colorSettings.primary}} >link</span>
                    <span id="searchLinkText"style={{color: hoverState ? props.colorSettings.secondary : props.colorSettings.primary}} >MORE AT JISHO.ORG</span>
                    </a>
                </div>

            </div>
        </div>
    )
}