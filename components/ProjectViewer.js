import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "../styles/ProjectViewer.module.scss";

const ProjectViewer = ({ images, embeds }) => {
  console.log("ProjectViewer", images, embeds);
  const [items, setItems] = useState(null);

  useEffect(() => {
    let combined = null;

    if (images[0].image && embeds[0].embed) {
      console.log("Both images and embeds");
    } else if (images[0].image) {
      console.log("Only images");
    } else if (embeds[0].embed) {
      console.log("Only embeds");
    } else {
      console.log("Only embeds");
    }

    combined = images;

    setItems(combined);
  }, [images, embeds]);

  return <div className={styles.project_viewer}></div>;
};

export default ProjectViewer;
