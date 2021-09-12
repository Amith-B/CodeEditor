import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    overflow: "initial",
  },
  titleIcon: {
    background: "linear-gradient(-45deg, #e03d60 31%, #000000 78%)",
    borderRadius: "50%",
    padding: "7px 5px",
    marginRight: "6px",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Fab
            color="primary"
            className={classes.menuButton}
            size="small"
            onClick={toggleDrawer}
            style={{ zIndex: 100, marginRight: "8px" }}
          >
            <span className="material-icons">list</span>
          </Fab>
          <Typography className={classes.title} variant="h6" noWrap>
            <span className={classes.titleIcon}>{"</>"}</span>Code Idea
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <span className="material-icons">search</span>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer}
      >
        <div className="drawer__heading">
          <Paper elevation={3} className="drawer__heading-paper">
            <h2 className="drawer__heading-text">
              <span className="material-icons">list</span>List
            </h2>
          </Paper>
          <IconButton color="primary" size="medium" onClick={toggleDrawer}>
            <span className="material-icons">arrow_back_ios_new</span>
          </IconButton>
        </div>
      </Drawer>
    </div>
  );
}
