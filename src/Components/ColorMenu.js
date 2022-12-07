import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { HexColorInput, HexColorPicker } from "react-colorful"


export default function ColorMenu(props){

    const [hoverState3, setHoverState3] = useState(false)

    const handleMouseEnterLeave = () => {
        setHoverState3(prevState => !prevState)
    }

    return(
        <AnimatePresence>
            {props.showingColorMenu && 
                <motion.div id="colorModal"
                initial={{x: "-40vw"}} 
                transition={{duration: .2, type: "spring", damping: 30, stiffness: 500}}
                animate={{x: "0vw"}}
                exit={{x: "100vw"}}>
                    <form>
                        <fieldset>
                            <legend>Primary Color</legend>
                            <div id="colorPicker">
                                <HexColorPicker color={props.colorSettings.primary} onChange={props.setColorPrimary} />
                                <HexColorInput id="colorInput1" color={props.colorSettings.primary} onChange={props.setColorPrimary} />
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Secondary Color</legend>
                            <div id="colorPicker2">
                                <HexColorPicker color={props.colorSettings.secondary} onChange={props.setColorSecondary} />
                                <HexColorInput id="colorInput2" color={props.colorSettings.secondary} onChange={props.setColorSecondary} />
                            </div>
                        </fieldset>
                        <button id="colorButton" type="button" onClick={props.handleSubmit} style={{color: hoverState3 ? "#2b2b2b" : "white", border: "solid .2vh  white" , backgroundColor: hoverState3 ? "white" : "#2b2b2b"}} onMouseEnter={handleMouseEnterLeave} onMouseLeave={handleMouseEnterLeave}>Save Colors</button>
                    </form>
                </motion.div>
            }
        </AnimatePresence>
    )
}
