import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Copyright from "./Copyright";
import Link from "@material-ui/core/Link";
import Banner from "../images/banner_covid19.png";
import { Helmet } from "react-helmet";
import Fade from "@material-ui/core/Fade";
import ReactGA from "react-ga";

ReactGA.initialize("UA-36217274-7");
ReactGA.pageview("/about");

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
  banner: {
    width: "100%",
    marginTop: "30px",
    marginBottom: "30px",
  },
  link: {
    color: "#888",
    fontWeight: "bold",
  },
}));

export default function Top() {
  const classes = useStyles();
  return (
    <Fade in={true} timeout={{ enter: 1300 }}>
      <main className={classes.content}>
        <Helmet>
          <title>当サイトについて | 東京新型コロナグラフ</title>
        </Helmet>
        <Toolbar />
        <Typography paragraph className={classes.paragraph}>
          <img
            src={Banner}
            className={classes.banner}
            alt="東京新型コロナグラフ"
            width="100%"
          />
        </Typography>
        <Typography
          className={classes.contentTitle}
          variant="h4"
          component="h3"
        >
          東京新型コロナグラフについて
        </Typography>
        <Divider className={classes.divider} />
        <Typography paragraph className={classes.paragraph}>
          東京新型コロナグラフは、東京都が公開している新型コロナウイルス感染者データを活用した区市町村別分析サービスです。
          <br />
          基礎自治体の目線を意識したデータやチャートを選定いたしました。
          <br />
          自治体関係者のみなさまや住民のみなさまにご活用いただければ幸いです。
        </Typography>
        <Typography paragraph className={classes.paragraph}>
          本サービスは、横断的な情報収集の時間を減らすことを目的にしております。
          <br />
          都内には、毎日のように政府や各自治体の感染者数を確認することで不安を感じている方もたくさんいらっしゃいます。
          <br />
          もちろん、厳しいお立場の方もいらっしゃるとは思いますが、地域からもできることをはじめられている方も増えてきました。
          <br />
          例えば、オンラインによる企画や飲食店のテイクアウトなど様々な取り組みが活発になってきました。
          <br />
          ポジティブなことにも目を向けていただければ幸いです。
          <br />
        </Typography>
        <Typography paragraph className={classes.paragraph}>
          <Link
            className={classes.link}
            color="inherit"
            href="https://codeforshinjuku.org/"
            target="_blank"
          >
            Code for Shinjuku
          </Link>
          では、新宿区在住・在勤・在学、また新宿区を愛する方を中心にテクノロジーで地域課題を解決する取り組みを行っています。
          <br />
          各種データを整形し、区市町村に特化したJSONで出力するシステムを開発し、
          <Link
            className={classes.link}
            color="inherit"
            href="https://github.com/codeforshinjuku"
            target="_blank"
          >
            GitHub
          </Link>
          に公開いたしました。
          <br />
          東京新型コロナグラフに関わっていただける方を募集しております。
          <br />
          <Link
            color="inherit"
            className={classes.link}
            href="https://www.facebook.com/groups/codeforshinjuku/"
            target="_blank"
          >
            Facebookグループ
          </Link>
          でも情報共有を行っているので、ご興味のある方はご参加をお願いします。
        </Typography>
        <Copyright />
      </main>
    </Fade>
  );
}
