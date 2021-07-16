import { useContext } from "react";
import ClickContext from "../context/state";
import useSWR from "swr";
import Link from "next/link";
import styles from "../styles/Nav.module.scss";

const fetcher = (url) => fetch(url).then((res) => res.json());

const GetCount = () => {
  const { data, error } = useSWR("/api/get-archives", fetcher);

  return data;
};

const SiteNav = ({ page }) => {
  const [count, update] = useContext(ClickContext);

  if (!count) {
    const data = GetCount();
    console.log("FROM API", data);
    update(data);
  } else {
    console.log("FROM CONTEXT");
  }

  console.log("Original Page", page);

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

  console.log("which page?", nav_link);

  return (
    <nav className={styles.navigation}>
      <Link href={nav_link}>
        <a className={styles.link_box}>
          <span>COLLECT Archive</span>
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
