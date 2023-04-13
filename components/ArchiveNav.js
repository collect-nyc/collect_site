import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import MemoryContext from "./MemoryContext";
import styles from "./Nav.module.scss";
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
            <Link href={"/"}>Return to SELECTED WORK</Link>
          </div>
        </div>
        <div className={styles.centered_text}>
          Ongoing, 2013 to Present — Reopening FALL 2023
        </div>
        <div className={styles.archive_link}>
          {/* {latest ? <span className={styles.latest}>Latest</span> : null} */}
          <Link
            href={
              currentTag && currentTag !== "All Work"
                ? `/archive?tag=${currentTag}`
                : "/archive"
            }
            className={styles.count_link}
          >
            ARCHIVE ({count ? count : 0})
          </Link>
        </div>
      </nav>
    </>
  );
};

export default ArchiveNav;
