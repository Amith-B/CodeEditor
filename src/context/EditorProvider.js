import EditorContext from "./EditorContext";

import { useState } from "react";

export default function EditorProvider({ children }) {
  const [javascript, setJavascript] = useState("");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [combined, setCombined] = useState("");

  const tabList = [
    {
      id: "css",
      title: "CSS",
      editorMode: "css",
      iconColor: "#0cb9f7",
      iconContent: "*",
    },
    {
      id: "html",
      title: "html",
      editorMode: "html",
      iconColor: "#fc2e30",
      iconContent: "/",
    },
    {
      id: "javascript",
      title: "js",
      editorMode: "javascript",
      iconColor: "#eac116",
      iconContent: "( )",
    },
    {
      id: "combined",
      title: "combined",
      editorMode: "html",
      iconColor: "grey",
      iconContent: "</>",
    },
  ];

  const [activeTab, setActiveTab] = useState(tabList[0]);
  const [isDark, setIsDark] = useState(false);

  const updateCombined = (javascript, html, css) => {
    const combinedDom = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${javascript}</script>
      </body>
      </html>
      `;

    setCombined(combinedDom);
  };

  return (
    <EditorContext.Provider
      value={{
        tabList: tabList,
        activeTab: {
          value: activeTab,
          onChange: (newTab) => setActiveTab(newTab),
        },
        isDark: {
          value: isDark,
          onChange: (isDark) => setIsDark(isDark),
        },
        javascript: {
          value: javascript,
          onChange: (newContent) => {
            setJavascript(newContent);
            updateCombined(newContent, html, css);
          },
        },
        html: {
          value: html,
          onChange: (newContent) => {
            setHtml(newContent);
            updateCombined(javascript, newContent, css);
          },
        },
        css: {
          value: css,
          onChange: (newContent) => {
            setCss(newContent);
            updateCombined(javascript, html, newContent);
          },
        },
        combined: {
          value: combined,
          onChange: (newContent) => setCombined(newContent),
        },
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
