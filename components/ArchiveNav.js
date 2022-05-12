import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import MemoryContext from "./MemoryContext";
import styles from "../styles/Nav.module.scss";
import { useRouter } from "next/router";

const ArchiveNav = ({ page, count, latest, tags }) => {
  const router = useRouter();
  const {
    layoutView,
    setLayoutView,
    azSort,
    setAzSort,
    timeSort,
    setTimeSort,
    currentTag,
    setCurrentTag,
  } = useContext(MemoryContext);

  // State
  const [logoHover, setLogoHover] = useState(false);

  return (
    <>
      <nav className={`${styles.navigation} ${styles.archive_loader}`}>
        <div className={styles.top_left}>
          <div className={`${styles.link_box} ${styles.archive}`}>
            <Link href={"/"}>
              <a>Return to SELECTED WORK</a>
            </Link>
          </div>
        </div>
        <div className={`${styles.top_right} ${styles.archive_right}`}></div>
      </nav>
    </>
  );
};

export default ArchiveNav;
