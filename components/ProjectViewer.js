import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "../styles/ProjectViewer.module.scss";

const ProjectViewer = ({ images, prevItem, nextItem, current }) => {
  // console.log("IMAGES", images);

  return (
    <div className={styles.project_viewer}>
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
                    src={image.image.url}
                    alt={image.image.alt}
                    height={image.image.dimensions.height}
                    width={image.image.dimensions.width}
                    layout={"responsive"}
                  />
                ) : null}
              </li>
            ))
          : null}
      </ul>
      <div className={styles.holder}></div>
    </div>
  );
};

export default ProjectViewer;
