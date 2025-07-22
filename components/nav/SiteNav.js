import React, { useState, useEffect, useContext, memo } from "react";
import MemoryContext from "../MemoryContext";
import LoaderContext from "../LoaderContext";
import HomeNav from "./HomeNav";
import DefaultNav from "./DefaultNav";

const SiteNav = ({ page, count, globalContent }) => {
  const { setArchiveCounted } = useContext(MemoryContext);
  const { loaderDidRun, setLoaderDidRun } = useContext(LoaderContext);
  const [newCount, setNewCount] = useState(0);
  const [showNav, setShowNav] = useState(loaderDidRun ? true : false);

  // Pick a random number of chunks for each load (between 5 and 12)
  const [chunks] = useState(() => Math.floor(Math.random() * 8) + 5); // 5-12
  const COUNT_INTERVAL = 180; // ms, slower for more visible steps
  const COUNT_INCREMENT = Math.ceil((count || 1) / chunks);

  const countUpTotal = (target) => {
    let numCount = 0;
    const intervalId = setInterval(() => {
      numCount += COUNT_INCREMENT;
      if (numCount >= target) {
        clearInterval(intervalId);
        setNewCount(target);
        setArchiveCounted(true);
        setTimeout(() => {
          setLoaderDidRun(true);
          setShowNav(true);
        }, 100); // minimal delay for smoothness
      } else {
        setNewCount(numCount);
      }
    }, COUNT_INTERVAL);
  };

  useEffect(() => {
    if (count) {
      countUpTotal(count);
    }
  }, [count]);

  return (
    <>
      {(() => {
        switch (page) {
          case "index":
            return (
              <HomeNav
                page={page}
                count={count}
                newCount={newCount}
                globalContent={globalContent}
                showNav={showNav}
              />
            );
          default:
            return (
              <DefaultNav
                page={page}
                newCount={newCount}
                count={count}
                globalContent={globalContent}
                showNav={true}
              />
            );
        }
      })()}
    </>
  );
};

export default memo(SiteNav);
