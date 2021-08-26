import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import MemoryContext from "./MemoryContext";
import styles from "../styles/Nav.module.scss";

const SiteNav = ({ page, count }) => {
  const { itemsPage, currentTag } = useContext(MemoryContext);
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
          itemsPage && currentTag
            ? `/?tag=${currentTag}&page=${itemsPage}`
            : itemsPage
            ? `/?page=${itemsPage}`
            : "/?page=1";
        break;
      default:
        nav_link = "/profile";
    }

    setNavLink(nav_link);
  }, [page]);

  return (
    <nav className={styles.navigation}>
      <Link href={navLink}>
        <a className={styles.link_box}>
          <span>
            {page === "profile" ? "COLLECT New York City" : "COLLECT Archive"}
          </span>
          <div className={styles.info}>
            {/*<span className={styles.latest}>Latest</span>*/}
            <span>({count ? count : 0})</span>
          </div>
        </a>
      </Link>
    </nav>
  );
};

export default SiteNav;
