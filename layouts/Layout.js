import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import _ from "lodash";
import LoaderContext from "../components/LoaderContext";
import CaseStudyFade from "../components/CaseStudyFade";
import SiteNav from "../components/nav/SiteNav";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Layout({ page, case_study, project_title, children }) {
  // getting nav count
  const { data, error } = useSWR("/api/get-nav-data", fetcher);
  const totalCount = data ? data.count : null;
  const tags = data ? data.tags : null;
  const gc = data ? data.globalContent : null;

  const router = useRouter();

  const [loaderDidRun, setLoaderDidRun] = useState(
    router.pathname === "/" ? false : true
  );

  useEffect(() => {
    if (page === "essential") {
      document.body.className = "essential";
    } else if (page === "index") {
      document.body.className = "homepage";
    } else if (page === "about") {
      document.body.className = "about";
    } else if (page === "services") {
      document.body.className = "services";
    } else if (page === "work") {
      document.body.className = "work";
    } else if (page === "archive_index") {
      document.body.className = "archive_index";
    } else {
      document.body.className = "";
    }
  }, [page]);

  return (
    <LoaderContext.Provider value={{ loaderDidRun, setLoaderDidRun }}>
      <CaseStudyFade />

      <SiteNav
        page={page}
        count={totalCount ? totalCount : 0}
        tags={data && tags ? tags : null}
        globalContent={gc ? gc : null}
        case_study={case_study}
        project_title={project_title}
      />
      {children}
    </LoaderContext.Provider>
  );
}
