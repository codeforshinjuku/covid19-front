import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import CssBaseline from "@material-ui/core/CssBaseline";
import Top from "./components/Top";
import About from "./components/About";
import Header from "./components/Header";
import createBrowserHistory from "history/createBrowserHistory";

const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

function App(props) {
  const classes = useStyles();

  return (
    <Router history={history}>
      <div className={classes.root}>
        <CssBaseline />
        <Header width={props.width} />
        <Switch>
          <Route exact path="/" component={Top} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default withWidth()(App);
