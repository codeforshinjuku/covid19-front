import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import withWidth from "@material-ui/core/withWidth";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "@material-ui/core/Link";
import BarChartIcon from "@material-ui/icons/BarChart";
import CodeIcon from "@material-ui/icons/Code";
import MenuIcon from "@material-ui/icons/Menu";
import GitHubIcon from "@material-ui/icons/GitHub";
import LogoIcon from "../images/logo_white.png";
import Top from "./Top";
import About from "./About";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#0092a8",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  headerIcon: {
    verticalAlign: "middle",
    height: "25px",
    marginRight: "10px",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 15,
    [theme.breakpoints.up("sm")]: {
      fontWeight: "bold",
      fontSize: 17,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
}));

function Main(props) {
  const { width } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let drawerStatus = "";
  let menuStatus = "";
  if (width === "xs") {
    drawerStatus = "temporary";
    menuStatus = true;
  } else {
    drawerStatus = "permanent";
    menuStatus = false;
  }

  const drawer = (
    <div className={classes.drawerContainer}>
      <List>
        <ListItem
          button
          component={Link}
          href="/"
          style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
        >
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="区市町村別分析" />
        </ListItem>

        <ListItem
          button
          component={Link}
          href="/about"
          style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
        >
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
          <ListItemText primary="当サイトについて" />
        </ListItem>
        <ListItem
          button
          component={Link}
          href={"https://github.com/codeforshinjuku"}
          target="_blank"
          style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
        >
          <ListItemIcon>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText primary="GitHub" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {menuStatus && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h1" className={classes.headerTitle}>
            <Link href="/">
              <img
                src={LogoIcon}
                className={classes.headerIcon}
                alt="東京新型コロナグラフ"
              />
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant={drawerStatus}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Toolbar />
        {drawer}
      </Drawer>
      <Router>
        <Switch>
          <Route exact path="/" component={Top} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    </div>
  );
}

export default withRouter(withWidth()(Main));
