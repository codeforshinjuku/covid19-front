import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import BarChartPage from "./BarChart";
import VerticalChartPage from "./VerticalChart";
import Copyright from "./Copyright";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import Fade from "@material-ui/core/Fade";
import Grow from "@material-ui/core/Grow";
import ReactGA from "react-ga";

ReactGA.initialize("UA-36217274-7");
ReactGA.pageview("/");

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: "100%",
  },
  contentTitle: {
    marginTop: "30px",
    marginBottom: "30px",
  },
  divider: {
    width: "30%",
    marginBottom: "30px",
  },
  paragraph: {
    marginBottom: "30px",
  },
  card: {
    padding: "5px",
  },
  buttons: {
    marginTop: "30px",
    marginBottom: "10px",
  },
  fb_icon: {
    marginRight: "10px",
  },
  attention: {
    fontSize: "10px",
  },
}));

export default function Top() {
  const classes = useStyles();
  return (
    <Fade in={true} timeout={{ enter: 1300 }}>
      <main className={classes.content}>
        <Toolbar />
        <Typography
          className={classes.contentTitle}
          variant="h4"
          component="h2"
        >
          東京都23区市町村別感染者グラフ
        </Typography>
        <Divider className={classes.divider} />
        <Typography paragraph className={classes.paragraph}>
          東京都が公開している新型コロナ感染症に関するデータを基礎自治体目線で整形し、累計、日別、10万人あたり、実効再生数(Rt)で表現しています。
          <br />
          <span paragraph className={classes.attention}>
            ※都と区市町村が公開する感染者数が異なる場合があります。
            <br />
            ※4/12練馬区が60から59へと減少する挙動は元データを反映したものです。
          </span>
        </Typography>
        <div className={classes.buttons}>
          <FacebookShareButton
            url={"https://stopcovid19.codeforshinjuku.org/"}
            className={classes.fb_icon}
          >
            <FacebookIcon size={30} round />
          </FacebookShareButton>
          <TwitterShareButton
            url={"https://stopcovid19.codeforshinjuku.org/"}
            title={"都内区市町村に特化した感染者グラフ | 東京新型コロナグラフ"}
            hashtags={["StopCOVID19JP"]}
          >
            <TwitterIcon size={30} round />
          </TwitterShareButton>
        </div>
        <Typography paragraph>
          <Grow in={true} timeout={{ enter: 2000 }}>
            <BarChartPage />
          </Grow>
          <VerticalChartPage />
        </Typography>
        <span paragraph className={classes.attention}>
          23区(特別区)
          千代田区、港区、中央区、新宿区、文京区、墨田区、江東区、品川区、目黒区、大田区、世田谷区、渋谷区、中野区、杉並区、豊島区、北区、荒川区、板橋区、練馬区、足立区、葛飾区、江戸川区
          <br />
          市町村
          八王子市、立川市、武蔵野市、三鷹市、青梅市、府中市、昭島市、調布市、町田市、小金井市、小平市、日野市、東村山市、国分寺市、国立市、福生市、狛江市、東大和市、清瀬市、東久留米市、武蔵村山市、多摩市、稲城市、羽村市、あきる野市、西東京市、瑞穂町、日の出町、檜原村、奥多摩町、大島町、利島村、新島村、神津島村、三宅村、御蔵島村、八丈町、青ヶ島村、小笠原村
        </span>
        <Copyright />
      </main>
    </Fade>
  );
}
