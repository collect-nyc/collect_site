import { useState, useContext } from "react";
import Link from "next/link";
import MemoryContext from "./MemoryContext";
import styles from "./Nav.module.scss";
import Carot from "../svg/carot.svg";
import { useRouter } from "next/router";
import axios from "axios";

const GetCount = ({ tag }) => {
  const [count, setCount] = useState(0);

  axios
    .get("/api/get-tag-count", {
      params: {
        name: tag,
      },
    })
    .then(function (response) {
      // console.log("Response", tag, response.data);

      setCount(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });

  return <span>({count})</span>;
};

const ArchiveItemNav = ({
  page,
  count,
  latest,
  tags,
  case_study,
  project_title,
}) => {
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
    pageHistory,
  } = useContext(MemoryContext);

  // State
  const [filterOpen, setFilterOpen] = useState(false);

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
      <nav className={`${styles.navigation} ${styles.archive_item}`}>
        <div className={styles.top_left}>
          <div className={`${styles.link_box} ${styles.archive}`}>
            {pageHistory === "/" ? (
              <Link href={"/"}>
                <a>Back to Home</a>
              </Link>
            ) : (
              <Link
                href={
                  currentTag && currentTag !== "All Work"
                    ? `/archive?tag=${currentTag}`
                    : "/archive"
                }
              >
                <a>Back to Archive</a>
              </Link>
            )}
          </div>
          {case_study ? (
            <div className={styles.title}>
              <span>
                {project_title
                  ? project_title
                  : "Direction, Development, Imagery and Design"}
              </span>
            </div>
          ) : null}
        </div>
        <div className={`${styles.top_right} ${styles.archive_right}`}>
          {latest ? <span className={styles.latest}>Latest</span> : null}
          <Link
            href={
              currentTag && currentTag !== "All Work"
                ? `/archive?tag=${currentTag}`
                : "/archive"
            }
          >
            <a className={styles.count_link}>ARCHIVE ({count ? count : 0})</a>
          </Link>
        </div>
        <div className={styles.filter_container}>
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
                &nbsp;&nbsp;
              </li>
            )}

            {tags && tags.length > 0
              ? tags.map((tag, key) =>
                  tag === currentTag ? null : (
                    <li key={key}>
                      <button index={tag.id} onClick={() => GetByTag(tag)}>
                        {tag} <GetCount tag={tag} />
                      </button>
                      &nbsp;&nbsp;
                    </li>
                  )
                )
              : null}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default ArchiveItemNav;
