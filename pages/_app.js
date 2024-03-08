import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import MemoryContext from "../components/MemoryContext";
import Layout from "../layouts/Layout";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(null);
  const [pageHistory, setPageHistory] = useState(null);
  const [layoutView, setLayoutView] = useState(false);
  const [azSort, setAzSort] = useState(null);
  const [timeSort, setTimeSort] = useState(null);
  const [archiveList, setArchiveList] = useState([]);
  const [currentTag, setCurrentTag] = useState("All Work");
  const [navTextColor, setNavTextColor] = useState(null);
  const [archiveView, setArchiveView] = useState(false);
  const [caseStudyView, setCaseStudyView] = useState(false);
  const [runCSFade, setRunCSFade] = useState(false);
  const [csColor, setCsColor] = useState(null);
  const [imageTotal, setImageTotal] = useState(null);
  const [archiveCounted, setArchiveCounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMemory, setMobileMemory] = useState(false);

  useEffect(() => {
    setPageHistory(currentPage ? currentPage : null);
    setCurrentPage(router.asPath);
  }, [router.asPath]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      // setTimeout(() => {
      //   setMobileMenuOpen(false);
      //   setMobileMemory(false);
      // }, 300);

      if (window && window.gtag) {
        window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
          page_path: url,
        });
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <MemoryContext.Provider
      value={{
        pageHistory: pageHistory,
        currentPage: currentPage,
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
        navTextColor: navTextColor,
        setNavTextColor: setNavTextColor,
        caseStudyView: caseStudyView,
        setCaseStudyView: setCaseStudyView,
        archiveView: archiveView,
        setArchiveView: setArchiveView,
        runCSFade: runCSFade,
        setRunCSFade: setRunCSFade,
        csColor: csColor,
        setCsColor: setCsColor,
        imageTotal: imageTotal,
        setImageTotal: setImageTotal,
        archiveCounted: archiveCounted,
        setArchiveCounted: setArchiveCounted,
        mobileMenuOpen: mobileMenuOpen,
        setMobileMenuOpen: setMobileMenuOpen,
        mobileMemory: mobileMemory,
        setMobileMemory: setMobileMemory,
      }}
    >
      <Layout
        page={pageProps.page}
        case_study={pageProps.case_study ? pageProps.case_study : false}
        project_title={pageProps.project_title ? pageProps.project_title : null}
      >
        <Component {...pageProps} />
      </Layout>
    </MemoryContext.Provider>
  );
}

export default MyApp;
