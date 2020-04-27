import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import {
  getPopulation,
  isLoaded,
  isBarChart,
  remove2020,
  perPopulation,
  getData,
  citylistUrl,
  patientUrl,
  diffUrl,
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
    marginBottom: "50px",
  },
}));

function BarChartPage() {
  //値を設定
  const population = getPopulation();
  const classes = useStyles();
  const [citylist, setCitylist] = useState(false);
  const [patient, setPatient] = useState(false);
  const [diffList, setDiffList] = useState(false);
  const [code, setCode] = useState(131041);
  const [code2, setCode2] = useState(false);
  const [code3, setCode3] = useState(false);
  const [graph, setGraph] = useState("graph1");
  const [barChart, setBarChart] = useState(true);
  const [lineChart, setLineChart] = useState(false);
  const [name, setName] = useState("新宿区");
  const [name2, setName2] = useState(false);
  const [name3, setName3] = useState(false);
  const [addition, setAddition] = useState(false);

  let cityLabel = [];
  if (isLoaded(citylist)) {
    citylist.forEach(function (city) {
      cityLabel[city.code] = city.label;
    });
  }

  //フォーム操作
  const handleChange = (event) => {
    setCode(event.target.value);
    setName(cityLabel[event.target.value]);
  };

  const handleChange2 = (event) => {
    if (event.target.value === "clear2") {
      setCode2(false);
      setName2(false);
    } else {
      setCode2(event.target.value);
      setName2(cityLabel[event.target.value]);
    }
  };

  const handleChange3 = (event) => {
    if (event.target.value === "clear3") {
      setCode3(false);
      setName3(false);
    } else {
      setCode3(event.target.value);
      setName3(cityLabel[event.target.value]);
    }
  };

  const handleGraphChange = (event) => {
    setGraph(event.target.value);
    if (event.target.value === "graph1" || event.target.value === "graph2") {
      setBarChart(true);
      setLineChart(false);
    }
    if (event.target.value === "graph3") {
      setBarChart(false);
      setLineChart(true);
    }
  };

  const handleAdditionClick = (event) => {
    setAddition(true);
  };

  //JSONデータの取得

  if (!citylist) {
    getData(citylistUrl, setCitylist);
  }

  if (!patient) {
    getData(patientUrl, setPatient);
    console.log(patient);
  }

  if (!diffList) {
    getData(diffUrl, setDiffList);
  }

  //JSONの加工
  let patientList = [];
  let patientTemp;
  let patientTemp2;
  let patientTemp3;
  if (isLoaded(patient) && patient[code]) {
    patientTemp =
      graph === "graph1" || graph === "graph2" ? patient[code] : diffList[code];
    if (code2) {
      patientTemp2 =
        graph === "graph1" || graph === "graph2"
          ? patient[code2]
          : diffList[code2];
    }
    if (code3) {
      patientTemp3 =
        graph === "graph1" || graph === "graph2"
          ? patient[code3]
          : diffList[code3];
    }

    for (let key in patientTemp) {
      if (code && !code2 && !code3)
        patientList.push({
          date: remove2020(key),
          patient:
            graph === "graph1" || graph === "graph3"
              ? patientTemp[key]
              : perPopulation(patientTemp[key], population[code]),
        });
      if (code && code2 && !code3) {
        for (let key2 in patientTemp2) {
          if (key2 === key) {
            patientList.push({
              date: remove2020(key),
              patient:
                graph === "graph1" || graph === "graph3"
                  ? patientTemp[key]
                  : perPopulation(patientTemp[key], population[code]),
              patient2:
                graph === "graph1" || graph === "graph3"
                  ? patientTemp2[key2]
                  : perPopulation(patientTemp2[key2], population[code2]),
            });
          }
        }
      }
      if (code && !code2 && code3) {
        for (let key3 in patientTemp3) {
          if (key3 === key) {
            patientList.push({
              date: remove2020(key),
              patient:
                graph === "graph1" || graph === "graph3"
                  ? patientTemp[key]
                  : perPopulation(patientTemp[key], population[code]),
              patient3:
                graph === "graph1" || graph === "graph3"
                  ? patientTemp3[key3]
                  : perPopulation(patientTemp3[key3], population[code3]),
            });
          }
        }
      }
      if (code && code2 && code3) {
        for (let key2 in patientTemp2) {
          for (let key3 in patientTemp3) {
            if (key === key2 && key2 === key3 && key === key3) {
              patientList.push({
                date: remove2020(key),
                patient:
                  graph === "graph1" || graph === "graph3"
                    ? patientTemp[key]
                    : perPopulation(patientTemp[key], population[code]),
                patient2:
                  graph === "graph1" || graph === "graph3"
                    ? patientTemp2[key2]
                    : perPopulation(patientTemp2[key2], population[code2]),
                patient3:
                  graph === "graph1" || graph === "graph3"
                    ? patientTemp3[key3]
                    : perPopulation(patientTemp3[key3], population[code3]),
              });
            }
          }
        }
      }
    }
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
            <MenuItem value={"graph1"}>感染者累計</MenuItem>
            <MenuItem value={"graph2"}>10万人あたり</MenuItem>
            <MenuItem value={"graph3"}>日ごと増加数</MenuItem>
            ))}
          </Select>
        </FormControl>
        {isLoaded(citylist) && (
          <>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">区市町村1</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={code}
                onChange={handleChange}
              >
                {citylist.map((city) => (
                  <MenuItem value={city.code}>{city.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <div>
              {addition ? (
                <>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      区市町村2
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={code2}
                      onChange={handleChange2}
                    >
                      <MenuItem value="clear2">クリア</MenuItem>
                      {citylist.map((city) => (
                        <MenuItem value={city.code}>{city.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      区市町村3
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={code3}
                      onChange={handleChange3}
                    >
                      <MenuItem value="clear3">クリア</MenuItem>
                      {citylist.map((city) => (
                        <MenuItem value={city.code}>{city.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              ) : (
                <Button color="primary" onClick={handleAdditionClick}>
                  自治体を追加
                </Button>
              )}
            </div>
          </>
        )}

        <div style={{ marginTop: 30, width: "100%", height: "300px" }}>
          {isBarChart(patientList, barChart) && (
            <ResponsiveContainer>
              <BarChart
                data={patientList}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="patient"
                  barSize={50}
                  fill="#8884d8"
                  name={
                    name + ":" + population[code].toLocaleString() + "(人口)"
                  }
                />
                {name2 && (
                  <Bar
                    dataKey="patient2"
                    barSize={50}
                    fill="#82ca9d"
                    name={
                      name2 +
                      ":" +
                      population[code2].toLocaleString() +
                      "(人口)"
                    }
                  />
                )}
                {name3 && (
                  <Bar
                    dataKey="patient3"
                    barSize={50}
                    fill="#ffc658"
                    name={
                      name3 +
                      ":" +
                      population[code3].toLocaleString() +
                      "(人口)"
                    }
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          )}
          {lineChart && (
            <ResponsiveContainer>
              <LineChart
                data={patientList}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="patient"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  name={
                    name + ":" + population[code].toLocaleString() + "(人口)"
                  }
                />
                {name2 && (
                  <Line
                    type="monotone"
                    dataKey="patient2"
                    stroke="#82ca9d"
                    activeDot={{ r: 8 }}
                    name={
                      name2 +
                      ":" +
                      population[code2].toLocaleString() +
                      "(人口)"
                    }
                  />
                )}
                {name3 && (
                  <Line
                    type="monotone"
                    dataKey="patient3"
                    stroke="#ffc658"
                    activeDot={{ r: 8 }}
                    name={
                      name3 +
                      ":" +
                      population[code3].toLocaleString() +
                      "(人口)"
                    }
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </Card>
  );
}

export default BarChartPage;
