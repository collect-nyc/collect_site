import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoaderContext from "./LoaderContext";
import styles from "./Loader.module.scss";

export default function Loader({ page }) {
  const { loaderDidRun, setLoaderDidRun } = useContext(LoaderContext);

  return !loaderDidRun && page == "index" ? (
    <div className={styles.site_loader}>
      <AnimatePresence exitBeforeEnter>
        <motion.section
          className={styles.statement}
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
          <h1>
            <span className={styles.untitled}>NEW IDENTITIES</span>
            <span className={styles.caslon}>
              for Artists and Institutions, Commerce and Culture
            </span>
          </h1>
        </motion.section>
      </AnimatePresence>
    </div>
  ) : null;
}
