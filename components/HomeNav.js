import { useState, useContext } from "react";
import Link from "next/link";
import MemoryContext from "./MemoryContext";
import styles from "../styles/Nav.module.scss";

const HomeNav = ({ page, count, latest, tags }) => {
  const { currentTag } = useContext(MemoryContext);

  const [logoHover, setLogoHover] = useState(false);

  return (
    <nav className={`${styles.navigation} ${styles.home}`}>
      <div className={styles.top_left}>
        <div className={styles.link_box}>
          <Link href={"/profile"}>
            <a
              onMouseEnter={() => {
                setLogoHover(true);
              }}
              onMouseLeave={() => {
                setLogoHover(false);
              }}
            >
              {logoHover ? "Collect STUDIO PROFILE" : "Collect NEW YORK"}
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.top_right}>
        <span className={styles.archive}>SELECTED WORKS</span>
        <div>
          {latest ? <span className={styles.latest}>Latest</span> : null}
          <Link
            href={
              currentTag && currentTag !== "All Work"
                ? `/archive?tag=${currentTag}`
                : "/archive"
            }
          >
            <a className={styles.count_link}>({count ? count : 0})</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;
