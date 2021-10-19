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

  const [navLink, setNavLink] = useState("/profile");

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
      <nav className={styles.navigation}>
        <div className={styles.top_left}>
          <div className={styles.link_box}>
            <Link href={navLink}>
              <a>COLLECT New York City</a>
            </Link>
          </div>
        </div>
        <div className={styles.top_right}>
          <span>COLLECT Archive</span>
          <div>
            {latest ? <span className={styles.latest}>Latest</span> : null}
            <span>({count ? count : 0})</span>
          </div>
        </div>
      </nav>
      <nav className={styles.mobile_navigation}>
        <div className={styles.mobile_left}>
          {" "}
          {tags ? (
            <div className={styles.filter_button}>
              <span className={styles.label}>
                <button
                  className={filterOpen ? styles.open : styles.closed}
                  onClick={() => ToggleFilters()}
                >
                  {currentTag} <Carot />
                </button>
              </span>
              <ul
                className={
                  filterOpen
                    ? `${styles.tag_list} ${styles.tag_list_open}`
                    : styles.tag_list
                }
              >
                {currentTag === "All Work" ? null : (
                  <li>
                    <button onClick={() => AllTags()}>All Work</button>
                  </li>
                )}

                {tags && tags.length > 0
                  ? tags.map((tag, key) =>
                      tag === currentTag ? null : (
                        <li key={key}>
                          <button index={tag.id} onClick={() => GetByTag(tag)}>
                            {tag}
                          </button>
                        </li>
                      )
                    )
                  : null}
              </ul>
            </div>
          ) : null}
        </div>
      </nav>
    </>
  );
};

export default HomeNav;
