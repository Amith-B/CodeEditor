import "./View.css";

import Paper from "@material-ui/core/Paper";

import EditorContext from "../context/EditorContext";

function View() {
  return (
    <EditorContext.Consumer>
      {(context) => {
        return (
          <Paper elevation={3} className="full-height paper">
            <div className="view full-height">
              <iframe title="Document" srcDoc={context.combined.value} />
            </div>
          </Paper>
        );
      }}
    </EditorContext.Consumer>
  );
}

export default View;
