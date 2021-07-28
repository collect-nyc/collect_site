import React, { useState } from "react";
import MemoryContext from "../components/MemoryContext";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const [layoutView, setLayoutView] = useState(false);
  const [azSort, setAzSort] = useState(null);
  const [timeSort, setTimeSort] = useState(null);
  const [archiveList, setArchiveList] = useState(null);
  const [currentTag, setCurrentTag] = useState("All Work");
  const [scrollPos, setScrollPos] = useState(null);

  // If component is passed
  const Layout = Component.Layout ? Component.Layout : React.Fragment;

  return (
    <MemoryContext.Provider
      value={{
        layoutView: layoutView,
        setLayoutView: setLayoutView,
        azSort: azSort,
        setAzSort: setAzSort,
        timeSort: timeSort,
        setTimeSort: setTimeSort,
        currentTag: currentTag,
        setCurrentTag: setCurrentTag,
        archiveList: archiveList,
        setArchiveList: setArchiveList,
        scrollPos: scrollPos,
        setScrollPos: setScrollPos,
      }}
    >
      <Layout page={pageProps.page}>
        <Component {...pageProps} />
      </Layout>
    </MemoryContext.Provider>
  );
}

export default MyApp;
