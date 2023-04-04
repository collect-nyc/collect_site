import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import MemoryContext from "./MemoryContext";
import LoaderContext from "./LoaderContext";
import _ from "lodash";
import { motion } from "framer-motion";
import styles from "./Nav.module.scss";

function vh(percent) {
  var h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return (percent * h) / 100;
}

const HomeNav = ({ page, count, latest, tags, globalContent }) => {
  const { currentTag } = useContext(MemoryContext);
  const { archiveCounted, setArchiveCounted } = useContext(MemoryContext);
  const { loaderDidRun, setLoaderDidRun, animationDidRun, setAnimationDidRun } =
    useContext(LoaderContext);

  const [logoHover, setLogoHover] = useState(false);

  // display new item from array every 1.5 second looping
  const [currentItem, setCurrentItem] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(null);
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    // get half the viewport height in pixels
    setViewportHeight(vh(50));
    // console.log("viewport height", vh(50));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (globalContent && globalContent.services) {
        setCurrentItem((currentItem + 1) % globalContent.services.length);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [currentItem, globalContent]);

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
        }, 2400);
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

  const loaderVariants = {
    fadeIn: {
      opacity: [0, 1],
      // top: viewportHeight ? [viewportHeight - 49 + "px", "0px"] : null,
      // borderColor: ["#ffffff", "#000"],
      transition: {
        opacity: {
          duration: 0.3,
          ease: "linear",
        },
      },
    },
    slideUp: {
      opacity: 1,
      top: "0%",
      transition: {
        opacity: {
          duration: 0,
          ease: "linear",
        },
        top: {
          duration: 1,
          delay: 1,
        },
      },
    },
    normal: {
      opacity: 1,
      top: "0%",
      transition: {
        opacity: {
          duration: 0,
          ease: "linear",
        },
        top: {
          duration: 0,
          delay: 0,
        },
      },
    },
  };

  return (
    <motion.nav
      className={`${styles.navigation} ${styles.home} ${
        !loaderDidRun ? styles.loading : styles.loading
      }`}
      initial={
        !loaderDidRun
          ? { opacity: 0, borderColor: "#ffffff" }
          : { opacity: 1, borderColor: "#000" }
      }
      animate={
        !archiveCounted && !loaderDidRun
          ? "fadeIn"
          : archiveCounted && !loaderDidRun
          ? "slideUp"
          : "normal"
      }
      variants={loaderVariants}
    >
      <div className={styles.animscreen} />
      <div
        className={styles.loading_bar}
        style={{ width: `${count ? (newCount / count) * 100 : 0}%` }}
      />
      <div className={styles.top_left}>
        <div className={styles.link_box}>
          <Link href={"/profile"}>Collect NEW YORK</Link>
        </div>
      </div>
      <div className={styles.top_right}>
        <span className={styles.archive}>
          {globalContent && globalContent.services_descriptor
            ? globalContent.services_descriptor
            : "Independent agency for NEW IDEAS in"}{" "}
          {globalContent && globalContent.services
            ? globalContent && globalContent.services[currentItem].service
            : "Design"}
        </span>
        <div>
          {latest ? <span className={styles.latest}>Latest</span> : null}
          <Link
            href={
              currentTag && currentTag !== "All Work"
                ? `/archive?tag=${currentTag}`
                : "/archive"
            }
            className={styles.count_link}
          >
            ARCHIVE (
            {count && !archiveCounted
              ? newCount
              : count && archiveCounted
              ? count
              : 0}
            )
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default HomeNav;
