import { createUseStyles, useTheme } from "react-jss";
import {
  LineChart as Chart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


function LineChart({ title }) {
  const data = [
    {
      name: "Enero",
      "Hectareas relevadas": 400,
      "Bolsas vendidas": 240
    },
    {
      name: "Febrero",
      "Hectareas relevadas": 200,
      "Bolsas vendidas": 150
    },
    {
      name: "Marzo",
      "Hectareas relevadas": 300,
      "Bolsas vendidas": 200
    },
    {
      name: "Abril",
      "Hectareas relevadas": 320,
      "Bolsas vendidas": 100
    },
    {
      name: "Mayo",
      "Hectareas relevadas": 600,
      "Bolsas vendidas": 403
    },
    {
      name: "Junio",
      "Hectareas relevadas": 650,
      "Bolsas vendidas": 100
    },
    {
      name: "Julio",
      "Hectareas relevadas": 800,
      "Bolsas vendidas": 210
    },
  ];

  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={classes.root}>
      <p className={classes.title}>{title}</p>
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
            <Line type="monotone" dataKey="Bolsas vendidas" stroke="#82ca9d" />
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
