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
          東京都が公開している新型コロナ感染症に関するデータを基礎自治体目線で整形し、各種グラフで表現しています。
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
        <Copyright />
      </main>
    </Fade>
  );
}
