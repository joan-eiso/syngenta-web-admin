import { createUseStyles, useTheme } from "react-jss";
import { useSelector } from "react-redux";

import { selectClientCountInBothCampaigns, selectClientCountInFormerCampaign } from "../../../redux/producer/duck";
import { dataURIToBlob, downloadICAReport } from "../../../utils/reports.util";

import Button from "../../atoms/Button/Button";
import Metric from "../../molecules/Metric/Metric";
import LineChart from "../../organisms/analytics/LineChart/LineChart";

function Dashboard() {
  const token = useSelector(state => state.auth.token);
  const distAuth = useSelector(state => state.auth.distAuth);
  const producers = useSelector(state => state.producer.producers);
  const hectareCount = useSelector(state => state.property.hectareCount);
  const soldBags = useSelector(state => state.license.soldBags);
  const clientCountInBothCampaigns = useSelector(selectClientCountInBothCampaigns);
  const clientCountInFormerCampaign = useSelector(selectClientCountInFormerCampaign);

  const totalProducers = producers.length;
  const clientCount = producers.filter((producer) => producer.isClient).length;
  const prospectCount = totalProducers - clientCount;
  const penPercentage = (clientCount * 100 / totalProducers).toFixed(2);
  const retention = (clientCountInBothCampaigns * 100 / clientCountInFormerCampaign).toFixed(0);
  const clientParticipation = (soldBags * 100 / hectareCount).toFixed(2);

  const handleDownloadICAReport = async () => {
    const { data: { response: dataURI } } = await downloadICAReport(distAuth, token);
    const blob = dataURIToBlob(dataURI);
    const url = URL.createObjectURL(blob);
    window.location.assign(url);
    URL.revokeObjectURL(url);
  }

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <div className={classes.dashboardHeader}>
        <h1 className={classes.title}>Resumen</h1>
      </div>
      <section className={classes.topSection}>
        <div className={classes.topSectionHeadingContainer}>
          <p className={classes.topSectionHeading}>Agricultores</p>
          <div className={classes.topSectionDivider}></div>
        </div>
        <div className={classes.topSectionMetrics}>
          <Metric 
            title="Total de productores" 
            value={totalProducers} 
            label="Total de productores únicos con y sin licencias vigentes" 
            backgroundColor={theme.colors.gray.lightest}
            color="#029EBF"
          />          
          <Metric 
            title="Total de clientes" 
            value={clientCount} 
            label="Total de productores únicos con licencias vigentes" 
            backgroundColor={theme.colors.gray.lightest}
            color="#EF7D00"
          />            
          <Metric 
            title="% de retención" 
            value={`${retention}%`}
            label="% de clientes que compraron en ambas campañas" 
            backgroundColor={theme.colors.gray.lightest}
            color="#F9B002"
            />          
          <Metric 
            title="Total de hectáreas de maíz" 
            value={hectareCount} 
            label="Total de hectáreas de maíz en agricultores con licencia y sin licencia" 
            backgroundColor={theme.colors.gray.lightest}
            color="#B9C41A"
          />          
          <Metric 
            title="Cantidad de prospectos" 
            value={prospectCount} 
            label="Total agricultores sin firma de licencia en año actual" 
            backgroundColor={theme.colors.gray.lightest}
            color="#6A75B2"
          />          
        </div>
      </section>
      <section className={classes.middleSection}>
        <div className={classes.tendencyGraphContainer}>
          <LineChart />
        </div>
        <Metric 
          title="% de penetración" 
          value={`${penPercentage}%`} 
          label="% de clientes sobre la base total de agricultores" 
          backgroundColor="white"
          color="#002D72"
        />
        <Metric 
          title="Participación de clientes" 
          value={`${clientParticipation}%`} 
          label="Cantidad de bolsas en productores en campaña actual / cantidad de hectáreas relevadas totales de maíz" 
          backgroundColor="white"
          color="#002D72"
      />
      </section>
      <section className={classes.actions}>
        {/* <a href="https://eiso.co/syngenta/reporte_01.php" target="_blank" rel="noreferrer">DESCARGAR INFORMACIÓN</a> */}
        <Button label="Descargar Reporte ICA" onClick={handleDownloadICAReport} />
      </section>
    </div>
  )
}

export default Dashboard;

const useStyles = createUseStyles({
  root: {
    flex: 1,
    display: "flex",
    flexFlow: "column nowrap",
    padding: "10px 20px 20px",
    overflowY: "scroll"
  },
  
  dashboardHeader: {
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
      templateColumns: "repeat(5, minmax(10px, 1fr))",
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
    },
    marginBottom: 40,
  },

  tendencyGraphContainer: {
    grid: {
      row: "1 / 3"
    },
    borderRadius: 8,
    backgroundColor: "white"
  },

  actions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& > a": {
      padding: "10px 40px",
      fontSize: 12,
      fontWeight: 300,
      letterSpacing: "1px",
      textTransform: "uppercase",
      outline: "none",
      border: "none",
      borderRadius: 4,
      backgroundColor: ({ theme}) => theme.colors.primaryBlue,
      color: ({ theme }) => "white",
      textDecoration: "none"
    }
  }
});