import React, { useContext, useEffect } from "react";
import SiteNav from "../components/SiteNav";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MyLayout({ page, children }) {
  const { data, error } = useSWR("/api/get-count", fetcher);

  console.log("MYLAYOUT", data);

  const totalCount = data ? data.count + data.media : null;

  return (
    <React.Fragment>
      {page !== "project" ? (
        <SiteNav page={page} count={data ? totalCount : null} />
      ) : null}

      {children}
    </React.Fragment>
  );
}
