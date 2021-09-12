import "./Source.css";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

import Editor from "./Editor";
import EditorContext from "../context/EditorContext";

const useStyles = makeStyles((theme) => ({
  "light-background": {
    backgroundColor: "white",
  },
  "dark-background": {
    backgroundColor: "#002b36",
  },
}));

function Source() {
  const classes = useStyles();

  const getEditor = (context) => {
    const tab = context.activeTab.value;
    return (
      <Editor
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

  return (
    <EditorContext.Consumer>
      {(context) => (
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
          </div>

          <div className={["editor", context.isDark.value && "dark"].join(" ")}>
            {getEditor(context)}
          </div>
        </Paper>
      )}
    </EditorContext.Consumer>
  );
}

export default Source;
