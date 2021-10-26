import * as React from "react";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useDragControls,
} from "framer-motion";
import { wrap } from "popmotion";
// import { images } from "./image-data";
import Image from "next/image";
import styles from "../styles/ImageSlider.module.scss";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export const ImageSlider = (images) => {
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  // const bounceStiffness = 90; // Affects the stiffness of the bounce spring. Higher values will create more sudden movement.
  // const bounceDamping = 80;

  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderChildrenWidth, setSliderChildrenWidth] = useState(0);
  const [sliderConstraints, setSliderConstraints] = useState(0);
  const [coverWidth, setCoverWidth] = useState(0);

  useEffect(() => {
    setCoverWidth(constraintsRef?.current?.scrollWidth);
  }, []);

  useEffect(() => {
    console.log("FREAK");

    if (!constraintsRef && !constraintsRef.current) return;

    const calcSliderChildrenWidth = () => {
      setSliderChildrenWidth(constraintsRef?.current?.scrollWidth);
    };

    calcSliderChildrenWidth();

    const calcSliderWidth = () => {
      setSliderWidth(constraintsRef?.current?.clientWidth);
    };

    calcSliderWidth();
    window.addEventListener("resize", calcSliderWidth);

    const calcSliderConstraints = () => {
      setSliderConstraints(sliderChildrenWidth - sliderWidth);
    };

    calcSliderConstraints();
    window.addEventListener("resize", calcSliderConstraints);

    console.log(
      "Measurements",
      sliderConstraints,
      -Math.abs(sliderConstraints),
      sliderChildrenWidth,
      sliderWidth
    );
  }, [constraintsRef, sliderChildrenWidth, sliderWidth]);

  const ImageSet = images.images;

  return (
    <motion.div className={styles.image_slider_container} ref={constraintsRef}>
      <motion.div
        className={styles.image_row}
        drag="x"
        // dragPropagation={true}
        initial={{ x: 0 }}
        style={{ x }}
        dragConstraints={{
          left: -Math.abs(sliderConstraints),
          // left: -1648,
          right: 0,
        }}
        dragElastic={0}
        // dragTransition={{ bounceStiffness, bounceDamping }}
      >
        <motion.div
          className={styles.cover}
          style={{ width: coverWidth + "px" }}
        ></motion.div>

        {ImageSet.map((imageItem, index) => (
          <figure
            key={index}
            // custom={direction}
            // variants={variants}
            // initial="enter"
            // animate="center"
            // exit="exit"
            // onClick={() => paginate(1)}
            // transition={{
            //   x: { type: "spring", stiffness: 300, damping: 30 },
            //   opacity: { duration: 0.2 },
            // }}
            // drag="x"
            // dragConstraints={{ left: 0, right: 0 }}
            // dragElastic={1}
            // onDragEnd={(e, { offset, velocity }) => {
            //   const swipe = swipePower(offset.x, velocity.x);

            //   if (swipe < -swipeConfidenceThreshold) {
            //     paginate(1);
            //   } else if (swipe > swipeConfidenceThreshold) {
            //     paginate(-1);
            //   }
            // }}
          >
            <Image
              src={imageItem.image.url}
              alt={imageItem.image.alt}
              height={imageItem.image.dimensions.height}
              width={imageItem.image.dimensions.width}
              layout={"responsive"}
              objectFit={"cover"}
            />
          </figure>
        ))}
      </motion.div>
      <div className={styles.next} onClick={() => paginate(1)}>
        {"‣"}
      </div>
      <div className={styles.prev} onClick={() => paginate(-1)}>
        {"‣"}
      </div>
    </motion.div>
  );
};
