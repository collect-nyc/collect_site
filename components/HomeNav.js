import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import MemoryContext from "./MemoryContext";
import LoaderContext from "./LoaderContext";
import { motion } from "framer-motion";
import styles from "../styles/Nav.module.scss";

const HomeNav = ({ page, count, latest, tags, globalContent }) => {
  const { currentTag } = useContext(MemoryContext);
  const { loaderDidRun, setLoaderDidRun } = useContext(LoaderContext);

  const [logoHover, setLogoHover] = useState(false);

  // console.log("global content", globalContent);

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

  const loaderVariants = {
    animate: {
      opacity: [0, 1],
      top: ["48%", "0%"],
      borderColor: ["#fafafa", "#000"],
      transition: {
        opacity: {
          duration: 0.3,
          ease: "linear",
        },
        top: {
          duration: 1,
          delay: 0.8,
        },
        borderColor: {
          delay: 1.8,
          duration: 0.3,
        },
      },
    },
    default: {
      borderColor: "#000",
      opacity: 1,
      top: "0%",
    },
  };

  return (
    <motion.nav
      className={`${styles.navigation} ${styles.home}`}
      initial={
        !loaderDidRun
          ? { opacity: 0, borderColor: "#fafafa" }
          : { opacity: 1, borderColor: "#000" }
      }
      animate={!loaderDidRun ? "animate" : "default"}
      onAnimationComplete={() => setLoaderDidRun(true)}
      variants={loaderVariants}
    >
      <div className={styles.top_left}>
        <div className={styles.link_box}>
          <Link href={"/profile"}>
            <a
              onMouseEnter={() => {
                setLogoHover(true);
              }}
              onMouseLeave={() => {
                setLogoHover(false);
              }}
            >
              {logoHover ? <span>Agency PROFILE</span> : "Collect NEW YORK"}
            </a>
          </Link>
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
          >
            <a className={styles.count_link}>ARCHIVE ({count ? count : 0})</a>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default HomeNav;
