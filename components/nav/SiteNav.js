import React, { useState, useEffect, useContext } from "react";
import MemoryContext from "../MemoryContext";
import LoaderContext from "../LoaderContext";
import HomeNav from "./HomeNav";
import DefaultNav from "./DefaultNav";
// import ArchiveNav from "./ArchiveNav";
// import ArchiveItemNav from "./ArchiveItemNav";
// import CaseStudyNav from "./CaseStudyNav";

// import EssentialTextNav from "./EssentialTextNav";

const SiteNav = ({ page, count, globalContent }) => {
  const { archiveCounted, setArchiveCounted } = useContext(MemoryContext);
  const { loaderDidRun, setLoaderDidRun, animationDidRun, setAnimationDidRun } =
    useContext(LoaderContext);
  const [newCount, setNewCount] = useState(0);
  const [showNav, setShowNav] = useState(loaderDidRun ? true : false);

  function getRandomTime() {
    // console.log("Random time", Math.floor(Math.random() * 201) + 100);
    // return Math.floor(Math.random() * 201) + 100;

    const minNumber = 700;
    const maxNumber = 1000;

    return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
  }

  const countUpTotal = (target) => {
    // console.log("Counting up to: " + target);
    // Set the starting count to 0
    let numCount = 0;

    let countUpTime = getRandomTime();

    const intervalId = setInterval(() => {
      const minIncrement = 75;
      const maxIncrement = 150;

      numCount += Math.floor(
        Math.random() * (maxIncrement - minIncrement + 1) + minIncrement
      );

      // If the count is greater than or equal to the total, stop the interval and log the final count
      if (numCount > target) {
        clearInterval(intervalId);
        window.scrollTo(0, 0);
        setNewCount(target);
        setArchiveCounted(true);
        setTimeout(() => {
          // window.document.body.classList.remove("noscroll");
          setLoaderDidRun(true);
          setShowNav(true);
        }, 2000);
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
      console.log("Count: " + count);
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
