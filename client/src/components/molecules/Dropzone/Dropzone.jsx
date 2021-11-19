import { createUseStyles, useTheme } from "react-jss";
import { FiUpload } from "react-icons/fi";

function Dropzone() {
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <FiUpload className={classes.icon} size={32} color={theme.colors.primaryBlue} />
      <p className={classes.title}>Subir archivo</p>
      <p className={classes.description}>( .xls / .txt / .json )</p>
    </div>
  )
}

export default Dropzone;

const useStyles = createUseStyles({
  root: ({ theme }) => ({
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    border: {
      style: "dashed",
      width: 1,
      color: theme.colors.primaryBlue,
    },
    
    "& > p": {
      color: theme.colors.primaryBlue,
    }
  }),

  icon: {
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
  },

  description: {
    fontSize: 14,
  }
});