import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import MemoryContext from "../MemoryContext";
import styles from "./Nav.module.scss";

const ProfileNav = ({ page, count, latest, tags, globalContent }) => {
  const { currentTag } = useContext(MemoryContext);

  // State
  const [logoHover, setLogoHover] = useState(false);

  // display new item from array every 1.5 second looping
  const [currentItem, setCurrentItem] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (globalContent && globalContent.services) {
        setCurrentItem((currentItem + 1) % globalContent.services.length);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [currentItem, globalContent]);

  return (
    <>
      <nav className={`${styles.navigation} ${styles.profile}`}>
        <div className={styles.top_left}>
          <div className={styles.link_box}>
            <Link
              onMouseEnter={() => {
                setLogoHover(true);
              }}
              onMouseLeave={() => {
                setLogoHover(false);
              }}
              href={"/"}
            >
              {logoHover ? "Return to SELECTED WORK" : "Collect NEW YORK"}
            </Link>
          </div>
        </div>
        <div className={`${styles.top_right} ${styles.profile_right}`}>
          <span className={styles.archive}>
            {globalContent && globalContent.services_descriptor
              ? globalContent.services_descriptor
              : "Independent agency for NEW IDEAS in"}{" "}
            {globalContent && globalContent.services
              ? globalContent && globalContent.services[currentItem].service
              : "Design"}
          </span>
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
        </div>
      </nav>
    </>
  );
};

export default ProfileNav;
