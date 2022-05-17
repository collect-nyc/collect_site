import { useState, useContext, useEffect, useMemo } from "react";
import Image from "next/image";
import Slider from "react-slick";
import Cursor from "./Cursor";
import styles from "../styles/FeaturedSlider.module.scss";

const FeaturedSlider = ({ images, refs, index }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isMouseTooltipVisible, setMouseTooltipVisible] = useState(false);

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
    <>
      <div
        className={styles.slider_container}
        onClick={() => nextSlidez(index)}
        onMouseEnter={() => setMouseTooltipVisible(true)}
        onMouseLeave={() => setMouseTooltipVisible(false)}
      >
        <Slider {...settings} ref={refs[index]}>
          {images.map((image, i) => {
            return (
              <div key={i}>
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
    </>
  );
};

export default FeaturedSlider;
