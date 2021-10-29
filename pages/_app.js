import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MemoryContext from "../components/MemoryContext";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [layoutView, setLayoutView] = useState(false);
  const [azSort, setAzSort] = useState(null);
  const [timeSort, setTimeSort] = useState(null);
  const [archiveList, setArchiveList] = useState([]);
  const [currentTag, setCurrentTag] = useState("All Work");
  const [scrollPos, setScrollPos] = useState(null);
  // returnPage = true if you are coming from a page where it's ok to shuffle the archive list
  const [returnPage, setReturnPage] = useState(false);
  const [navTextColor, setNavTextColor] = useState(null);
  const [archiveView, setArchiveView] = useState(false);
  const [caseStudyView, setCaseStudyView] = useState(false);

  // If component is passed from page
  const Layout = Component.Layout ? Component.Layout : React.Fragment;

  // useEffect(() => {
  //   console.log("Archive View Set: ", archiveView);
  // }, [archiveView]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

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
        returnPage: returnPage,
        setReturnPage: setReturnPage,
        navTextColor: navTextColor,
        setNavTextColor: setNavTextColor,
        caseStudyView: caseStudyView,
        setCaseStudyView: setCaseStudyView,
        archiveView: archiveView,
        setArchiveView: setArchiveView,
      }}
    >
      <Layout page={pageProps.page}>
        <Component {...pageProps} />
      </Layout>
    </MemoryContext.Provider>
  );
}

export default MyApp;
