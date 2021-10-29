import { useEffect, useState, useContext, useRef } from "react";
import Link from "next/link";
import styles from "../styles/Nav.module.scss";
import { useRouter } from "next/router";

const EssentialTextNav = ({ page, count, latest, tags }) => {
  const router = useRouter();

  // State
  const [filterOpen, setFilterOpen] = useState(false);
  const [logoHover, setLogoHover] = useState(false);

  return (
    <>
      <nav className={`${styles.navigation} ${styles.essential_text_nav}`}>
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
                {logoHover ? "COLLECT Profile" : "COLLECT New York City"}
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.top_right}>
          <div>
            {latest ? <span className={styles.latest}>Latest</span> : null}
            <Link href="/archive">
              <a>({count ? count : 0})</a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default EssentialTextNav;
