import React, { useEffect } from "react";
import SiteNav from "../components/SiteNav";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MyLayout({ page, nonav, children }) {
  const { data, error } = useSWR("/api/get-archives", fetcher);

  console.log("PAGE PAGE Page", page);

  return (
    <React.Fragment>
      {page !== "project" ? (
        <SiteNav page={page} count={data ? data : null} nonav={nonav} />
      ) : null}

      {children}
    </React.Fragment>
  );
}
