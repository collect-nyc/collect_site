import { useState, useContext } from "react";
import Link from "next/link";
import MemoryContext from "./MemoryContext";
import LoaderContext from "./LoaderContext";
import { motion } from "framer-motion";
import styles from "../styles/Nav.module.scss";

const HomeNav = ({ page, count, latest, tags }) => {
  const { currentTag } = useContext(MemoryContext);
  const { loaderDidRun, setLoaderDidRun } = useContext(LoaderContext);

  const [logoHover, setLogoHover] = useState(false);

  return (
    <motion.nav
      className={`${styles.navigation} ${styles.home}`}
      initial={!loaderDidRun ? { opacity: 0 } : { opacity: 1 }}
      animate={
        !loaderDidRun
          ? {
              opacity: [0, 1],
            }
          : { opacity: 1 }
      }
      transition={{ ease: "easeOut", delay: 2, duration: 0.7 }}
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
              {logoHover ? (
                <span>
                  Collect <span className={styles.hide_mobile}>STUDIO</span>{" "}
                  PROFILE
                </span>
              ) : (
                "Collect NEW YORK"
              )}
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.top_right}>
        <span className={styles.archive}>Selected Works</span>
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
