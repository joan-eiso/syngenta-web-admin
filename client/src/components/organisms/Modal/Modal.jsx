import { createUseStyles } from "react-jss";
import { motion } from "framer-motion";

import Backdrop from "./Backdrop";

function Modal({ children, handleClose }) {
  const classes = useStyles();
  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        duration: 0
      }
    },
    exit: {
      opacity: 0,
    }
  }
  
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        className={classes.root}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => {e.stopPropagation()}}
      >
        {children}
      </motion.div>
    </Backdrop>
  )
}

export default Modal;

const useStyles = createUseStyles({
  root: {
    width: "clamp(60%, 600px, 80%)",
    padding: "30px 100px",
    borderRadius: 8,
    backgroundColor: "white",
  }
});