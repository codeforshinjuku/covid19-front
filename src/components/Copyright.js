import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  copyright: {
    marginTop: "50px",
  },
}));

function Copyright() {
  const classes = useStyles();
  return (
    <Typography
      className={classes.copyright}
      variant="body2"
      color="textSecondary"
      align="center"
    >
      {"Copyright © "}
      <Link target="_blank" color="inherit" href="https://codeforshinjuku.org">
        Code for Shinjuku
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
