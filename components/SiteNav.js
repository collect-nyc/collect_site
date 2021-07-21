import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Nav.module.scss";

const SiteNav = ({ page, count, nonav }) => {
  const [navLink, setNavLink] = useState("/profile");

  switch (page) {
    case "index":
      setNavLink("/profile");
      break;
    case "profile":
      setNavLink("/");
      break;
    case "project":
      console.log("project here");
      setNavLink("/");
      break;
    default:
      setNavLink("/profile");
  }

  useEffect(() => {
    switch (page) {
      case "index":
        setNavLink("/profile");
        break;
      case "profile":
        setNavLink("/");
        break;
      case "project":
        console.log("project here");
        setNavLink("/");
        break;
      default:
        setNavLink("/profile");
    }
  }, [page]);

  return (
    <nav className={styles.navigation}>
      <Link href={navLink}>
        <a className={styles.link_box}>
          <span>
            {page === "profile" ? "COLLECT New York City" : "COLLECT Archive"}
          </span>
          <div className={styles.info}>
            <span className={styles.latest}>Latest</span>
            <span>({count ? count : 0})</span>
          </div>
        </a>
      </Link>
    </nav>
  );
};

export default SiteNav;
