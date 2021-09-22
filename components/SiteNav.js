import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import MemoryContext from "./MemoryContext";
import styles from "../styles/Nav.module.scss";

const SiteNav = ({ page, count, latest }) => {
  const { currentTag } = useContext(MemoryContext);
  const [navLink, setNavLink] = useState("/profile");

  useEffect(() => {
    let nav_link;

    switch (page) {
      case "index":
        nav_link = "/profile";
        break;
      case "profile":
      case "404":
      case "project":
        nav_link =
          currentTag && currentTag !== "All Work" ? `/?tag=${currentTag}` : "/";
        break;
      default:
        nav_link = "/profile";
    }

    setNavLink(nav_link);
  }, [page, currentTag]);

  return (
    <nav className={styles.navigation}>
      <Link href={navLink}>
        <a className={styles.link_box}>
          <span>
            {page === "profile" ? "COLLECT New York City" : "COLLECT Archive"}
          </span>
          <div className={styles.info}>
            {latest ? <span className={styles.latest}>Latest</span> : null}
            <span>({count ? count : 0})</span>
          </div>
        </a>
      </Link>
    </nav>
  );
};

export default SiteNav;
