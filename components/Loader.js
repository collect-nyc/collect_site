import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoaderContext from "./LoaderContext";
import styles from "../styles/Loader.module.scss";

export default function Loader({ page }) {
  const { loaderDidRun, setLoaderDidRun } = useContext(LoaderContext);

  return !loaderDidRun && page == "index" ? (
    <div className={styles.site_loader}>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          className={styles.inner_card}
          // initial={{ opacity: 1, backgroundColor: "#f3f3f3" }}
          animate={{
            opacity: [1, 0],
            transitionEnd: {
              display: "none",
            },
          }}
          transition={{ ease: "easeOut", delay: 1.5, duration: 0.4 }}
          onAnimationComplete={() => setLoaderDidRun(true)}
        >
          <div className={styles.nyc}>
            <span className={styles.desktop}>COLLECT NYC</span>
            <span className={styles.mobile}>
              COLLECT
              <br />
              New York City
            </span>
          </div>
          <div className={styles.archive}>
            <span className={styles.desktop}>COLLECT Archive</span>
            <span className={styles.mobile}>
              COLLECT
              <br />
              Archive
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  ) : null;
}
