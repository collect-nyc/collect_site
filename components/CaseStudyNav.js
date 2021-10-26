import { useEffect, useState, useContext, useRef } from "react";
import Link from "next/link";
import MemoryContext from "./MemoryContext";
import styles from "../styles/Nav.module.scss";
import { useRouter } from "next/router";
import animateScrollTo from "animated-scroll-to";

const HomeNav = ({ page, count, latest, tags }) => {
  const router = useRouter();
  const { navTextColor } = useContext(MemoryContext);

  // State
  // const [filterOpen, setFilterOpen] = useState(false);

  return (
    <nav
      className={`${styles.navigation} ${styles.casestudy}`}
      style={navTextColor ? { color: navTextColor } : null}
    >
      <div className={styles.top_left}>
        <div className={styles.link_box}>
          <Link href={"/archive"}>
            <a>COLLECT New York City</a>
          </Link>
        </div>
      </div>
      <div className={styles.top_right}>
        <button>Archive View</button>
        <button
          onClick={() => {
            animateScrollTo(document.querySelector("#itemFooter"), {
              elementToScroll: window.document.querySelector("body"),
              easing: (t) => {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
              },
              maxDuration: 1500,
              minDuration: 800,
              speed: 1000,
              verticalOffset: -100,
            });
          }}
        >
          Project Info
        </button>
      </div>
    </nav>
  );
};

export default HomeNav;
