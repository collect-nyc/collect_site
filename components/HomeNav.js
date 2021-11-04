import { useState, useContext } from "react";
import Link from "next/link";
import MemoryContext from "./MemoryContext";
import styles from "../styles/Nav.module.scss";
import { useRouter } from "next/router";

const HomeNav = ({ page, count, latest, tags }) => {
  const { currentTag } = useContext(MemoryContext);

  // State
  const [navHover, setNavHover] = useState(false);

  return (
    <nav className={`${styles.navigation} ${styles.home}`}>
      <div className={styles.top_left}>
        <div className={styles.link_box}>
          <Link href={"/profile"}>
            <a>COLLECT New York City</a>
          </Link>
        </div>
      </div>
      <div className={styles.top_right}>
        <Link
          href={
            currentTag && currentTag !== "All Work"
              ? `/archive?tag=${currentTag}`
              : "/archive"
          }
        >
          <a
            onMouseEnter={() => setNavHover(true)}
            onMouseLeave={() => setNavHover(false)}
            className={styles.archive}
            style={navHover ? { textDecoration: "underline" } : null}
          >
            COLLECT Archive
          </a>
        </Link>
        <div>
          {latest ? <span className={styles.latest}>Latest</span> : null}
          <Link
            href={
              currentTag && currentTag !== "All Work"
                ? `/archive?tag=${currentTag}`
                : "/archive"
            }
          >
            <a
              onMouseEnter={() => setNavHover(true)}
              onMouseLeave={() => setNavHover(false)}
              style={navHover ? { textDecoration: "underline" } : null}
              className={styles.count_link}
            >
              ({count ? count : 0})
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;
