import * as React from "react";
import { createRef, useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useDragControls,
} from "framer-motion";
// import { wrap } from "popmotion";
import Image from "next/image";
import styles from "./ImageSlider.module.scss";
import LeftArrow from "../svg/left-arrow.svg";
import RightArrow from "../svg/right-arrow.svg";

// const variants = {
//   enter: (direction) => {
//     return {
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0,
//     };
//   },
//   center: {
//     zIndex: 1,
//     x: 0,
//     opacity: 1,
//   },
//   exit: (direction) => {
//     return {
//       zIndex: 0,
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0,
//     };
//   },
// };

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */

// const swipeConfidenceThreshold = 10000;
// const swipePower = (offset, velocity) => {
//   return Math.abs(offset) * velocity;
// };

export const ImageSlider = ({ images, text_color, background_color }) => {
  const ImageSet = images;

  const constraintsRef = useRef(null);
  // create the refs for the figure elements in the slider
  const myRefs = useRef([]);
  myRefs.current = ImageSet.map(
    (element, i) => myRefs.current[i] ?? createRef()
  );

  const x = useMotionValue(0);
  // const bounceStiffness = 90; // Affects the stiffness of the bounce spring. Higher values will create more sudden movement.
  // const bounceDamping = 80;

  const [elRefs, setElRefs] = React.useState([]);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderChildrenWidth, setSliderChildrenWidth] = useState(0);
  const [sliderConstraints, setSliderConstraints] = useState(0);
  const [coverWidth, setCoverWidth] = useState(0);

  // some state for the slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesOffset, setSlidesOffset] = useState(0);

  useEffect(() => {
    setCoverWidth(constraintsRef?.current?.scrollWidth);
  }, []);

  useEffect(() => {
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

    // console.log(
    //   "Measurements",
    //   sliderConstraints,
    //   -Math.abs(sliderConstraints),
    //   sliderChildrenWidth,
    //   sliderWidth
    // );

    return () => {
      window.removeEventListener("resize", calcSliderWidth);
      window.removeEventListener("resize", calcSliderConstraints);
    };
  }, [constraintsRef, sliderChildrenWidth, sliderWidth]);

  const NextSlide = () => {
    if (currentSlide + 1 >= ImageSet.length) {
      setSlidesOffset(-Math.abs(myRefs.current[0].current.offsetLeft));
      setCurrentSlide(0);
    } else {
      setSlidesOffset(
        -Math.abs(myRefs.current[currentSlide + 1].current.offsetLeft)
      );
      setCurrentSlide(currentSlide + 1);
    }
  };

  const PrevSlide = () => {
    if (currentSlide == 0) {
      setSlidesOffset(
        -Math.abs(myRefs.current[ImageSet.length - 1].current.offsetLeft)
      );
      setCurrentSlide(ImageSet.length - 1);
    } else {
      setSlidesOffset(
        -Math.abs(myRefs.current[currentSlide - 1].current.offsetLeft)
      );
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <>
      <motion.div
        className={styles.image_slider_container}
        ref={constraintsRef}
      >
        <motion.div
          className={styles.image_row}
          animate={{ x: slidesOffset }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          // drag="x"
          // initial={{ x: 0 }}
          // style={{ x }}
          // dragConstraints={{
          //   left: -Math.abs(sliderConstraints),
          //   right: 0,
          // }}
          // dragElastic={0}
          // dragTransition={{ bounceStiffness, bounceDamping }}
        >
          <motion.div
            className={styles.cover}
            style={{ width: coverWidth + "px" }}
          ></motion.div>

          {ImageSet.map((imageItem, index) => (
            <figure
              key={index}
              onClick={() => {
                NextSlide();
                // setCurrentSlide(index);
                // setSlidesOffset(
                //   -Math.abs(myRefs.current[index].current.offsetLeft)
                // );
              }}
              ref={myRefs.current[index]}
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

        <div className={styles.controls}>
          <nav className={styles.slider_nav}>
            <button onClick={() => PrevSlide()}>
              <LeftArrow className={"color_svg"} />
            </button>
            <button onClick={() => NextSlide()}>
              <RightArrow className={"color_svg"} />
            </button>
            <style global jsx>{`
              .color_svg path {
                fill: ${text_color};
              }
            `}</style>
          </nav>
          <div className={styles.status}>
            <span>{currentSlide + 1}</span>/<span>{ImageSet.length}</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};
