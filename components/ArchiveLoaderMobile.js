import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./ArchiveLoader.module.scss";

export default function ArchiveLoaderMobile({ data }) {
  const [allImages, setAllImages] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  const {
    left_images,
    right_images,
    mobile_text_one,
    mobile_text_two,
    mobile_text_three,
  } = data;

  const imgStyle = (imgSrc) => ({
    backgroundImage: `url(${imgSrc})`,
  });

  const [seconds, setSeconds] = useState(0);

  // start the interval for the timer which sets the cadence for image changes
  useEffect(() => {
    // console.log("Loader", data);
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // combine both left and right image arrays into one array alternating between items from each
  useEffect(() => {
    let result = [],
      i,
      l = Math.min(left_images.length, right_images.length);

    for (i = 0; i < l; i++) {
      result.push(left_images[i], right_images[i]);
    }
    result.push(...left_images.slice(l), ...right_images.slice(l));

    // console.log(result);

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
              style={imgStyle(image.image.url)}
              key={index}
              initial="hidden"
              animate={currentImage === index ? "visible" : "hidden"}
              variants={variants}
            ></motion.li>
          ))}
        </ul>
      ) : null}
      {/* <div className={styles.text_container}>
        <p>
          <span>{mobile_text_one && mobile_text_one}</span>
          <span>{mobile_text_two && mobile_text_two}</span>
        </p>
      </div> */}

      {/* <Link href={"/"}>
        <a className={styles.return_link}>Return to SELECTED WORK</a>
      </Link> */}
    </section>
  );
}
