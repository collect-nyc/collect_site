import React, { useEffect, useState } from "react";
import Image from "next/image";
import Hammer from "react-hammerjs";
// import { motion } from "framer-motion";
import styles from "../styles/ProjectViewer.module.scss";

const ProjectViewer = ({
  images,
  PrevItem,
  NextItem,
  currentImage,
  previousImage,
  nextImage,
}) => {
  // console.log("IMAGES", images);

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

  return (
    <div
      className={styles.project_viewer}
      // style={
      //   appHeight
      //     ? {
      //         "--app-height": appHeight,
      //       }
      //     : null
      // }
    >
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
                  <div className={styles.prev_container}>
                    {images.length > 1 ? (
                      <React.Fragment>
                        <button
                          onClick={() => PrevItem()}
                          className={styles.prev_btn}
                          style={imgStyle(images[previousImage].image.url)}
                        />
                      </React.Fragment>
                    ) : null}
                  </div>
                  <Hammer onSwipe={(swipe) => HandleSwipe(swipe)}>
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
                          onClick={images.length > 1 ? () => NextItem() : null}
                          // height={image.image.dimensions.height}
                          // width={image.image.dimensions.width}
                          className={images.length > 1 ? styles.multi : null}
                        />
                      </div>
                    ) : null}
                  </Hammer>

                  <div className={styles.next_container}>
                    {images.length > 1 ? (
                      <button
                        onClick={() => NextItem()}
                        className={styles.next_btn}
                        style={imgStyle(images[nextImage].image.url)}
                      />
                    ) : null}
                  </div>
                </div>
              </li>
            ))
          : null}
      </ul>

      <div className={styles.holder}></div>
    </div>
  );
};

export default ProjectViewer;
