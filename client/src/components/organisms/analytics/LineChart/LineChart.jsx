import { createUseStyles, useTheme } from "react-jss";
import { useSelector } from "react-redux";
import {
  LineChart as Chart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { selectHectaresCountPerMonthInCurrentCampaign } from "../../../../redux/property/duck";
import { selectSoldBagsCountPerMonthInCurrentCampaign } from "../../../../redux/license/duck";

function LineChart() {
  const currentCampaign = useSelector(state => state.campaign.currentCampaign);
  const hectaresCountPerMonth = useSelector(selectHectaresCountPerMonthInCurrentCampaign);
  const soldBagsCountPerMonth = useSelector(selectSoldBagsCountPerMonthInCurrentCampaign);

  const data = [
    {
      name: "Enero",
      "Hectareas relevadas": hectaresCountPerMonth["Enero"] ?? 0,
      "Bolsas vendidas": soldBagsCountPerMonth["Enero"] ?? 0
    },
    {
      name: "Febrero",
      "Hectareas relevadas": hectaresCountPerMonth["Febrero"] ?? 0,
      "Bolsas vendidas": soldBagsCountPerMonth["Febrero"] ?? 0
    },
    {
      name: "Marzo",
      "Hectareas relevadas": hectaresCountPerMonth["Marzo"] ?? 0,
      "Bolsas vendidas": soldBagsCountPerMonth["Marzo"] ?? 0
    },
    {
      name: "Abril",
      "Hectareas relevadas": hectaresCountPerMonth["Abril"] ?? 0,
      "Bolsas vendidas": soldBagsCountPerMonth["Abril"] ?? 0
    },
    {
      name: "Mayo",
      "Hectareas relevadas": hectaresCountPerMonth["Mayo"] ?? 0,
      "Bolsas vendidas": soldBagsCountPerMonth["Mayo"] ?? 0
    },
    {
      name: "Junio",
      "Hectareas relevadas": hectaresCountPerMonth["Junio"] ?? 0,
      "Bolsas vendidas": soldBagsCountPerMonth["Junio"] ?? 0
    },
    {
      name: "Julio",
      "Hectareas relevadas": hectaresCountPerMonth["Julio"] ?? 0,
      "Bolsas vendidas": soldBagsCountPerMonth["Julio"] ?? 0
    },
    {
      name: "Agosto",
      "Hectareas relevadas": hectaresCountPerMonth["Agosto"] ?? 0,
      "Bolsas vendidas": soldBagsCountPerMonth["Agosto"] ?? 0
    },
    {
      name: "Septiembre",
      "Hectareas relevadas": hectaresCountPerMonth["Septiembre"] ?? 0,
      "Bolsas vendidas": soldBagsCountPerMonth["Septiembre"] ?? 0
    },
    {
      name: "Octubre",
      "Hectareas relevadas": hectaresCountPerMonth["Octubre"] ?? 0,
      "Bolsas vendidas": soldBagsCountPerMonth["Octubre"] ?? 0
    },
    {
      name: "Noviembre",
      "Hectareas relevadas": hectaresCountPerMonth["Noviembre"] ?? 0,
      "Bolsas vendidas": soldBagsCountPerMonth["Noviembre"] ?? 0
    },
    {
      name: "Diciembre",
      "Hectareas relevadas": hectaresCountPerMonth["Diciembre"] ?? 0,
      "Bolsas vendidas": soldBagsCountPerMonth["Diciembre"] ?? 0
    },
  ];

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <p className={classes.title}>Gráfica de resultados del {currentCampaign}</p>
      <div className={classes.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <Chart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Hectareas relevadas"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line 
              type="monotone" 
              dataKey="Bolsas vendidas" 
              stroke="#82ca9d" 
            />
          </Chart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexFlow: "column nowrap",
    width: "100%",
    height: 400,
    padding: 20
  },
  
  title: ({ theme }) => ({
    marginBottom: 20,
    fontWeight: 600,
    color: theme.colors.bodyText.base,
  }),
  
  chartWrapper: {
    flex: 1,
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",

    "& > p": {
      fontSize: 14,
      color: "#AAAAAA"
    }
  },
});

export default LineChart;
