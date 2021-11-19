import { createUseStyles, useTheme } from "react-jss";

import Metric from "../../molecules/Metric/Metric";
import LineChart from "../analytics/LineChart/LineChart";

function Dashboard() {
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <h1 className={classes.title}>Resumen</h1>
      </header>
      <section className={classes.topSection}>
        <div className={classes.topSectionHeadingContainer}>
          <p className={classes.topSectionHeading}>Agricultores</p>
          <div className={classes.topSectionDivider}></div>
        </div>
        <div className={classes.topSectionMetrics}>
          <Metric 
            title="Total de productores" 
            value={100} 
            label="Total de productores únicos con y sin licencias vigentes" 
            backgroundColor={theme.colors.gray.lightest}
            color="#029EBF"
            />          
          <Metric 
            title="Total de clientes" 
            value={100} 
            label="Total de productores únicos con y sin licencias vigentes" 
            backgroundColor={theme.colors.gray.lightest}
            color="#EF7D00"
            />          
          <Metric 
            title="Clientes 2021 a la fecha" 
            value={100} 
            label="Total de productores únicos con y sin licencias vigentes" 
            backgroundColor={theme.colors.gray.lightest}
            color="#85CFE6"
            />          
          <Metric 
            title="% de retención" 
            value={100} 
            label="Total de productores únicos con y sin licencias vigentes" 
            backgroundColor={theme.colors.gray.lightest}
            color="#F9B002"
            />          
          <Metric 
            title="Total de hectáreas de maíz" 
            value={100} 
            label="Total de productores únicos con y sin licencias vigentes" 
            backgroundColor={theme.colors.gray.lightest}
            color="#B9C41A"
            />          
          <Metric 
            title="Cantidad de prospectos" 
            value={100} 
            label="Total de productores únicos con y sin licencias vigentes" 
            backgroundColor={theme.colors.gray.lightest}
            color="#6A75B2"
            />          
        </div>
      </section>
      <section className={classes.middleSection}>
        <div className={classes.tendencyGraphContainer}>
          <LineChart title="Tendencias del día" />
        </div>
        <Metric 
          title="% de penetración" 
          value={100} 
          label="Total de productores únicos con y sin licencias vigentes" 
          backgroundColor="white"
          color="#002D72"
          />
        <Metric 
          title="Participación de cliente" 
          value={100} 
          label="Total de productores únicos con y sin licencias vigentes" 
          backgroundColor="white"
          color="#002D72"
        />
      </section>
    </div>
  )
}

export default Dashboard;

const useStyles = createUseStyles({
  root: {
    height: "90vh",
    display: "flex",
    flexFlow: "column nowrap",
    padding: "10px 20px",
    overflowY: "scroll"
  },
  
  header: {
    display: "flex",
    marginBottom: 10,
  },
  
  title: ({ theme }) => ({
    fontWeight: 700,
    letterSpacing: 1,
    color: theme.colors.bodyText.base
  }),

  topSection: {
    display: "flex",
    flexFlow: "column nowrap",
    marginBottom: 20,
    padding: "20px 30px",
    borderRadius: 8,
    backgroundColor: "white",
  },

  topSectionHeadingContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
  },

  topSectionHeading: ({ theme }) => ({
    marginRight: 20,
    fontSize: 14,
    fontWeight: 400,
    color: theme.colors.bodyText.light,
    textTransform: "uppercase",
    letterSpacing: 1,
  }),

  topSectionDivider: {
    flex: 1,
    borderBottom: {
      style: "solid",
      width: 1,
      color: "#CCCCCC",
    }
  },

  topSectionMetrics: {
    display: "grid",
    grid: {
      templateColumns: "repeat(6, minmax(10px, 1fr))",
      gap: 10,
    },    
    justifyContent: "space-between",
    alignItems: "center",

    "& > *": {
      height: "100%", 
    }
  },

  middleSection: {
    display: "grid",
    grid: {
      templateColumns: "minmax(10px, 2fr) minmax(10px, 1fr)",
      templateRows: "repeat(2, minmax(10px, 1fr))",
      gap: 10,
    }
  },

  tendencyGraphContainer: {
    grid: {
      row: "1 / 3"
    },
    borderRadius: 8,
    backgroundColor: "white"
  }
});