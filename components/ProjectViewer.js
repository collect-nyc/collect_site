import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import Hammer from "react-hammerjs";
// import { motion } from "framer-motion";
import styles from "./ProjectViewer.module.scss";

const ProjectViewer = ({
  images,
  PrevItem,
  NextItem,
  currentImage,
  previousImage,
  nextImage,
}) => {
  console.log("IMAGES", images);

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

  const GetNextImage = (current) => {
    let next = current + 1;
    if (next >= images.length) {
      next = 0;
    }

    if (images[next].image && images[next].image.url) {
      return {
        backgroundImage: `url(${images[next].image.url})`,
      };
    } else {
      return {
        backgroundImage: `url(https://place-hold.it/1000)`,
      };
    }
  };

  const GetPreviousImage = (current) => {
    let prev = current - 1;
    if (prev < 0) {
      prev = images.length - 1;
    }

    if (images[prev].image && images[prev].image.url) {
      return {
        backgroundImage: `url(${images[prev].image.url})`,
      };
    } else {
      return {
        backgroundImage: `url(https://place-hold.it/1000)`,
      };
    }
  };

  return (
    <div className={styles.project_viewer}>
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
                          style={GetPreviousImage(key)}
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
                      <div
                        className={`${styles.inner_bounds} ${
                          images.length > 1 ? styles.multiple : null
                        }`}
                      >
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
                        style={GetNextImage(key)}
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
