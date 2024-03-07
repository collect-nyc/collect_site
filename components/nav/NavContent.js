import React, { useEffect, useState, useContext } from "react";
import MemoryContext from "../MemoryContext";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Nav.module.scss";

const NavContent = ({ page, count, newCount, globalContent, showNav }) => {
  const { archiveCounted, setMobileMenuOpen } = useContext(MemoryContext);

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

  const navVariants = {
    closed: {
      opacity: 0,
      transition: {
        opacity: { duration: 0.2, ease: "easeInOut" },
      },
      transitionEnd: {
        display: "none",
      },
    },
    open: {
      display: "flex",
      opacity: 1,
      transition: {
        opacity: { duration: 0.2, ease: "easeInOut" },
      },
    },
  };

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
              onClick={() => {
                setNavOpen(false);
                setMobileMenuOpen(false);
              }}
            >
              Close X
            </button>
          ) : (
            <button
              className={`${styles.mobile_btn} ${styles.mobile_link}`}
              onClick={() => {
                setNavOpen(true);
                setMobileMenuOpen(true);
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
        className={`${styles.mobile_nav} ${navOpen && styles.open}`}
        variants={navVariants} // Apply variants
        initial="closed"
        animate={navOpen ? "open" : "closed"}
      >
        <ul>
          <li>
            <Link
              className={`${page === "index" && styles.current} ${
                !showNav ? styles.hide : styles.show
              }`}
              onClick={() => {
                setNavOpen(false);
                setMobileMenuOpen(false);
              }}
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
              onClick={() => {
                setNavOpen(false);
                setMobileMenuOpen(false);
              }}
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
              onClick={() => {
                setNavOpen(false);
                setMobileMenuOpen(false);
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
            >
              Book a Call ↗
            </a>
          </li>
        </ul>
        {/* <footer className={styles.footer}>
          <div className={styles.top_border} />
          <div className={styles.contact}>
            <div className={styles.col}>
              <span className={styles.address}>
                100A Broadway #377
                <br /> Brooklyn, NY 11249
              </span>
              <div className={styles.social}>
                <a
                  href="https://www.instagram.com/collect.nyc/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.insta}
                >
                  @collect.nyc
                </a>
                <a
                  href="https://www.instagram.com/shop.editions/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.insta}
                >
                  @shop.editions
                </a>
              </div>
            </div>

            <div className={styles.col}>
              <div className={styles.reachout}>
                <span className={styles.phone}>
                  <a href="mailto:info@collect.nyc">info@collect.nyc</a>
                </span>
                <span className={styles.phone}>+1 718 902 4911</span>
              </div>
              <div className={styles.extra}>
                <Link
                  onClick={() => {
                    setNavOpen(false);
                    setMobileMenuOpen(false);
                  }}
                  href="/info/privacy"
                >
                  Privacy
                </Link>
                <Link
                  onClick={() => {
                    setNavOpen(false);
                    setMobileMenuOpen(false);
                  }}
                  href="/info/impressum"
                >
                  Impressum
                </Link>
              </div>
            </div>
          </div>
        </footer> */}
        <span className={styles.copyright}>
          ©{new Date().getFullYear()} Collect NEW YORK
        </span>
      </motion.div>
    </>
  );
};

export default NavContent;
