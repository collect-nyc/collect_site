import { useEffect, useContext, useRef, useState } from "react";
import Head from "next/head";
import Prismic from "prismic-javascript";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import Masonry from "react-masonry-css";
import _ from "lodash";
import SharedHead from "../../components/SharedHead";
import MyLayout from "../../layouts/MyLayout";
import { Client } from "../../lib/prismic-config";
import RightArrow from "../../svg/right-arrow.svg";
import MemoryContext from "../../components/MemoryContext";
import styles from "../../styles/ArchiveIndex.module.scss";

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

  // Loop through all pages of results and build one big array
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

  const page = "archive_index";

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
    archiveList,
    setArchiveList,
    layoutView,
    setLayoutView,
    azSort,
    setAzSort,
    timeSort,
    setTimeSort,
    currentTag,
    setCurrentTag,
    scrollPos,
    setScrollPos,
    returnPage,
    setReturnPage,
  } = useContext(MemoryContext);

  const initialAzSort = useRef(true);
  const initialTimeSort = useRef(true);
  const TitleHolder = useRef();

  const [titleHeight, setTitleHeight] = useState(null);

  // data
  const page_content = document.data;
  // const loadedArchives = [...archives];

  const handleResize = () => {
    setTitleHeight(TitleHolder.current.offsetHeight);
  };

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
      window.scrollBy(0, parseInt(scrollPos, 10));
      setScrollPos(0);
    }

    // console.log(TitleHolder.current.offsetHeight);
    setTitleHeight(TitleHolder.current.offsetHeight);
    // console.log(titleHeight);

    // Check to see if Index Art has changed size
    window.addEventListener("resize", handleResize, false);

    return () => {
      window.removeEventListener("resize", handleResize, false);
    };
  }, []);

  // Checking on memory version of archive list
  // useEffect(() => {
  //   console.log("Memory", archiveList.length);
  // }, [archiveList]);

  // Set archive list when archive data changes
  useEffect(() => {
    // console.log("Archives: ", archives.length);
    if (
      archiveList === undefined ||
      archiveList.length === 0 ||
      archives.length !== archiveList.length
    ) {
      ShuffeList(archives);
      setReturnPage(false);
    } else if (returnPage) {
      setArchiveList(archiveList);
      setReturnPage(false);
    } else {
      ShuffeList(archiveList);
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
    window.scrollBy(0, 0);
  }, [currentTag]);

  const ScrollTracker = () => {
    let top =
      (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
    // console.log("Scroll Pos", top);
    setScrollPos(top);
  };

  // Sort by title alphabetically
  const AlphabetSort = () => {
    if (azSort === "az") {
      // console.log("pre archive: ", archiveList);
      const list = _.orderBy(
        archiveList,
        [
          function (o) {
            return o.data.title[0].text;
          },
        ],
        ["desc"]
      );
      // console.log("ALPHA SORT: ", list);

      setArchiveList(list);
    } else if (azSort === "za" || !azSort) {
      // console.log("pre archive: ", archiveList);
      const list = _.orderBy(
        archiveList,
        [
          function (o) {
            return o.data.title[0].text;
          },
        ],
        ["asc"]
      );
      // console.log("ALPHA SORT: ", list);

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

  const ModifyTags = (list) => {
    // console.log("The Tag", tagged);
    let MyTags = list;

    if (tagged) {
      // console.log("Original List", MyTags);
      let TagIndex = MyTags.indexOf(tagged);
      // console.log("Position in array", MyTags.indexOf(tagged));
      MyTags.splice(TagIndex, 1);
      // console.log("Modified List", MyTags);
      MyTags.unshift(tagged);
      // console.log("Final List", MyTags);

      return MyTags.map((tag, key) => (
        <span key={key}>
          {MyTags.length === key + 1 && tag ? tag : tag ? tag + ", " : null}
        </span>
      ));
    } else {
      return MyTags.map((tag, key) => (
        <span key={key}>
          {MyTags.length === key + 1 && tag ? tag : tag ? tag + ", " : null}
        </span>
      ));
    }
  };

  // List View JSX
  const ListView = () => {
    // console.log("LIST", archiveList)

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
                      {archive.data?.title[0]?.text ? (
                        <span>{archive.data.title[0].text}</span>
                      ) : null}
                    </span>

                    <span className={styles.tags}>
                      {ModifyTags(archive.tags)}
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
                  <Link href={"/archive/item/" + archive.uid}>
                    <a onClick={() => ScrollTracker()}>
                      <span className={styles.name}>
                        {archive.data?.title[0]?.text ? (
                          <span>{archive.data.title[0].text}</span>
                        ) : null}
                      </span>

                      <span className={styles.tags}>
                        {ModifyTags(archive.tags)}
                      </span>

                      <span className={styles.date}>
                        <span>
                          {archive.data.creation_date
                            ? DateTime.fromISO(
                                archive.data.creation_date
                              ).toFormat("yyyy")
                            : "TBD"}
                        </span>
                        <span className={styles.view_project}>
                          View Project <RightArrow />
                        </span>
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
                        quality={75}
                        priority
                      />
                    ) : archive.data.images[0].image.url ? (
                      <Image
                        className={styles.lazyloaded}
                        alt={archive.data.images[0].image.alt}
                        src={archive.data.images[0].image.url}
                        height={archive.data.images[0].image.dimensions.height}
                        width={archive.data.images[0].image.dimensions.width}
                        quality={75}
                        priority
                      />
                    ) : null}
                  </a>
                ) : (
                  <Link href={"/archive/item/" + archive.uid}>
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
                          quality={75}
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
                          quality={75}
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
    <div className={styles.container}>
      <Head>
        <title>COLLECT Archive</title>
        <meta
          name="description"
          content="COLLECT Archive is an evolving space for sharing work, information, resources, and open-source tools of all kinds."
        />
        <SharedHead />
      </Head>
      <div className={styles.title_holder} ref={TitleHolder}>
        <div className={styles.title}>
          {page_content && page_content.header_image ? (
            <Image
              src={page_content.header_image.url}
              alt={page_content.header_image.alt}
              layout={"responsive"}
              height={page_content.header_image.dimensions.height}
              width={page_content.header_image.dimensions.width}
              unoptimized={true}
              quality={100}
            />
          ) : null}
        </div>
      </div>
      <main
        className={layoutView ? `${styles.main} ${styles.grid}` : styles.main}
        style={titleHeight ? { paddingTop: titleHeight } : null}
      >
        <div className={styles.interior}>
          {layoutView ? <GridView /> : <ListView />}
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.copyright}>
          ©{new Date().getFullYear()} Collect NYC, All Rights Reserved
        </div>
        <div className={styles.links}>
          <Link href="/info/privacy">Privacy</Link>
          <Link href="/info/impressum">Impressum</Link>
        </div>
      </footer>
    </div>
  );
};

Home.Layout = MyLayout;
export default Home;
