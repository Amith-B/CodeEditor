import "./SourceView.css";

import SplitPane, { Pane } from "react-split-pane";
import { useMediaQuery, useTheme } from "@material-ui/core";

import Source from "./Source";
import View from "./View";
import "./SplitBar.css";

function SourceView() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    noSsr: true,
  });
  return (
    <SplitPane
      className={["split-pane", isMobile ? "max-height" : ""].join(" ")}
      split={isMobile ? "horizontal" : "vertical"}
      defaultSize={"50%"}
      primary="second"
    >
      <Pane className="pane" initialSize="50%" minSize="10%" maxSize="500px">
        <Source />
      </Pane>
      <Pane className="pane" initialSize="50%" minSize="10%" maxSize="500px">
        <View />
      </Pane>
    </SplitPane>
  );
}

export default SourceView;
