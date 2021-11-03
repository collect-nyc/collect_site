import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MemoryContext from "./MemoryContext";
import styles from "../styles/CaseStudyFade.module.scss";

export default function CaseStudyFade() {
  const { csColor, runCSFade } = useContext(MemoryContext);

  return (
    <AnimatePresence exitBeforeEnter>
      {runCSFade ? (
        <motion.div
          className={styles.case_study_fade}
          animate={{
            opacity: [0, 1],
            backgroundColor: ["#fafafa", csColor ? csColor : "#fafafa"],
          }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          exit={{
            opacity: [1, 0],
            transition: { duration: 4, ease: "easeOut" },
          }}
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
      ) : null}
    </AnimatePresence>
  );
}
