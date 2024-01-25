import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import NavContent from "./NavContent";
import MemoryContext from "../MemoryContext";
import LoaderContext from "../LoaderContext";
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

const HomeNav = ({ page, newCount, count, globalContent, showNav }) => {
  // const { currentTag } = useContext(MemoryContext);
  const { archiveCounted, mobileMenuOpen } = useContext(MemoryContext);
  const { loaderDidRun, setLoaderDidRun, animationDidRun, setAnimationDidRun } =
    useContext(LoaderContext);

  // const [viewportHeight, setViewportHeight] = useState(null);

  // useEffect(() => {
  //   // get half the viewport height in pixels
  //   setViewportHeight(vh(50));
  // }, []);

  const loaderVariants = {
    fadeIn: {
      opacity: [0, 1],
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
        mobileMenuOpen && styles.mobile_open
      } ${!loaderDidRun ? styles.loading : styles.loading}`}
      initial={
        !loaderDidRun
          ? { opacity: 0, borderColor: "#ffffff" }
          : { opacity: 1, borderColor: "#000" }
      }
      animate={
        !archiveCounted && !loaderDidRun
          ? "fadeIn"
          : archiveCounted && !loaderDidRun
          ? "normal"
          : "normal"
      }
      variants={loaderVariants}
    >
      <div className={styles.animscreen} />
      <div
        className={
          loaderDidRun
            ? `${styles.loading_bar} ${styles.finished}`
            : styles.loading_bar
        }
        style={{ width: `${count ? (newCount / count) * 100 : 0}%` }}
      />
      <NavContent
        newCount={newCount}
        count={count}
        globalContent={globalContent}
        page={page}
        showNav={showNav}
      />
    </motion.nav>
  );
};

export default HomeNav;
