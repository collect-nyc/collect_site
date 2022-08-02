import { useState, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import Cursor from "./Cursor";
import { useInView } from "react-intersection-observer";
// import { motion } from "framer-motion";
import styles from "../styles/FeaturedSlider.module.scss";

const FeaturedSlider = ({ images, refs, index }) => {
  // console.log(images);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isMouseTooltipVisible, setMouseTooltipVisible] = useState(false);
  const [sliderInView, setSliderInView] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.5,
    triggerOnce: true,
  });

  const is_touch_enabled = () => {
    try {
      let prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

      let mq = function (query) {
        return window.matchMedia(query).matches;
      };

      if (
        "ontouchstart" in window ||
        (typeof window.DocumentTouch !== "undefined" &&
          document instanceof window.DocumentTouch)
      ) {
        return true;
      }

      return mq(
        ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("")
      );
    } catch (e) {
      console.error("(Touch detect failed)", e);
      return false;
    }
  };

  useEffect(() => {
    setIsTouch(is_touch_enabled());
  }, []);

  useEffect(() => {
    if (inView) {
      console.log("Its in View", inView);
      setSliderInView(true);
    }
  }, [inView]);

  const nextSlidez = (index) => {
    if (refs[index]) {
      refs[index].current.slickNext();
    }
  };

  const previousSlidez = (index) => {
    if (refs[index]) {
      refs[index].current.slickPrev();
    }
  };

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next + 1),
  };

  return (
    <div
      className={
        sliderInView && isTouch
          ? `${styles.slider_container} ${styles.in_view}`
          : styles.slider_container
      }
      onClick={() => nextSlidez(index)}
      onMouseEnter={() => setMouseTooltipVisible(true)}
      onMouseLeave={() => setMouseTooltipVisible(false)}
      ref={ref}
    >
      <Slider {...settings} ref={refs[index]}>
        {images.map((image, i) => {
          if (
            Object.keys(image.image).length === 0 &&
            Object.keys(image.video).length > 0 &&
            image.video.url
          ) {
            return (
              <div className={styles.video_container} key={i}>
                <video playsInline loop autoPlay muted>
                  <source src={image.video.url} type="video/mp4" />
                </video>
              </div>
            );
          } else if (Object.keys(image.image).length > 0 && image.image.url) {
            return (
              <div className={styles.image_container} key={i}>
                <Image
                  src={image.image.url}
                  layout={"responsive"}
                  height={image.image.dimensions.height}
                  width={image.image.dimensions.width}
                  alt={image.image.alt}
                  priority
                  quality={100}
                />
              </div>
            );
          } else {
            return false;
          }
        })}
      </Slider>
      <button
        className={`${styles.slide_control} ${styles.prev}`}
        onClick={() => previousSlidez(index)}
      />
      <button
        className={`${styles.slide_control} ${styles.next}`}
        onClick={() => nextSlidez(index)}
      />
      <Cursor visible={isMouseTooltipVisible} offsetX={15} offsetY={10}>
        <span>
          {currentSlide}/{images.length}
        </span>
      </Cursor>
    </div>
  );
};

export default FeaturedSlider;
