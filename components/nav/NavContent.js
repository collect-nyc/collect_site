import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import MemoryContext from "../MemoryContext";
import { motion, cubicBezier } from "framer-motion";
import Link from "next/link";
import styles from "./Nav.module.scss";
import { set } from "lodash";

const NavContent = ({ page, count, newCount, globalContent, showNav }) => {
  const router = useRouter();
  const isRootPage = router.pathname === "/";

  const {
    archiveCounted,
    mobileMenuOpen,
    setMobileMenuOpen,
    mobileMemory,
    setMobileMemory,
  } = useContext(MemoryContext);

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

  const customEase = cubicBezier(0.5, 1, 0.89, 1);

  const navVariants = {
    closed: {
      opacity: 0,
      transition: {
        opacity: { duration: 0.2, ease: customEase },
      },
      transitionEnd: {
        display: "none",
      },
    },
    open: {
      display: "flex",
      opacity: 1,
      transition: {
        opacity: { duration: 0.2, ease: customEase },
      },
    },
    openTransition: {
      display: "flex",
      opacity: 1,
      transition: {
        opacity: { duration: 0, ease: "linear" },
      },
    },
  };

  return (
    <>
      <div className={styles.top_left}>
        <div className={styles.link_box}>
          <Link
            href={"/"}
            onClick={() => {
              if (isRootPage) {
                setMobileMenuOpen(false);
                setMobileMemory(false);
              } else {
                setMobileMemory(false);
              }
            }}
          >
            Collect NEW YORK
          </Link>
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
          {mobileMenuOpen ? (
            <button
              className={styles.mobile_btn}
              onClick={() => {
                // setNavOpen(false);
                setMobileMenuOpen(false);
                setMobileMemory(false);
              }}
            >
              Close X
            </button>
          ) : (
            <button
              className={`${styles.mobile_btn} ${styles.mobile_link}`}
              onClick={() => {
                // setNavOpen(true);
                setMobileMenuOpen(true);
                setMobileMemory(true);
              }}
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
          {/* <Link
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
          </Link> */}
          <span
            className={`${styles.count_link} ${styles.desktop_link} ${
              page === "work" && styles.current
            }`}
          >
            (
            {count && !archiveCounted
              ? newCount
              : count && archiveCounted
              ? count
              : 0}
            )
          </span>
        </div>
      </div>
      <motion.div
        className={`${styles.mobile_nav} ${mobileMenuOpen && styles.open}`}
        variants={navVariants} // Apply variants
        initial="closed"
        animate={
          mobileMenuOpen && mobileMemory
            ? "open"
            : mobileMenuOpen && mobileMemory === false
            ? "openTransition"
            : "closed"
        }
      >
        <ul>
          <li>
            <Link
              className={`${page === "index" && styles.current} ${
                !showNav ? styles.hide : styles.show
              }`}
              href={"/"}
              onClick={() => {
                setMobileMemory(false);
              }}
            >
              Selected Projects
            </Link>
          </li>

          <li>
            <Link
              className={`${page === "services" && styles.current} ${
                !showNav ? styles.hide : styles.show
              }`}
              href={"/services"}
              onClick={() => {
                setMobileMemory(false);
              }}
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
              onClick={() => {
                setMobileMemory(false);
              }}
            >
              Get in Touch
            </Link>
          </li>
          <li>
            <a
              href="https://calendly.com/collect-nyc"
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                setMobileMenuOpen(false);
                setMobileMemory(false);
              }}
            >
              Book a Call ↗
            </a>
          </li>
        </ul>

        <span className={styles.copyright}>
          ©{new Date().getFullYear()} Collect NEW YORK
        </span>
      </motion.div>
    </>
  );
};

export default NavContent;
