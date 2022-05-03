import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Hammer from "react-hammerjs";
// import { motion } from "framer-motion";
import Slider from "react-slick";
import styles from "../styles/ProjectViewer.module.scss";

const ProjectViewer = ({ images, PrevItem, NextItem, currentImage }) => {
  // console.log("IMAGES", images);
  const slider = useRef(null);

  const [appHeight, setAppHeight] = useState(null);
  const [totalSlides, setTotalSlides] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    // const doc = window.document.documentElement;
    // doc.style.setProperty("--app-height", `${window.innerHeight}px`);
    setAppHeight(`${window.innerHeight}px`);

    const appHeight = () => {
      // const doc = window.document.documentElement;
      setAppHeight(`${window.innerHeight}px`);
    };

    window.addEventListener("resize", appHeight);

    return () => {
      window.removeEventListener("resize", appHeight);
    };
  }, []);

  const nextImage = () => {
    if (totalSlides === activeSlide + 1) {
      slider.slickGoTo(0);
    } else {
      slider.slickNext();
    }
  };

  const previousImage = () => {
    if (activeSlide === 0) {
      slider.slickGoTo(totalSlides - 1);
    } else {
      slider.slickPrev();
    }
  };

  const HandleSwipe = (swipe) => {
    // console.log("swipe", swipe.direction);
    if (images.length > 1) {
      const dir = swipe.direction;

      if (dir === 4) {
        PrevItem();
      } else if (dir === 2) {
        NextItem();
      }
    }
  };

  const HandleTap = () => {
    NextItem();
  };

  const imgStyle = (imgSrc) => ({
    backgroundImage: `url(${imgSrc})`,
  });

  let slide_settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "8%",
    centerMode: true,
    // dotsClass: `${styles.slick_dots}` + " slick-dots",
    beforeChange: (current, next) => {
      setActiveSlide(next);
    },
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "10%",
        },
      },
    ],
  };

  return (
    <div className={styles.project_viewer}>
      {images[0].image || images[0].video ? (
        <Slider ref={slider} {...slide_settings}>
          {Object.keys(images).map((key) => (
            <div
              key={key}
              index={parseInt(key, 10) + 1}
              className={styles.image_item}
            >
              <figure style={imgStyle(images[key].image.url)} />
            </div>
          ))}
        </Slider>
      ) : null}
    </div>
  );
};

export default ProjectViewer;
