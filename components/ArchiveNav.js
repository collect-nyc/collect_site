import { useState, useContext } from "react";
import Link from "next/link";
import MemoryContext from "./MemoryContext";
import styles from "../styles/Nav.module.scss";
import Carot from "../svg/carot.svg";
import { useRouter } from "next/router";

const ArchiveNav = ({ page, count, latest, tags, case_study }) => {
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
  } = useContext(MemoryContext);

  // State
  const [filterOpen, setFilterOpen] = useState(false);
  const [logoHover, setLogoHover] = useState(false);

  const ToggleFilters = () => {
    setFilterOpen(!filterOpen);
  };

  const GetByTag = (name) => {
    setCurrentTag(name);
    setFilterOpen(false);
    router.push(`/archive?tag=${name}`);
  };

  const AllTags = () => {
    setCurrentTag("All Work");
    setFilterOpen(false);
    router.push(`/archive`);
  };

  return (
    <>
      <nav className={`${styles.navigation} ${styles.archive}`}>
        <div className={styles.top_left}>
          <div className={`${styles.link_box} ${styles.archive}`}>
            <Link href={"/"}>
              <a
                onMouseEnter={() => {
                  setLogoHover(true);
                }}
                onMouseLeave={() => {
                  setLogoHover(false);
                }}
              >
                {logoHover ? "COLLECT Home" : "COLLECT Archive"}
              </a>
            </Link>
          </div>
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
        <div className={`${styles.top_right} ${styles.archive_right}`}>
          <div
            className={
              filterOpen
                ? ` ${styles.controls} ${styles.controls_open}`
                : styles.controls
            }
          >
            <button
              onClick={() => {
                setLayoutView(!layoutView);
              }}
            >
              {layoutView ? "GRID" : "LIST"}
            </button>
            <button
              onClick={() => {
                setAzSort(!azSort || azSort === "az" ? "za" : "az");
              }}
            >
              {!azSort
                ? "A-Z"
                : azSort === "az"
                ? "Z-A"
                : azSort === "za"
                ? "A-Z"
                : null}
            </button>
            <button
              onClick={() => {
                setTimeSort(!timeSort || timeSort === "new" ? "old" : "new");
              }}
            >
              {!timeSort
                ? "NEW, OLD"
                : timeSort === "new"
                ? "OLD, NEW"
                : timeSort === "old"
                ? "NEW, OLD"
                : null}
            </button>
          </div>
          {latest ? <span className={styles.latest}>Latest</span> : null}
          <Link href="/archive">
            <a>({count ? count : 0})</a>
          </Link>
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
        <div className={styles.mobile_right}>
          {" "}
          <div
            className={
              filterOpen
                ? ` ${styles.controls} ${styles.controls_open}`
                : styles.controls
            }
          >
            <button
              onClick={() => {
                setLayoutView(!layoutView);
              }}
            >
              {layoutView ? "GRID" : "LIST"}
            </button>
            <button
              onClick={() => {
                setAzSort(!azSort || azSort === "az" ? "za" : "az");
              }}
            >
              {!azSort
                ? "A-Z"
                : azSort === "az"
                ? "Z-A"
                : azSort === "za"
                ? "A-Z"
                : null}
            </button>
            <button
              onClick={() => {
                setTimeSort(!timeSort || timeSort === "new" ? "old" : "new");
              }}
            >
              {!timeSort
                ? "NEW, OLD"
                : timeSort === "new"
                ? "OLD, NEW"
                : timeSort === "old"
                ? "NEW, OLD"
                : null}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ArchiveNav;
