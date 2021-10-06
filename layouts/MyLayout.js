import React from "react";
import SiteNav from "../components/SiteNav";
import useSWR from "swr";
import _ from "lodash";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MyLayout({ page, children }) {
  const { data, error } = useSWR("/api/get-nav-data", fetcher);

  // console.log("MYLAYOUT", data);

  const totalCount = data ? data.count + data.media : null;

  const tags = data ? data.tags : null;

  const latest_active =
    data && _.find(data.profile, { update: true }) ? true : false;

  console.log(page);

  return (
    <React.Fragment>
      {page !== "project" ? (
        <SiteNav
          page={page}
          count={data ? totalCount : null}
          latest={latest_active}
          tags={data ? tags : null}
        />
      ) : null}

      {children}
    </React.Fragment>
  );
}
