import React, { useEffect, useState } from "react";
import Image from "next/image";
import Hammer from "react-hammerjs";
// import { motion } from "framer-motion";
import styles from "../styles/ProjectViewer.module.scss";

const ProjectViewer = ({ images, prevItem, nextItem, current }) => {
  // console.log("IMAGES", images);

  const HandleSwipe = (swipe) => {
    // console.log("swipe", swipe.direction);
    if (images.length > 1) {
      const dir = swipe.direction;

      if (dir === 4) {
        prevItem();
      } else if (dir === 2) {
        nextItem();
      }
    }
  };

  const HandleTap = () => {
    nextItem();
  };

  return (
    <div className={styles.project_viewer}>
      <Hammer onSwipe={(swipe) => HandleSwipe(swipe)} onTap={() => HandleTap()}>
        <ul className={styles.image_array}>
          {images[0].image || images[0].video
            ? images.map((image, key) => (
                <li
                  key={key}
                  index={key}
                  className={key === current ? styles.current : styles.hidden}
                >
                  {images.length > 1 ? (
                    <React.Fragment>
                      <button
                        onClick={() => prevItem()}
                        className={styles.prev_btn}
                      />
                      <button
                        onClick={() => nextItem()}
                        className={styles.next_btn}
                      />
                    </React.Fragment>
                  ) : null}

                  {image.video.url ? (
                    <video loop autoPlay muted>
                      <source src={image.video.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : image.image.url ? (
                    <Image
                      priority
                      src={image.image.url}
                      alt={image.image.alt}
                      height={image.image.dimensions.height}
                      width={image.image.dimensions.width}
                      placeholder={"empty"}
                      blurDataURL={image.image.url}
                      layout={"responsive"}
                    />
                  ) : null}
                </li>
              ))
            : null}
        </ul>
      </Hammer>
      <div className={styles.holder}></div>
    </div>
  );
};

export default ProjectViewer;
