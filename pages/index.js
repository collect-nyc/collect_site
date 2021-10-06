import { useState, useEffect, useContext, useRef } from "react";
import Head from "next/head";
import SharedHead from "../components/SharedHead";
import MyLayout from "../layouts/MyLayout";
import Prismic from "prismic-javascript";
import { Client } from "../lib/prismic-config";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import Masonry from "react-masonry-css";
import _ from "lodash";
import Carot from "../svg/carot.svg";
import MemoryContext from "../components/MemoryContext";
import { useRouter } from "next/router";
import styles from "../styles/Index.module.scss";

export async function getServerSideProps({ query }) {
  const tagged = query.tag || null;

  const everything = await fetch(
    "https://collectnyc.cdn.prismic.io/api/v2"
  ).then((res) => res.json());

  // New method of pulling tags
  // const taggers = await fetch(
  //   "https://collectnyc.cdn.prismic.io/api/tags"
  // ).then((res) => res.json());

  //Page Data
  const document = await Client().getSingle("index_page");

  let archives;
  const pageSize = 100;

  const allItems = [];
  let pageNum = 1;
  let lastResult = [];

  // Pull Items Data Based On Params
  if (tagged) {
    // if there is a Tag
    do {
      const resp = await Client().query(
        [
          Prismic.Predicates.at("document.type", "archive_item"),
          Prismic.Predicates.at("document.tags", [tagged]),
        ],
        { pageSize: pageSize, page: pageNum }
      );

      lastResult = resp;

      allItems.push(...resp.results);

      pageNum++;
      // console.log("Page Num", pageNum);
    } while (lastResult.next_page !== null);
  } else {
    // Get all items
    do {
      const resp = await Client().query(
        Prismic.Predicates.at("document.type", "archive_item"),
        { pageSize: pageSize, page: pageNum }
      );

      lastResult = resp;

      allItems.push(...resp.results);

      pageNum++;
      // console.log("Page Num", pageNum);
    } while (lastResult.next_page !== null);
  }

  archives = allItems;

  const page = "index";

  return {
    props: {
      document,
      archives,
      page,
      everything,
      tagged,
    },
  };
}

const Home = ({ archives, document, tagged }) => {
  // console.log("ALL ITEMS", archives);

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
    scrollPos,
    setScrollPos,
    returnPage,
    setReturnPage,
  } = useContext(MemoryContext);

  const mainRef = useRef(null);
  const initialAzSort = useRef(true);
  const initialTimeSort = useRef(true);

  // data
  const page_content = document.data;
  const loadedArchives = [...archives];

  const ShuffeList = (list) => {
    const new_list = _.shuffle(list);
    setArchiveList(new_list);
  };

  // ComponentDidMount
  useEffect(() => {
    // console.log("SCROLL POS", scrollPos);

    if (tagged) {
      setCurrentTag(tagged);
    }

    if (scrollPos) {
      mainRef.current.scrollTop = parseInt(scrollPos, 10);
    }
  }, []);

  // Set archive list when archive data changes
  useEffect(() => {
    if (!returnPage || !archiveList) {
      let loaded_archives = loadedArchives;
      ShuffeList(loaded_archives);
    } else {
      setReturnPage(false);
    }
  }, [archives]);

  useEffect(() => {
    if (initialAzSort.current == true) {
      // dont do any sorting on first render
      initialAzSort.current = false;
    } else {
      AlphabetSort();
    }
  }, [azSort]);

  useEffect(() => {
    if (initialTimeSort.current == true) {
      // dont do any sorting on first render
      initialTimeSort.current = false;
    } else {
      TimeSort();
    }
  }, [timeSort]);

  useEffect(() => {
    mainRef.current.scrollTo(0, 0);
  }, [currentTag]);

  const ScrollTracker = () => {
    // console.log(mainRef.current.scrollTop);
    setScrollPos(mainRef.current.scrollTop);
  };

  // Sort by title alphabetically
  const AlphabetSort = () => {
    if (azSort === "az") {
      console.log("pre archive: ", archiveList);
      const list = _.orderBy(
        archiveList,
        [
          function (o) {
            return o.data.title[0].text;
          },
        ],
        ["desc"]
      );
      console.log("ALPHA SORT: ", list);

      setArchiveList(list);
    } else if (azSort === "za" || !azSort) {
      console.log("pre archive: ", archiveList);
      const list = _.orderBy(
        archiveList,
        [
          function (o) {
            return o.data.title[0].text;
          },
        ],
        ["asc"]
      );
      console.log("ALPHA SORT: ", list);

      setArchiveList(list);
    }
  };

  // Sort by creation date
  const TimeSort = () => {
    if (!timeSort) {
      const list = _.orderBy(
        archiveList,
        [
          function (o) {
            return o.data.creation_date;
          },
        ],
        ["desc"]
      );

      setArchiveList(list);
      // setTimeSort("new");
    } else if (timeSort === "new") {
      const list = _.orderBy(
        archiveList,
        [
          function (o) {
            return o.data.creation_date;
          },
        ],
        ["asc"]
      );

      setArchiveList(list);
      // setTimeSort("old");
    } else if (timeSort === "old") {
      const list = _.orderBy(
        archiveList,
        [
          function (o) {
            return o.data.creation_date;
          },
        ],
        ["desc"]
      );

      setArchiveList(list);
      // setTimeSort("new");
    }
  };

  // List View JSX
  const ListView = () => {
    // console.log("LIST", archiveList);
    return (
      <section className={styles.all_archives}>
        <ul>
          {archiveList && archiveList.length > 0 ? (
            archiveList.map((archive, key) => (
              <li key={key}>
                {archive.data.coming_soon ? (
                  <div className={styles.coming_soon}>
                    <span className={styles.coming_text}>Coming Soon</span>
                    <span className={styles.name}>
                      <span>{archive.data.title[0].text}</span>
                    </span>

                    <span className={styles.tags}>
                      {archive.tags.map((tag, key) => (
                        <span key={key}>
                          {archive.tags.length === key + 1 && tag
                            ? tag
                            : tag
                            ? tag + ", "
                            : null}
                        </span>
                      ))}
                    </span>

                    <span className={styles.date}>
                      {archive.data.creation_date
                        ? DateTime.fromISO(archive.data.creation_date).toFormat(
                            "yyyy"
                          )
                        : "TBD"}
                    </span>
                  </div>
                ) : (
                  <Link href={"/item/" + archive.uid}>
                    <a onClick={() => ScrollTracker()}>
                      <span className={styles.name}>
                        {archive.data.title[0].text}
                      </span>

                      <span className={styles.tags}>
                        {archive.tags.map((tag, key) => (
                          <span key={key}>
                            {archive.tags.length === key + 1 && tag
                              ? tag
                              : tag
                              ? tag + ", "
                              : null}
                          </span>
                        ))}
                      </span>

                      <span className={styles.date}>
                        {archive.data.creation_date
                          ? DateTime.fromISO(
                              archive.data.creation_date
                            ).toFormat("yyyy")
                          : "TBD"}
                      </span>
                    </a>
                  </Link>
                )}
              </li>
            ))
          ) : (
            <li className={styles.no_items}>
              No &ldquo;{currentTag}&rdquo; items found.
            </li>
          )}
        </ul>
      </section>
    );
  };

  // Grid View JSX
  const GridView = () => {
    // console.log("GRID", archiveList);

    const breakpointColumnsObj = {
      default: 3,
      900: 2,
    };

    return (
      <section className={styles.all_archives_grid}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {archiveList && archiveList.length > 0 ? (
            archiveList.map((archive, key) => (
              <article key={key} className={styles.grid_item}>
                {archive.data.coming_soon ? (
                  <a className={`${styles.thumbnail} ${styles.coming_soon}`}>
                    {archive.data.index_thumbnail?.url ? (
                      <Image
                        className={styles.lazyloaded}
                        alt={archive.data.index_thumbnail.alt}
                        src={archive.data.index_thumbnail.url}
                        height={archive.data.index_thumbnail.dimensions.height}
                        width={archive.data.index_thumbnail.dimensions.width}
                      />
                    ) : archive.data.images[0].image.url ? (
                      <Image
                        className={styles.lazyloaded}
                        alt={archive.data.images[0].image.alt}
                        src={archive.data.images[0].image.url}
                        height={archive.data.images[0].image.dimensions.height}
                        width={archive.data.images[0].image.dimensions.width}
                      />
                    ) : null}
                  </a>
                ) : (
                  <Link href={"/item/" + archive.uid}>
                    <a
                      className={styles.thumbnail}
                      onClick={() => ScrollTracker()}
                    >
                      {archive.data.index_thumbnail?.url ? (
                        <Image
                          className={styles.lazyloaded}
                          alt={archive.data.index_thumbnail.alt}
                          src={archive.data.index_thumbnail.url}
                          height={
                            archive.data.index_thumbnail.dimensions.height
                          }
                          width={archive.data.index_thumbnail.dimensions.width}
                        />
                      ) : archive.data.images[0].image.url ? (
                        <Image
                          className={styles.lazyloaded}
                          alt={archive.data.images[0].image.alt}
                          src={archive.data.images[0].image.url}
                          height={
                            archive.data.images[0].image.dimensions.height
                          }
                          width={archive.data.images[0].image.dimensions.width}
                        />
                      ) : null}
                    </a>
                  </Link>
                )}
              </article>
            ))
          ) : (
            <li className={styles.no_items}>
              No &ldquo;{currentTag}&rdquo; items found.
            </li>
          )}
        </Masonry>
      </section>
    );
  };

  return (
    <div className={styles.container} ref={mainRef}>
      <Head>
        <title>COLLECT NYC</title>
        <meta
          name="description"
          content="COLLECT NYC is a full-spectrum interdisciplinary creative practice centered in direction and development."
        />
        <SharedHead />
      </Head>

      {/* <nav className={styles.filter_bar}></nav> */}

      <div className={styles.title_holder}>
        <div className={styles.title}>
          {page_content && page_content.header_image ? (
            <Image
              src={page_content.header_image.url}
              alt={page_content.header_image.alt}
              layout={"responsive"}
              height={page_content.header_image.dimensions.height}
              width={page_content.header_image.dimensions.width}
              unoptimized={true}
            />
          ) : null}
        </div>
      </div>

      <main
        className={layoutView ? `${styles.main} ${styles.grid}` : styles.main}
      >
        <div className={styles.interior}>
          {layoutView ? <GridView /> : <ListView />}
        </div>
      </main>

      <footer className={styles.footer}>
        <Image
          layout="responsive"
          width={page_content.footer_graphic.dimensions.width}
          height={page_content.footer_graphic.dimensions.height}
          src={page_content.footer_graphic.url}
          alt="Collect Graphic"
        />
      </footer>
    </div>
  );
};

Home.Layout = MyLayout;
export default Home;
