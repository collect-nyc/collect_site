import React, { useEffect, useState, useContext } from "react";
import MemoryContext from "../MemoryContext";
import LoaderContext from "../LoaderContext";
import Link from "next/link";
import styles from "./Nav.module.scss";

const NavContent = ({ page, count, newCount, globalContent, showNav }) => {
  const { archiveCounted, setArchiveCounted } = useContext(MemoryContext);

  // display new item from array every 1.5 second looping
  const [currentItem, setCurrentItem] = useState(0);
  const [navOpen, setNavOpen] = useState(false);

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
          {page === "archive_index" ? (
            "Collect ARCHIVE, Reopening Fall 2023"
          ) : (
            <>
              {globalContent && globalContent.description
                ? globalContent.description
                : "Independent agency for"}{" "}
              {globalContent && globalContent.services
                ? globalContent && globalContent.services[currentItem]
                : "Design"}
            </>
          )}
        </span>
        <div className={styles.archive_link}>
          <span className={styles.desktop_nav}>
            <Link
              className={`${page === "index" && styles.current} ${
                !showNav ? styles.hide : styles.show
              }`}
              href={"/"}
            >
              Selected Projects
            </Link>
            <Link
              className={`${page === "services" && styles.current} ${
                !showNav ? styles.hide : styles.show
              }`}
              href={"/services"}
            >
              Agency Services
            </Link>
            <Link
              className={`${page === "about" && styles.current} ${
                !showNav ? styles.hide : styles.show
              }`}
              href={"/about"}
            >
              Get in Touch
            </Link>
          </span>
          {navOpen ? (
            <button
              className={styles.mobile_btn}
              onClick={() => setNavOpen(false)}
            >
              Close X
            </button>
          ) : (
            <button
              className={`${styles.mobile_btn} ${styles.mobile_link}`}
              onClick={() => setNavOpen(true)}
            >
              <span className={!showNav ? styles.hide : styles.show}>Menu</span>{" "}
              (
              {count && !archiveCounted
                ? newCount
                : count && archiveCounted
                ? count
                : 0}
              )
            </button>
          )}
          <Link
            href={"/work"}
            className={`${styles.count_link} ${styles.desktop_link} ${
              page === "work" && styles.current
            }`}
          >
            <span className={!showNav ? styles.hide : styles.show}>
              All Work
            </span>{" "}
            (
            {count && !archiveCounted
              ? newCount
              : count && archiveCounted
              ? count
              : 0}
            )
          </Link>
        </div>
      </div>
      <div className={`${styles.mobile_nav} ${navOpen && styles.open}`}>
        <ul>
          <li>
            <Link
              className={`${page === "index" && styles.current} ${
                !showNav ? styles.hide : styles.show
              }`}
              onClick={() => setNavOpen(false)}
              href={"/"}
            >
              Selected Projects
            </Link>
          </li>

          <li>
            <Link
              className={`${page === "services" && styles.current} ${
                !showNav ? styles.hide : styles.show
              }`}
              onClick={() => setNavOpen(false)}
              href={"/services"}
            >
              Agency Services
            </Link>
          </li>
          <li>
            <Link
              className={`${page === "about" && styles.current} ${
                !showNav ? styles.hide : styles.show
              }`}
              href={"/about"}
              onClick={() => setNavOpen(false)}
            >
              Get in Touch
            </Link>
          </li>
          <li>
            <Link
              href={"/work"}
              className={`${styles.count_link} ${
                page === "work" && styles.current
              }`}
              onClick={() => setNavOpen(false)}
            >
              <span className={!showNav ? styles.hide : styles.show}>
                All Work
              </span>{" "}
              (
              {count && !archiveCounted
                ? newCount
                : count && archiveCounted
                ? count
                : 0}
              )
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavContent;
