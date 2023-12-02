import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import VideoPlayer from "./VideoPlayer";
import { useInView } from "react-intersection-observer";
import { is_touch_enabled } from "@/lib/helpers";
import styles from "./CardSlider.module.scss";

const CardSlider = ({ images, sliderIndex }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isMouseTooltipVisible, setMouseTooltipVisible] = useState(false);
  const [sliderInView, setSliderInView] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const sliderRef = useRef(null);

  const { ref, inView, entry } = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  useEffect(() => {
    setIsTouch(is_touch_enabled());
  }, []);

  useEffect(() => {
    if (inView) {
      // console.log("Its in View", inView);
      setSliderInView(true);
    }
  }, [inView]);

  const nextSlidez = (index) => {
    sliderRef.current.slickNext();
  };

  const previousSlidez = (index) => {
    sliderRef.current.slickPrev();
  };

  const slide_settings = {
    infinite: false,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    speed: 200,
    swipe: true,
    className: "projectslider",
    variableWidth: true,
  };

  return (
    <div
      className={
        sliderInView ? `${styles.images} ${styles.in_view}` : styles.images
      }
    >
      <Slider className={"projectslider"} ref={sliderRef} {...slide_settings}>
        {images?.map((d, i) => (
          <img
            onClick={() => nextSlidez()}
            className={styles.item}
            src={d.url + "?auto=format"}
            key={i}
          />
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;
