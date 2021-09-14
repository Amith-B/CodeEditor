import EditorContext from "./EditorContext";

import { useEffect, useState } from "react";

import intialCode from "./initialData";

export default function EditorProvider({ children }) {
  const [javascript, setJavascript] = useState(intialCode().javascript);
  const [html, setHtml] = useState(intialCode().html);
  const [css, setCss] = useState(intialCode().css);
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
  const [isDark, setIsDark] = useState(true);
  const [user, setUser] = useState(null);
  const [codeList, setCodeList] = useState([]);

  const updateCombined = (javascript, html, css) => {
    const combinedDom = `<!DOCTYPE html>
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

  useEffect(() => {
    updateCombined(javascript, html, css);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <EditorContext.Provider
      value={{
        tabList: tabList,
        rtdbURL:
          "https://code-idea-f7e15-default-rtdb.asia-southeast1.firebasedatabase.app/",
        user: {
          value: user,
          onChange: (newUser) => setUser(newUser),
        },
        code: {
          value: codeList,
          onChange: (list) => setCodeList(list),
        },
        activeTab: {
          value: activeTab,
          onChange: (newTab) => setActiveTab(newTab),
        },
        isDark: {
          value: isDark,
          onChange: (isDark) => setIsDark(isDark),
        },
        javascript: {
          placeholder: "Type javascript here...",
          value: javascript,
          onChange: (newContent) => {
            setJavascript(newContent);
            updateCombined(newContent, html, css);
          },
        },
        html: {
          placeholder: "Type html body here...",
          value: html,
          onChange: (newContent) => {
            setHtml(newContent);
            updateCombined(javascript, newContent, css);
          },
        },
        css: {
          placeholder: "Type css here...",
          value: css,
          onChange: (newContent) => {
            setCss(newContent);
            updateCombined(javascript, html, newContent);
          },
        },
        combined: {
          placeholder: "Type html here...",
          value: combined,
          onChange: (newContent) => setCombined(newContent),
        },
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
