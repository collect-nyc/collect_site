import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "../styles/ArchiveLoader.module.scss";

export default function Loader({ data }) {
  console.log("Loader", data);

  const {
    left_text_line_one,
    left_text_line_two,
    right_text_line_one,
    right_text_line_two,
    left_images,
    right_images,
  } = data;

  return (
    <section className={styles.loader_section}>
      <div className={styles.left_side}>
        <p>
          <span>{left_text_line_one && left_text_line_one}</span>
          <span>{left_text_line_two && left_text_line_two}</span>
        </p>
      </div>
      <div className={styles.right_side}>
        <p>
          <span>{right_text_line_one && right_text_line_one}</span>
          <span>{right_text_line_two && right_text_line_two}</span>
        </p>
      </div>
    </section>
  );
}
