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
          <div className={styles.nyc}>COLLECT NYC</div>
          <div className={styles.archive}>COLLECT Archive</div>
        </motion.div>
      </AnimatePresence>
    </div>
  ) : null;
}
