import axios from "axios";

export const citylistUrl =
  "https://raw.githubusercontent.com/codeforshinjuku/covid19/master/dist/citylist.json";

export const patientUrl =
  "https://raw.githubusercontent.com/codeforshinjuku/covid19/master/dist/patient.json";

export const diffUrl =
  "https://raw.githubusercontent.com/codeforshinjuku/covid19/master/dist/patient_diff.json";

export function getPopulation() {
  const population = {
    "131016": 66080,
    "131024": 168553,
    "131032": 260535,
    "131041": 349101,
    "131059": 236043,
    "131067": 209463,
    "131075": 270218,
    "131083": 519652,
    "131091": 412861,
    "131105": 287741,
    "131113": 739548,
    "131121": 939669,
    "131130": 235148,
    "131148": 342623,
    "131156": 585632,
    "131164": 300613,
    "131172": 354171,
    "131181": 218826,
    "131199": 583467,
    "131202": 742840,
    "131211": 683360,
    "131229": 454910,
    "131237": 695241,
    "132012": 576383,
    "132021": 180650,
    "132039": 148439,
    "132047": 192402,
    "132055": 133303,
    "132063": 263169,
    "132071": 112124,
    "132080": 239754,
    "132098": 433882,
    "132101": 125755,
    "132110": 196430,
    "132128": 190018,
    "132136": 150289,
    "132144": 128058,
    "132152": 75129,
    "132187": 57285,
    "132195": 83804,
    "132209": 84230,
    "132217": 75136,
    "132225": 116361,
    "132233": 71542,
    "132241": 147589,
    "132250": 91790,
    "132276": 54537,
    "132284": 80012,
    "132292": 206232,
    "133035": 32317,
    "133051": 17106,
    "133078": 1979,
    "133086": 4863,
    "133612": 7221,
    "133621": 347,
    "133639": 2591,
    "133647": 1853,
    "133817": 2262,
    "133825": 335,
    "134015": 7086,
    "134023": 176,
    "134210": 3057,
  };
  return population;
}

//エラー落ち防止のためにロード

export function isLoaded(s) {
  if (s === "" || s === false) {
    return false;
  } else {
    return true;
  }
}

export function isBarChart(patientList, barChart) {
  if (patientList && barChart) {
    return true;
  } else {
    return false;
  }
}

//何度か使う関数
export function remove2020(n) {
  return n.toString().replace("2020/", "");
}

export function perPopulation(n1, n2) {
  return Math.floor((n1 / n2) * 100000);
}

//データの取得
export function getData(url, func) {
  axios
    .get(url)
    .then((results) => {
      func(results.data);
    })
    .catch((error) => {
      console.log("通信失敗");
      console.log(error.status);
    });
}
