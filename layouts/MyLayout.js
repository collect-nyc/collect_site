import React, { useState, useEffect } from "react";
import SiteNav from "../components/SiteNav";
import useSWR from "swr";
import _ from "lodash";
import LoaderContext from "../components/LoaderContext";
import Loader from "../components/Loader";
import CaseStudyFade from "../components/CaseStudyFade";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MyLayout({ page, children }) {
  const { data, error } = useSWR("/api/get-nav-data", fetcher);
  const [loaderDidRun, setLoaderDidRun] = useState(false);

  // console.log("MYLAYOUT", page, data);

  const totalCount = data ? data.count + data.media : null;

  const tags = data ? data.tags : null;

  const latest_active =
    data && _.find(data.profile, { update: true }) ? true : false;

  return (
    <React.Fragment>
      <LoaderContext.Provider value={{ loaderDidRun, setLoaderDidRun }}>
        <Loader page={page} />

        <CaseStudyFade />

        <SiteNav
          page={page}
          count={data ? totalCount : null}
          latest={latest_active}
          tags={data ? tags : null}
          case_study={page.case_study}
        />
        {children}
      </LoaderContext.Provider>
    </React.Fragment>
  );
}
