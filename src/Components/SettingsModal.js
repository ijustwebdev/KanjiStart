import React from "react"
import { motion } from "framer-motion"

export default function SettingsModal(props){
    return(
        <>
        {props.showingModal ? 
        <>
            <motion.div id="modalBackground" onClick={props.onClick} initial={{opacity: 0}} transition={{duration: .2}} animate={{opacity: 0.7}}></motion.div>
            <motion.div id="modalWindow" initial={{y: "-40vw"}} transition={{duration: .2}} animate={{y: "1vw"}} >
                <form onSubmit={props.handleSubmit}>
                    <fieldset id="settingsForm">
                        <legend>Kanji Grades Used</legend>
                            <div className="settingsGradeEl" id="topGradeEl">
                                <input
                                    type="checkbox"
                                    id="grade1"
                                    checked={props.settingsData.grade1}
                                    onChange={props.handleChange}
                                    name="grade1"
                                />
                                <label htmlFor="grade1">Grade 1</label>
                            </div>
                            <div className="settingsGradeEl">
                                <input
                                    type="checkbox"
                                    id="grade2"
                                    checked={props.settingsData.grade2}
                                    onChange={props.handleChange}
                                    name="grade2"
                                />
                                <label htmlFor="grade2">Grade 2</label>
                            </div>
                            <div className="settingsGradeEl">
                                <input
                                    type="checkbox"
                                    id="grade3"
                                    checked={props.settingsData.grade3}
                                    onChange={props.handleChange}
                                    name="grade3"
                                />
                                <label htmlFor="grade3">Grade 3</label>
                            </div>
                            <div className="settingsGradeEl">
                                <input
                                    type="checkbox"
                                    id="grade4"
                                    checked={props.settingsData.grade4}
                                    onChange={props.handleChange}
                                    name="grade4"
                                />
                                <label htmlFor="grade4">Grade 4</label>
                            </div>
                            <div className="settingsGradeEl">
                                <input
                                    type="checkbox"
                                    id="grade5"
                                    checked={props.settingsData.grade5}
                                    onChange={props.handleChange}
                                    name="grade5"
                                />
                                <label htmlFor="grade5">Grade 5</label>
                            </div>
                            <div className="settingsGradeEl">
                                <input
                                    type="checkbox"
                                    id="grade6"
                                    checked={props.settingsData.grade6}
                                    onChange={props.handleChange}
                                    name="grade6"
                                />
                                <label htmlFor="grade6">Grade 6</label>
                            </div>
                    </fieldset>
                    <fieldset id="secondFieldset">
                        <legend>Kanji Update Interval</legend>
                        <div className="settingsHourEl" id="topSettingsEl">
                            <input
                                type="radio"
                                id="6hr"
                                name="hourInterval"
                                value="6"
                                checked={props.settingsData.hourInterval === 6}
                                onChange={props.handleChange}
                            />
                            <label htmlFor="6hr">6 Hours</label>
                        </div>
                        <div className="settingsHourEl">
                            <input
                                type="radio"
                                id="12hr"
                                name="hourInterval"
                                value="12"
                                checked={props.settingsData.hourInterval === 12}
                                onChange={props.handleChange}
                            />
                            <label htmlFor="12hr">12 Hours</label>
                        </div>
                        <div className="settingsHourEl">
                            <input
                                type="radio"
                                id="24hr"
                                name="hourInterval"
                                value="24"
                                checked={props.settingsData.hourInterval === 24}
                                onChange={props.handleChange}
                            />
                            <label htmlFor="24hr">24 Hours</label>
                        </div>
                    </fieldset>
                    <button>Save Settings</button>
                </form>
            </motion.div>
        </>
        : null}
        </>
    )
}