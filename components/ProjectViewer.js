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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "25%",
    centerMode: true,
    dotsClass: `${styles.slick_dots}` + " slick-dots",
    beforeChange: (current, next) => {
      setActiveSlide(next);
      setActiveCaption(data.cultureItems[next].fields.caption);
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
    <div
      className={styles.project_viewer}
      style={
        appHeight
          ? {
              "--app-height": appHeight,
            }
          : null
      }
    >
      {/*<Hammer onSwipe={(swipe) => HandleSwipe(swipe)}>
        <ul className={styles.image_array}>
          {images[0].image || images[0].video
            ? images.map((image, key) => (
                <li
                  key={key}
                  index={key}
                  className={
                    key === currentImage ? styles.current : styles.hidden
                  }
                >
                  <div
                    className={
                      image.video
                        ? `${styles.image_container} ${styles.image_container_video}`
                        : styles.image_container
                    }
                    onClick={images.length > 1 ? () => HandleTap() : null}
                  >
                    {images.length > 1 ? (
                      <React.Fragment>
                        <button
                          onClick={() => PrevItem()}
                          className={styles.prev_btn}
                        />
                        <button
                          onClick={() => NextItem()}
                          className={styles.next_btn}
                        />
                      </React.Fragment>
                    ) : null}
                    {image.video ? (
                      <video loop autoPlay muted>
                        <source src={image.video.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : image.image.url ? (
                      <div className={styles.inner_bounds}>
                        <Image
                          priority
                          src={image.image.url}
                          alt={image.image.alt}
                          blurDataURL={image.image.url}
                          layout={"fill"}
                          objectFit={"contain"}
                          // height={image.image.dimensions.height}
                          // width={image.image.dimensions.width}
                          className={images.length > 1 ? styles.multi : null}
                        />
                      </div>
                    ) : null}
                  </div>
                </li>
              ))
            : null}
        </ul>
                    </Hammer>*/}
      {/*images[0].image || images[0].video ? (
        <Slider ref={slider} {...slide_settings}>
          {Object.keys(images).map((image, key) => (
            <div
              key={key}
              index={parseInt(key, 10) + 1}
              className={`${styles.culture_item} ` + " culture-item"}
            >
              <figure style={imgStyle(image.image.url)} />
            </div>
          ))}
        </Slider>
          ) : null*/}

      <div className={styles.holder}></div>
    </div>
  );
};

export default ProjectViewer;
