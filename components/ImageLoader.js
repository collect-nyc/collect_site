import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import styles from "./ImageLoader.module.scss";

const ImageLoader = ({ children }) => {
  const { ref, inView, entry } = useInView({
    threshold: 0.8,
    triggerOnce: true,
  });

  // const [blurFinished, setBlurFinished] = useState(false);

  console.log("inView", inView);

  const blurVariants = {
    blur: {
      filter: "blur(10px)",
    },
    unblur: {
      filter: "blur(0px)",
      transition: {
        filter: {
          duration: 0.5,
          ease: "circOut",
          delay: 0,
        },
      },
    },
  };

  return (
    <>
      <motion.div
        className={`${styles.blur_layer}`}
        ref={ref}
        initial="blur"
        animate={inView ? "unblur" : "blur"}
        // onAnimationComplete={() => setBlurFinished(true)}
        variants={blurVariants}
      >
        {children}
      </motion.div>
    </>
  );
};

export default ImageLoader;
