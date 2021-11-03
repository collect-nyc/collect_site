import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MemoryContext from "./MemoryContext";
import styles from "../styles/CaseStudyFade.module.scss";

export default function CaseStudyFade() {
  const { csColor, runCSFade } = useContext(MemoryContext);

  return runCSFade ? (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className={styles.case_study_fade}
        animate={{
          opacity: [0, 1],
          backgroundColor: ["#fafafa", csColor ? csColor : "#fafafa"],
        }}
        transition={{ ease: "easeOut", duration: 2 }}
        exit={{ opacity: [1, 0] }}
      >
        {/* this h1 is only here because Chrome has a fixed layer bug where it won't display unless there is content */}
        <h1>.</h1>
        <motion.div
          animate={{
            backgroundColor: ["#fafafa", csColor ? csColor : "#fafafa"],
          }}
          transition={{ ease: "easeOut", delay: 0, duration: 0.4 }}
          className={styles.double_hide}
        ></motion.div>
      </motion.div>
    </AnimatePresence>
  ) : null;
}
