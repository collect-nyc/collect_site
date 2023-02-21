import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MemoryContext from "./MemoryContext";
import styles from "./CaseStudyFade.module.scss";

export default function CaseStudyFade() {
  const { csColor, runCSFade } = useContext(MemoryContext);

  return (
    <AnimatePresence exitBeforeEnter>
      {runCSFade ? (
        <motion.div
          className={styles.case_study_fade}
          animate={{
            opacity: [0, 1],
            backgroundColor: ["#ffffff", csColor ? csColor : "#ffffff"],
          }}
          transition={{ ease: "easeOut", duration: 0.2 }}
          exit={{
            opacity: [1, 0],
            transition: { duration: 0.2, ease: "easeOut" },
          }}
        >
          {/* this h1 is only here because Chrome has a fixed layer bug where it won't display unless there is content */}
          <h1>.</h1>
          <motion.div
            animate={{
              backgroundColor: ["#ffffff", csColor ? csColor : "#ffffff"],
            }}
            transition={{ ease: "easeOut", delay: 0, duration: 0.4 }}
            className={styles.double_hide}
          ></motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
