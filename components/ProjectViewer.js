import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "../styles/ProjectViewer.module.scss";

const ProjectViewer = ({ images, prevItem, nextItem, current }) => {
  console.log("IMAGES", images);

  return (
    <div className={styles.project_viewer}>
      <ul className={styles.image_array}>
        {images[0].image
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

                {image.image ? (
                  <Image
                    src={image.image.url}
                    alt={image.image.alt}
                    height={image.image.dimensions.height}
                    width={image.image.dimensions.width}
                    layout={"responsive"}
                  />
                ) : image.video ? (
                  <video controls>
                    <source src={image.video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
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
