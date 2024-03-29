import "./Editor.css";

import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/mode/css";
import "brace/mode/html";
import "brace/theme/tomorrow";
import "brace/theme/twilight";

import { debounce } from "lodash";
import { useCallback } from "react";

const update = debounce((value, onChangeCallback) => {
  onChangeCallback(value);
}, 2000);

function Editor({ isDark, mode, value, onChange, placeholder }) {
  const debouceRequest = useCallback(
    (value) => update(value, onChange),
    [onChange]
  );

  return (
    <>
      <AceEditor
        placeholder={placeholder}
        mode={mode}
        theme={isDark ? "twilight" : "tomorrow"}
        wrapEnabled={true}
        width={"100%"}
        name="editor"
        maxLines={Infinity}
        value={value}
        fontSize={14}
        editorProps={{ $blockScrolling: true }}
        onChange={debouceRequest}
      />
    </>
  );
}

export default Editor;
