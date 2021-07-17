import { useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Nav.module.scss";

const SiteNav = ({ page, count, nonav }) => {
  let nav_link;
  switch (page) {
    case "index":
      nav_link = "/profile";
      break;
    case "profile":
      nav_link = "/";
      break;
    case "project":
      console.log("project here");
      nav_link = "/";
      break;
    default:
      nav_link = "/profile";
  }

  useEffect(() => {
    switch (page) {
      case "index":
        nav_link = "/profile";
        break;
      case "profile":
        nav_link = "/";
        break;
      case "project":
        console.log("project here");
        nav_link = "/";
        break;
      default:
        nav_link = "/profile";
    }
  }, [page]);

  return (
    <nav className={styles.navigation}>
      <Link href={nav_link}>
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
