import { createUseStyles, useTheme } from "react-jss";
import { useSelector } from "react-redux";
import { BiUserCircle } from "react-icons/bi";

function ProducerInfo({ id }) {
  const producers = useSelector(state => state.producer.producers);
  let { 
    name, 
    identification, 
    address, 
    phone, 
    email, 
    isClient 
  } = producers.find(producer => producer.id === parseInt(id));

  const theme = useTheme();
  const classes = useStyles({ theme, isClient });
  return (
    <section className={classes.root}>
      <div className={classes.headingWrapper}>
        <BiUserCircle className={classes.icon} color={theme.colors.gray.base} />
        <p className={classes.heading}>Datos del productor</p>
        <div className={classes.divider}></div>
      </div>
      <div className={classes.topRow}>
        <h2 className={classes.name}>{name}</h2>
        <div className={classes.clientStatus}>
          <p>{isClient ? "Cliente" : "No es cliente" }</p>
        </div>
      </div>
      <div className={classes.infoList}>
        <div className={classes.infoItem}>
          <p>Identificación</p>
          <p>{identification}</p>
        </div>
        <div className={classes.infoItem}>
          <p>Dirección</p>
          <p>{address}</p>
        </div>
        <div className={classes.infoItem}>
          <p>Teléfono</p>
          <p>{phone}</p>
        </div>
        <div className={classes.infoItem}>
          <p>Email</p>
          <p>{email}</p>
        </div>
      </div>
    </section>
  )
}

export default ProducerInfo;

const useStyles = createUseStyles({
  root: {
    padding: "20px 30px",
    backgroundColor: "white",
    borderRadius: 8,

    "& h2, p": {
      color: ({ theme }) => theme.colors.bodyText.base,
    }
  },

  headingWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
  },

  icon: {
    marginRight: 5,
  },

  heading: ({ theme }) => ({
    marginRight: 20,
    fontSize: 14,
    fontWeight: 400,
    color: theme.colors.bodyText.light,
    textTransform: "uppercase",
    letterSpacing: 1,
  }),
  
  divider: {
    flex: 1,
    borderBottom: {
      style: "solid",
      width: 1,
      color: "#CCCCCC",
    }
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  name: {
    marginBottom: 5,
    fontSize: 21,
    fontWeight: 600,
  }, 

  clientStatus: {
    padding: "10px 20px",
    borderRadius: 25,
    backgroundColor: ({ theme, isClient }) => isClient ? theme.colors.primaryGreen : theme.colors.gray.lightest,
    textTransform: "uppercase",
    
    "& > p": {
      fontSize: 10,
      fontWeight: 700,
      color: ({ theme, isClient }) => isClient ? "white" : theme.colors.bodyText.light,
      letterSpacing: 1,
    }
  },
  
  infoList: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  
  infoItem: {
    "& > p": {
      color: ({ theme }) => theme.colors.bodyText.base,
    },

    "& > p:first-child": {
      fontSize: 12,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    "& > p:last-child": {
      fontSize: 14,
    }
  }
});