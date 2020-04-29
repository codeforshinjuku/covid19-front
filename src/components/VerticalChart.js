import React, { useState } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  getPopulation,
  isLoaded,
  perPopulation,
  getData,
  citylistUrl,
  patientUrl,
} from "../data/Utils";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  card: {
    padding: "5px",
  },
}));

function VerticalChartPage() {
  const population = getPopulation();
  const classes = useStyles();
  const [citylist, setCitylist] = useState(false);
  const [patient, setPatient] = useState(false);
  const [graph, setGraph] = useState("graph1");

  const handleGraphChange = (event) => {
    setGraph(event.target.value);
  };

  if (!citylist) {
    getData(citylistUrl, setCitylist);
  }

  if (!patient) {
    getData(patientUrl, setPatient);
  }

  let cityLabel = [];
  if (isLoaded(citylist)) {
    citylist.forEach(function (city) {
      cityLabel[city.code] = city.label;
    });
  }

  let patientList = [];
  let patientTemp;
  if (isLoaded(patient)) {
    for (let key in patient) {
      patientTemp = patient[key];
      patientList.push({
        code: key,
        cityName: cityLabel[key],
        patient:
          graph === "graph1"
            ? Object.values(patientTemp).pop()
            : perPopulation(Object.values(patientTemp).pop(), population[key]),
      });
    }
    patientList.sort(function (a, b) {
      if (a.patient < b.patient) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  return (
    <Card className={classes.card}>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">データの種類</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={graph}
            onChange={handleGraphChange}
          >
            <MenuItem value={"graph1"}>区市町村感染者累計</MenuItem>
            <MenuItem value={"graph2"}>区市町村10万人あたり</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div style={{ marginTop: 30, width: "100%", height: "2000px" }}>
        <ResponsiveContainer>
          <ComposedChart
            layout="vertical"
            data={patientList}
            margin={{
              top: 20,
              right: 0,
              bottom: 20,
              left: 30,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="number" />
            <YAxis dataKey="cityName" type="category" />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="patient"
              barSize={15}
              fill="#8884d8"
              name="感染者数"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default VerticalChartPage;
