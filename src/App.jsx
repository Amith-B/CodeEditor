import "./App.css";

import SourceView from "./components/SourceView";
import EditorProvider from "./context/EditorProvider";
import SearchAppBar from "./components/AppBar";

function App() {
  return (
    <EditorProvider>
      <div className="App">
        <SearchAppBar />
        <SourceView />
      </div>
    </EditorProvider>
  );
}

export default App;
