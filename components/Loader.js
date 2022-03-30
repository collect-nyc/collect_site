import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoaderContext from "./LoaderContext";
import CollectLogotype from "../svg/collect_logotype.svg";
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
          <div className={styles.logo}>
            <span>
              <CollectLogotype />
            </span>
          </div>
          <div className={styles.description}>
            <span>Studio for Direction, Development, Photo and Design</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  ) : null;
}
