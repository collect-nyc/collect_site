import React from "react";
import SiteNav from "../components/SiteNav";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MyLayout({ page, children }) {
  const { data, error } = useSWR("/api/get-count", fetcher);

  // console.log("MYLAYOUT", data);

  return (
    <React.Fragment>
      {page !== "project" ? (
        <SiteNav page={page} count={data ? data.results_size * 4 : null} />
      ) : null}

      {children}
    </React.Fragment>
  );
}
