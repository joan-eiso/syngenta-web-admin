import { createUseStyles } from "react-jss";
import { motion } from "framer-motion";

function Backdrop({ children, onClick }) {
  const variants = {
    hidden: {
      opacity: 0,
    },
    
    visible: {
      opacity: 1,
    },
    
    exit: {
      opacity: 0,
    }
  }

  const classes = useStyles();
  return (
    <motion.div 
      className={classes.root} 
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClick}
    >
      {children}      
    </motion.div>
  )
}

export default Backdrop;

const useStyles = createUseStyles({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000022"
  }
});