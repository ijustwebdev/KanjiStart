import React from "react"
import {AnimatePresence, motion} from "framer-motion"

export default function SettingsBg(props){
    return(
        <AnimatePresence>
            {props.showingModal && 
            <motion.div id="modalBackground"
                onClick={props.onClick} 
                initial={{opacity: 0}} 
                transition={{duration: .2}} 
                animate={{opacity: 0.7}} 
                exit={{opacity: 0}}>
            </motion.div>}
        </AnimatePresence>
    )
}