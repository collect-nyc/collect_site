import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import VideoPlayer from "./VideoPlayer";
import { useInView } from "react-intersection-observer";
import { is_touch_enabled } from "@/lib/helpers";
import styles from "./CardSlider.module.scss";

const CardSlider = ({ images, sliderIndex, small }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isMouseTooltipVisible, setMouseTooltipVisible] = useState(false);
  const [sliderInView, setSliderInView] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const sliderRef = useRef(null);

  const { ref, inView, entry } = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  // console.log("images", images);

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
    speed: 400,
    swipe: true,
    swipeToSlide: true,
    cssEase: "cubic-bezier(0.5, 1, 0.89, 1)",
    className: "projectslider",
    variableWidth: true,
  };

  return (
    <div
      className={
        sliderInView
          ? `${styles.images} ${styles.in_view} ${small && styles.small}`
          : `${styles.images} ${small && styles.small}`
      }
    >
      <Slider className={"projectslider"} ref={sliderRef} {...slide_settings}>
        {images?.map((d, i) =>
          d.type === "video/mp4" ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              key={i}
              onClick={() => {
                if (i === images.length - 1) {
                  sliderRef.current.slickGoTo(0);
                } else {
                  nextSlidez();
                }
              }}
            >
              <source src={d.url} type="video/mp4" />
            </video>
          ) : (
            <img
              onClick={() => {
                if (i === images.length - 1) {
                  sliderRef.current.slickGoTo(0);
                } else {
                  nextSlidez();
                }
              }}
              className={styles.item}
              src={d.url + "?auto=format"}
              key={i}
            />
          )
        )}
      </Slider>
    </div>
  );
};

export default CardSlider;
