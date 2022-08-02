import { useState, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import Cursor from "./Cursor";
import { useInView } from "react-intersection-observer";
import { is_touch_enabled } from "../lib/helpers";
import styles from "../styles/FeaturedSlider.module.scss";

const FeaturedSlider = ({ images, refs, index }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isMouseTooltipVisible, setMouseTooltipVisible] = useState(false);
  const [sliderInView, setSliderInView] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const { ref, inView, entry } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

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
        sliderInView && isTouch && index === 0
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
