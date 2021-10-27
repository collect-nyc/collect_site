import { useEffect, useState, useContext, useRef } from "react";
import Link from "next/link";
import MemoryContext from "./MemoryContext";
import styles from "../styles/Nav.module.scss";
import Carot from "../svg/carot.svg";
import { useRouter } from "next/router";

const HomeNav = ({ page, count, latest, tags }) => {
  const router = useRouter();
  const {
    layoutView,
    setLayoutView,
    azSort,
    setAzSort,
    timeSort,
    setTimeSort,
    currentTag,
    setCurrentTag,
    archiveList,
    setArchiveList,
    returnPage,
    setReturnPage,
  } = useContext(MemoryContext);

  // State
  const [filterOpen, setFilterOpen] = useState(false);

  const [navLink, setNavLink] = useState("/");

  const ToggleFilters = () => {
    setFilterOpen(!filterOpen);
  };

  const GetByTag = (name) => {
    setCurrentTag(name);
    setFilterOpen(false);
    router.push(`/?tag=${name}`);
  };

  const AllTags = () => {
    setCurrentTag("All Work");
    setFilterOpen(false);
    router.push(`/`);
  };

  return (
    <>
      <nav className={`${styles.navigation} ${styles.profile}`}>
        <div className={styles.top_left}>
          <div className={styles.link_box}>
            <Link href={navLink}>
              <a>COLLECT New York City</a>
            </Link>
          </div>
        </div>
        <div className={`${styles.top_right} ${styles.profile_right}`}>
          <div className={styles.contact}>CONTACT</div>
          {/* <Link href="/archive">
            <a className={styles.archive}>COLLECT Archive</a>
          </Link> */}
          <div>
            {latest ? <span className={styles.latest}>Latest</span> : null}
            <span>({count ? count : 0})</span>
          </div>
        </div>
      </nav>
      {/* <nav className={styles.mobile_navigation}>
        <div className={styles.profile}>
          <button>Info</button>
          <button>Contact</button>
        </div>
      </nav> */}
    </>
  );
};

export default HomeNav;
