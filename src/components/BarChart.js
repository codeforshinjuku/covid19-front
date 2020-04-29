import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ComposedChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
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
  const [rtList, setRtList] = useState(false);
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
    if (event.target.value === "graph3" || event.target.value == "graph4") {
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

  if (!rtList) {
    getData(rtUrl, setRtList);
  }

  //JSONの加工
  let patientList = [];
  let patientTemp;
  let patientTemp2;
  let patientTemp3;
  if (isLoaded(patient) && patient[code] && diffList[code] && rtList.data) {
    patientTemp =
      graph === "graph1" || graph === "graph2"
        ? patient[code]
        : graph === "graph3"
        ? diffList[code]
        : rtList.data[code];
    if (code2) {
      patientTemp2 =
        graph === "graph1" || graph === "graph2"
          ? patient[code2]
          : graph === "graph3"
          ? diffList[code2]
          : rtList.data[code2];
    }
    if (code3) {
      patientTemp3 =
        graph === "graph1" || graph === "graph2"
          ? patient[code3]
          : graph === "graph3"
          ? diffList[code3]
          : rtList.data[code3];
    }

    for (let key in patientTemp) {
      if (code && !code2 && !code3)
        patientList.push({
          date:
            graph === "graph4"
              ? remove2020(patientTemp[key].date)
              : remove2020(key),
          patient:
            graph === "graph1" || graph === "graph3"
              ? patientTemp[key]
              : graph === "graph2"
              ? perPopulation(patientTemp[key], population[code])
              : [
                  patientTemp[key].ML,
                  [patientTemp[key].Low_90, patientTemp[key].High_90],
                ],
        });
      if (code && code2 && !code3) {
        for (let key2 in patientTemp2) {
          if (key2 === key) {
            patientList.push({
              date:
                graph === "graph4"
                  ? remove2020(patientTemp[key].date)
                  : remove2020(key),
              patient:
                graph === "graph1" || graph === "graph3"
                  ? patientTemp[key]
                  : graph === "graph2"
                  ? perPopulation(patientTemp[key], population[code])
                  : [
                      patientTemp[key].ML,
                      [patientTemp[key].Low_90, patientTemp[key].High_90],
                    ],
              patient2:
                graph === "graph1" || graph === "graph3"
                  ? patientTemp2[key2]
                  : graph === "graph2"
                  ? perPopulation(patientTemp2[key2], population[code2])
                  : [
                      patientTemp2[key2].ML,
                      [patientTemp2[key2].Low_90, patientTemp2[key2].High_90],
                    ],
            });
          }
        }
      }
      if (code && !code2 && code3) {
        for (let key3 in patientTemp3) {
          if (key3 === key) {
            patientList.push({
              date:
                graph === "graph4"
                  ? remove2020(patientTemp[key].date)
                  : remove2020(key),
              patient:
                graph === "graph1" || graph === "graph3"
                  ? patientTemp[key]
                  : graph === "graph2"
                  ? perPopulation(patientTemp[key], population[code])
                  : [
                      patientTemp[key].ML,
                      [patientTemp[key].Low_90, patientTemp[key].High_90],
                    ],
              patient3:
                graph === "graph1" || graph === "graph3"
                  ? patientTemp3[key3]
                  : graph === "graph2"
                  ? perPopulation(patientTemp3[key3], population[code3])
                  : [
                      patientTemp3[key3].ML,
                      [patientTemp3[key3].Low_90, patientTemp3[key3].High_90],
                    ],
            });
          }
        }
      }
      if (code && code2 && code3) {
        for (let key2 in patientTemp2) {
          for (let key3 in patientTemp3) {
            if (key === key2 && key2 === key3 && key === key3) {
              patientList.push({
                date:
                  graph === "graph4"
                    ? remove2020(patientTemp[key].date)
                    : remove2020(key),
                patient:
                  graph === "graph1" || graph === "graph3"
                    ? patientTemp[key]
                    : graph === "graph2"
                    ? perPopulation(patientTemp[key], population[code])
                    : [
                        patientTemp[key].ML,
                        [patientTemp[key].Low_90, patientTemp[key].High_90],
                      ],
                patient2:
                  graph === "graph1" || graph === "graph3"
                    ? patientTemp2[key2]
                    : graph === "graph2"
                    ? perPopulation(patientTemp2[key2], population[code2])
                    : [
                        patientTemp2[key2].ML,
                        [patientTemp2[key2].Low_90, patientTemp2[key2].High_90],
                      ],
                patient3:
                  graph === "graph1" || graph === "graph3"
                    ? patientTemp3[key3]
                    : graph === "graph2"
                    ? perPopulation(patientTemp3[key3], population[code3])
                    : [
                        patientTemp3[key3].ML,
                        [patientTemp3[key3].Low_90, patientTemp3[key3].High_90],
                      ],
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
            <MenuItem value={"graph1"}>累計感染者数</MenuItem>
            <MenuItem value={"graph2"}>10万人あたり感染者数</MenuItem>
            <MenuItem value={"graph3"}>日別感染者数</MenuItem>
            <MenuItem value={"graph4"}>実効再生産数</MenuItem>
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
              <ComposedChart
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
                {graph === "graph4" ? (
                  <YAxis tickSize={5} ticks={[0.5, 1.0, 2.0, 3.0, 4.0, 5.0]} />
                ) : (
                  <YAxis />
                )}
                <Tooltip />
                <Legend />
                {graph === "graph4" && <ReferenceLine y={1} stroke="red" />}
                <Line
                  type="monotone"
                  dataKey={graph === "graph3" ? "patient" : "patient[0]"}
                  stroke="#8884d8"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name={
                    name + ":" + population[code].toLocaleString() + "(人口)"
                  }
                />
                {name2 && (
                  <Line
                    type="monotone"
                    dataKey={graph === "graph3" ? "patient2" : "patient2[0]"}
                    stroke="#82ca9d"
                    strokeWidth={2}
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
                    dataKey={graph === "graph3" ? "patient3" : "patient3[0]"}
                    stroke="#ffc658"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    name={
                      name3 +
                      ":" +
                      population[code3].toLocaleString() +
                      "(人口)"
                    }
                  />
                )}
                {graph === "graph4" && (
                  <Area
                    type="monotone"
                    dataKey="patient[1]"
                    stroke="none"
                    fill="#8884d8"
                    activeDot={false}
                    opacity={0.2}
                    isAnimationActive={false}
                    name={name + "信頼区間90%"}
                  />
                )}
                {name2 && graph === "graph4" && (
                  <Area
                    type="monotone"
                    dataKey="patient2[1]"
                    stroke="none"
                    fill="#82ca9d"
                    activeDot={false}
                    opacity={0.2}
                    isAnimationActive={false}
                    name={name2 + "信頼区間90%"}
                  />
                )}
                {name3 && graph === "graph4" && (
                  <Area
                    type="monotone"
                    dataKey="patient2[1]"
                    stroke="none"
                    fill="#ffc658"
                    activeDot={false}
                    opacity={0.2}
                    isAnimationActive={false}
                    name={name3 + "信頼区間90%"}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </Card>
  );
}

export default BarChartPage;
