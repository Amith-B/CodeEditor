import "./Source.css";

import { makeStyles } from "@material-ui/core/styles";
import {
  useContext,
  // useState
} from "react";
import {
  Button,
  ButtonGroup,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogTitle,
  IconButton,
  Paper,
} from "@material-ui/core";

import Editor from "./Editor";
// import LogInForm from "./Login";

import EditorContext from "../context/EditorContext";

const useStyles = makeStyles((theme) => ({
  "light-background": {
    backgroundColor: "white",
  },
  "dark-background": {
    backgroundColor: "#141414",
  },
}));

function Source() {
  const classes = useStyles();
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  const context = useContext(EditorContext);

  const getEditor = (context) => {
    const tab = context.activeTab.value;

    return (
      <Editor
        placeholder={context[tab.id].placeholder}
        isDark={context.isDark.value}
        mode={tab.editorMode}
        value={context[tab.id].value}
        onChange={(event) => context[tab.id].onChange(event)}
      />
    );
  };

  const getEditorClass = (context) => {
    const themeType = context.isDark.value ? "dark" : "light";

    return `${themeType}-background`;
  };

  const isDark = (context) => {
    return context.isDark.value;
  };

  const getEditorButtonClass = (isActive) => {
    const isActiveId = isActive ? "active" : "inactive";

    return `button ${isActiveId}-button-background`;
  };

  // const toggleDialog = () => {
  //   setIsDialogOpen((isOpen) => !isOpen);
  // };

  // async function handleLogIn(email, password) {
  //   // await logIn(email, password);
  // }

  return (
    <>
      <Paper
        elevation={3}
        className={[
          classes[getEditorClass(context)],
          "full-height",
          "paper",
        ].join(" ")}
      >
        <div className="editor-buttons">
          <ButtonGroup size="small" aria-label="small outlined button group">
            {context.tabList.map((tab) => {
              return (
                <Button
                  key={tab.id}
                  variant={
                    context.activeTab.value.id === tab.id
                      ? "contained"
                      : "outlined"
                  }
                  className={getEditorButtonClass(
                    context.activeTab.value.id === tab.id
                  )}
                  onClick={() => context.activeTab.onChange(tab)}
                >
                  <span
                    className="code-icon"
                    style={{
                      backgroundColor: tab.iconColor,
                      alignItems: tab.id === "css" ? "baseline" : "center",
                      color:
                        context.activeTab.value.id === tab.id
                          ? "inherit"
                          : "black",
                    }}
                  >
                    {tab.iconContent}
                  </span>
                  {tab.title}
                </Button>
              );
            })}
          </ButtonGroup>

          <ButtonGroup>
            {/* <IconButton
              aria-label="theme"
              size="small"
              style={{
                color: isDark(context) ? "white" : "black",
              }}
              onClick={toggleDialog}
            >
              <span className="material-icons">save</span>
            </IconButton> */}

            <IconButton
              aria-label="theme"
              size="small"
              style={{
                color: isDark(context) ? "white" : "black",
              }}
              onClick={() => context.isDark.onChange(!context.isDark.value)}
            >
              <span className="material-icons">
                {context.isDark.value ? "light_mode" : "dark_mode"}
              </span>
            </IconButton>
          </ButtonGroup>
        </div>

        <div className={["editor", context.isDark.value && "dark"].join(" ")}>
          {getEditor(context)}
        </div>
      </Paper>

      {/* <Dialog
        onClose={toggleDialog}
        aria-labelledby="customized-dialog-title"
        open={isDialogOpen}
      >
        <DialogTitle id="customized-dialog-title" onClose={toggleDialog}>
          Only Admin can save the code
        </DialogTitle>
        <DialogContent dividers>
          {context.user.value ? (
            <h1>Already Logged in</h1>
          ) : (
            <LogInForm handleLogIn={handleLogIn} />
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={toggleDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
}

export default Source;
