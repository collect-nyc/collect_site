import React, { useState, useEffect, useContext } from "react";
import MemoryContext from "../MemoryContext";
import LoaderContext from "../LoaderContext";
import HomeNav from "./HomeNav";
import DefaultNav from "./DefaultNav";

const SiteNav = ({ page, count, globalContent }) => {
  const { setArchiveCounted } = useContext(MemoryContext);
  const { loaderDidRun, setLoaderDidRun } = useContext(LoaderContext);
  const [newCount, setNewCount] = useState(0);
  const [showNav, setShowNav] = useState(loaderDidRun ? true : false);

  function getRandomTime() {
    const minNumber = 450;
    const maxNumber = 750;

    return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
  }

  const countUpTotal = (target) => {
    let numCount = 0;

    let countUpTime = getRandomTime();

    const intervalId = setInterval(() => {
      const minIncrement = 150;
      const maxIncrement = 250;

      numCount += Math.floor(
        Math.random() * (maxIncrement - minIncrement + 1) + minIncrement
      );

      // If the count is greater than or equal to the total, stop the interval and log the final count
      if (numCount > target) {
        clearInterval(intervalId);

        if (page === "index") {
          window.scrollTo(0, 0);
        }

        setNewCount(target);
        setArchiveCounted(true);
        setTimeout(() => {
          // window.document.body.classList.remove("noscroll");
          setLoaderDidRun(true);
          setShowNav(true);
        }, 750);
      } else if (numCount >= target) {
        clearInterval(intervalId);
        // console.log(`Final count: ${numCount}`);
        setNewCount(numCount);
        setArchiveCounted(true);
      } else {
        // console.log(`Counting up: ${numCount}`);
        setNewCount(numCount);
      }
    }, countUpTime);
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

export default SiteNav;
