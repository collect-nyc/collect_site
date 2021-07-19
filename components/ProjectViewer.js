import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "../styles/ProjectViewer.module.scss";

const ProjectViewer = ({ images, embeds }) => {
  const [items, setItems] = useState(null);

  console.log("IMAGES", images, embeds);

  // useEffect(() => {
  //   let combined = null;

  //   if (images[0].image && embeds[0].embed) {
  //     console.log("Both images and embeds");

  //     combined = {
  //       ...images,
  //       ...embeds,
  //     };
  //   } else if (images[0].image) {
  //     console.log("Only images");
  //     combined = images;
  //   } else if (embeds[0].embed) {
  //     console.log("Only embeds");
  //     combined = embeds;
  //   }

  //   console.log("ProjectViewer", combined);

  //   setItems(combined);
  // }, [images, embeds]);

  return (
    <div className={styles.project_viewer}>
      <ul className={styles.image_array}>
        {images[0].image
          ? images.map((image, key) => (
              <li key={key}>
                {/*<Image
                  height={image.image.dimensions.height}
                  width={image.image.dimensions.width}
                  layout={"fill"}
                  src={image.image.url}
                  alt={image.image.alt}
                />*/}
                <img src={image.image.url} alt={image.image.alt} />
              </li>
            ))
          : null}
      </ul>
      <div className={styles.holder}></div>
    </div>
  );
};

export default ProjectViewer;
