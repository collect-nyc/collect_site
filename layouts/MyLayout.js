import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SiteNav from "../components/nav/SiteNav";
import useSWR from "swr";
import _ from "lodash";
import LoaderContext from "../components/LoaderContext";
// import Loader from "../components/Loader";
import CaseStudyFade from "../components/CaseStudyFade";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MyLayout({
  page,
  case_study,
  project_title,
  children,
}) {
  const { data, error } = useSWR("/api/get-nav-data", fetcher);

  const router = useRouter();

  const [loaderDidRun, setLoaderDidRun] = useState(
    router.pathname === "/" ? false : true
  );

  // useEffect(() => {
  //   console.log("Loader Run", loaderDidRun);
  // }, [loaderDidRun]);

  // console.log("MYLAYOUT", document, page, "Case Study", case_study, data);

  const totalCount = data ? data.count + data.media : null;

  const tags = data ? data.tags : null;

  const gc = data ? data.globalContent : null;

  // const tagPlus = data ? data.tagplus : null;

  // console.log(tagPlus);

  useEffect(() => {
    if (page === "case_study") {
      document.body.classList.add("case_study");
    } else if (page === "case_study_carousel") {
      document.body.classList.add("case_study_carousel");
    } else {
      document.body.classList.remove("case_study");
      document.body.classList.remove("case_study_carousel");
    }
  }, [page]);

  // const latest_active =
  //   data && _.find(data.profile, { update: true }) ? true : false;

  return (
    <React.Fragment>
      <LoaderContext.Provider value={{ loaderDidRun, setLoaderDidRun }}>
        {/*<Loader page={page} />*/}

        <CaseStudyFade />

        <SiteNav
          page={page}
          count={totalCount ? totalCount : 0}
          tags={data && tags ? tags : null}
          case_study={case_study}
          project_title={project_title}
          globalContent={gc ? gc : null}
        />
        {children}
      </LoaderContext.Provider>
    </React.Fragment>
  );
}
