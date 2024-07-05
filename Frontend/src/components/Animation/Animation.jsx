import React from 'react'
import {AnimatePresence,motion} from 'framer-motion'

function Animation({children,initial={opacity:0},animate={opacity:1},transition={duration:2}}) {
  return (
    <motion.div
    initial= {initial}
    animate={animate}
    transition={transition}>
      {children}
    </motion.div>
  )
}
export default Animation