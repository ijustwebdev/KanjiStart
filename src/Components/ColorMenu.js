import React from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function colorMenu(props){
    return(
        <AnimatePresence>
            {props.showingColorSettings && 
                <motion.div id="colorModal">
                    
                </motion.div>
            }
        </AnimatePresence>
    )
}
