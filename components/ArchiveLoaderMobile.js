import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "../styles/ArchiveLoader.module.scss";

export default function ArchiveLoaderMobile({ data }) {
  const [allImages, setAllImages] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  const {
    left_text_line_one,
    left_text_line_two,
    right_text_line_one,
    right_text_line_two,
    left_images,
    right_images,
    mobile_text_one_1,
    mobile_text_one_2,
    mobile_text_two_1,
    mobile_text_two_2,
    mobile_text_two_3,
    mobile_text_three_1,
    mobile_text_three_2,
  } = data;

  const imgStyle = (imgSrc) => ({
    backgroundImage: `url(${imgSrc})`,
  });

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log("Loader", data);
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let result = [],
      i,
      l = Math.min(left_images.length, right_images.length);

    for (i = 0; i < l; i++) {
      result.push(left_images[i], right_images[i]);
    }
    result.push(...left_images.slice(l), ...right_images.slice(l));

    console.log(result);

    setAllImages(result);
  }, [left_images, right_images]);

  useEffect(() => {
    if (allImages && allImages.length > 0) {
      if (currentImage < allImages.length - 1) {
        setCurrentImage(currentImage + 1);
      } else {
        setCurrentImage(0);
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
    <section className={styles.loader_section_mobile}>
      {allImages && allImages.length > 0 ? (
        <ul className={styles.image_array}>
          {allImages.map((image, index) => (
            <motion.li
              className={currentImage === index ? `${styles.current}` : null}
              style={imgStyle(image.image.url)}
              key={index}
              initial="hidden"
              animate={currentImage === index ? "visible" : "hidden"}
              variants={variants}
            ></motion.li>
          ))}
        </ul>
      ) : null}
      <p>
        <span>
          <em>{mobile_text_one_1 && mobile_text_one_1}</em>
          <em>{mobile_text_one_2 && mobile_text_one_2}</em>
        </span>
        <span>
          <em>{mobile_text_two_1 && mobile_text_two_1}</em>
          <em>{mobile_text_two_2 && mobile_text_two_2}</em>
          <em>{mobile_text_two_3 && mobile_text_two_3}</em>
        </span>
        <span>
          <em>{mobile_text_three_1 && mobile_text_three_1}</em>
          <em>{mobile_text_three_2 && mobile_text_three_2}</em>
        </span>
      </p>

      <Link href={"/"}>
        <a className={styles.return_link}>Return to SELECTED WORK</a>
      </Link>
    </section>
  );
}
