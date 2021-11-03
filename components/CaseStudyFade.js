import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MemoryContext from "./MemoryContext";
import styles from "../styles/CaseStudyFade.module.scss";

export default function CaseStudyFade() {
  const { csColor, setCsColor, runCSFade, setRunCSFade } =
    useContext(MemoryContext);

  return runCSFade ? (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className={styles.case_study_fade}
        animate={{
          opacity: [0, 1],
          backgroundColor: ["#fafafa", csColor ? csColor : "#fafafa"],
        }}
        transition={{ ease: "easeOut", duration: 0.3 }}
        exit={{ opacity: [1, 0] }}
        // onAnimationComplete={() => setRunCSFade(false)}
      >
        <h1>c</h1>
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
