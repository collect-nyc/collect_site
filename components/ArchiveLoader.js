import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../styles/ArchiveLoader.module.scss";

export default function Loader({ data }) {
  // console.log("Loader", data);

  const [leftImage, setLeftImage] = useState(0);
  const [rightImage, setRightImage] = useState(0);

  const {
    left_text_line_one,
    left_text_line_two,
    right_text_line_one,
    right_text_line_two,
    left_images,
    right_images,
  } = data;

  const imgStyle = (imgSrc) => ({
    backgroundImage: `url(${imgSrc})`,
  });

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds % 2 === 0) {
      if (leftImage < left_images.length - 1) {
        setLeftImage(leftImage + 1);
      } else {
        setLeftImage(0);
      }
    } else {
      if (rightImage < right_images.length - 1) {
        setRightImage(leftImage + 1);
      } else {
        setRightImage(0);
      }
    }
  }, [seconds]);

  const variants = {
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className={styles.loader_section}>
      <div className={styles.left_side}>
        {left_images && left_images.length > 0 ? (
          <ul className={styles.image_array}>
            {left_images.map((image, index) => (
              <motion.li
                className={leftImage === index ? `${styles.current}` : null}
                style={imgStyle(image.image.url)}
                key={index}
                initial="hidden"
                animate={leftImage === index ? "visible" : "hidden"}
                variants={variants}
              ></motion.li>
            ))}
          </ul>
        ) : null}
        <p>
          <span>{left_text_line_one && left_text_line_one}</span>
          <span>{left_text_line_two && left_text_line_two}</span>
        </p>
      </div>
      <div className={styles.right_side}>
        {right_images && right_images.length > 0 ? (
          <ul className={styles.image_array}>
            {right_images.map((image, index) => (
              <motion.li
                className={rightImage === index ? `${styles.current}` : null}
                style={imgStyle(image.image.url)}
                key={index}
                initial="hidden"
                animate={rightImage === index ? "visible" : "hidden"}
                variants={variants}
              ></motion.li>
            ))}
          </ul>
        ) : null}
        <p>
          <span>{right_text_line_one && right_text_line_one}</span>
          <span>{right_text_line_two && right_text_line_two}</span>
        </p>
      </div>
    </section>
  );
}
