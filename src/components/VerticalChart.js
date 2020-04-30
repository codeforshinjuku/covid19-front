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
  ReferenceLine,
  Scatter,
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
  rtUrl,
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
  const [rtList, setRtList] = useState(false);
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

  if (!rtList) {
    getData(rtUrl, setRtList);
  }

  let cityLabel = [];
  if (isLoaded(citylist)) {
    citylist.forEach(function (city) {
      cityLabel[city.code] = city.label;
    });
  }

  let patientList = [];
  let patientTemp;
  if (isLoaded(patient) && (graph === "graph1" || graph === "graph2")) {
    patientList = [];
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

  let rtData = [];
  if (isLoaded(rtList) && graph === "graph3") {
    patientList = [];
    patientTemp = rtList.latest;
    cityLabel.forEach(function (city) {
      rtData = [0, [0, 0], [0, 0]];
      for (let key in patientTemp) {
        if (city === cityLabel[patientTemp[key].city]) {
          rtData = [
            patientTemp[key].ML,
            [Number(patientTemp[key].Low_90), Number(patientTemp[key].High_90)],
            [Number(patientTemp[key].Low_50), Number(patientTemp[key].High_50)],
          ];
        }
        console.log(patientTemp);
      }
      patientList.push({
        cityName: city,
        patient: rtData,
      });
    });
    patientList.sort(function (a, b) {
      if (a.patient[0] < b.patient[0]) {
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
            <MenuItem value={"graph3"}>区市町村実効再生産数</MenuItem>
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
            {graph === "graph3" ? (
              <XAxis ticks={[0.5, 1.0, 2.0, 3.0, 4.0, 5.0]} type="number" />
            ) : (
              <XAxis type="number" />
            )}
            <YAxis dataKey="cityName" type="category" />
            <Tooltip />
            <Legend verticalAlign="top" />
            {(graph === "graph1" || graph === "graph2") && (
              <Bar
                dataKey="patient"
                barSize={15}
                fill="#8884d8"
                name="感染者数"
              />
            )}
            {graph === "graph3" && (
              <Bar
                dataKey="patient[1]"
                barSize={15}
                fill="#82ca9d"
                name="信頼区間90%"
                isAnimationActive={false}
              />
            )}
            {graph === "graph3" && (
              <Bar
                dataKey="patient[2]"
                barSize={15}
                fill="#ffc658"
                name="信頼区間50%"
                opacity="0.2"
                isAnimationActive={false}
              />
            )}
            {graph === "graph3" && (
              <Scatter
                dataKey="patient[0]"
                fill="#8884d8"
                name="最頻値"
                isAbove
              />
            )}
            {graph === "graph3" && (
              <ReferenceLine
                x={1}
                stroke="red"
                label={{
                  position: "top",
                  value: "1.0",
                  fontSize: 14,
                }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default VerticalChartPage;
