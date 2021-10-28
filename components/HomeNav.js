import { useEffect, useState, useContext, useRef } from "react";
import Link from "next/link";
import MemoryContext from "./MemoryContext";
import styles from "../styles/Nav.module.scss";
import Carot from "../svg/carot.svg";
import { useRouter } from "next/router";

const HomeNav = ({ page, count, latest, tags }) => {
  const router = useRouter();
  // const {
  //   layoutView,
  //   setLayoutView,
  //   azSort,
  //   setAzSort,
  //   timeSort,
  //   setTimeSort,
  //   currentTag,
  //   setCurrentTag,
  //   archiveList,
  //   setArchiveList,
  //   returnPage,
  //   setReturnPage,
  // } = useContext(MemoryContext);

  // State
  const [filterOpen, setFilterOpen] = useState(false);
  const [logoHover, setLogoHover] = useState(false);

  return (
    <>
      <nav className={`${styles.navigation} ${styles.home}`}>
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
          <Link href="/archive">
            <a className={styles.archive}>COLLECT Archive</a>
          </Link>
          <div>
            {latest ? <span className={styles.latest}>Latest</span> : null}
            <Link href="/archive">
              <a>({count ? count : 0})</a>
            </Link>
          </div>
        </div>
      </nav>
      {/* <nav className={styles.mobile_navigation}>
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
      </nav> */}
    </>
  );
};

export default HomeNav;
