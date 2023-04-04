import React, { useEffect, useState, useContext } from "react";
import MemoryContext from "../MemoryContext";
import LoaderContext from "../LoaderContext";
import Link from "next/link";
import styles from "./Nav.module.scss";

const NavContent = ({ page, count, newCount, globalContent }) => {
  const { archiveCounted, setArchiveCounted } = useContext(MemoryContext);
  const { loaderDidRun, setLoaderDidRun, animationDidRun, setAnimationDidRun } =
    useContext(LoaderContext);
  // display new item from array every 1.5 second looping
  const [currentItem, setCurrentItem] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (globalContent && globalContent.services) {
        setCurrentItem((currentItem + 1) % globalContent.services.length);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [currentItem, globalContent]);

  return (
    <>
      <div className={styles.top_left}>
        <div className={styles.link_box}>
          <Link href={"/"}>Collect NEW YORK</Link>
        </div>
      </div>
      <div className={`${styles.top_right} ${styles.profile_right}`}>
        <span className={styles.archive}>
          {globalContent && globalContent.services_descriptor
            ? globalContent.services_descriptor
            : "Independent agency for NEW IDEAS in"}{" "}
          {globalContent && globalContent.services
            ? globalContent && globalContent.services[currentItem].service
            : "Design"}
        </span>
        <div className={styles.archive_link}>
          <Link className={page === "index" && styles.current} href={"/"}>
            Selected Projects
          </Link>
          <Link
            className={page === "services" && styles.current}
            href={"/services"}
          >
            Agency Services
          </Link>
          <Link className={page === "about" && styles.current} href={"/about"}>
            About
          </Link>
          <Link
            href={"/archive"}
            className={`${styles.count_link} ${
              page === "work" && styles.current
            }`}
          >
            All Work (
            {count && !archiveCounted
              ? newCount
              : count && archiveCounted
              ? count
              : 0}
            )
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavContent;
