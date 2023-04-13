import { useState } from "react";
import Link from "next/link";
import styles from "./Nav.module.scss";

const EssentialTextNav = ({ page, count, latest, tags }) => {
  // State
  const [logoHover, setLogoHover] = useState(false);

  return (
    <>
      <nav className={`${styles.navigation} ${styles.essential_text_nav}`}>
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
              {logoHover ? "Collect HOME" : "Collect NEW YORK"}
            </Link>
          </div>
        </div>
        <div className={styles.top_right}>
          <div>
            {latest ? <span className={styles.latest}>Latest</span> : null}
            <Link href="/archive" className={styles.count_link}>
              ARCHIVE ({count ? count : 0})
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default EssentialTextNav;
