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
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import styles from "../styles/Index.module.scss";

export async function getServerSideProps({ query }) {
  const paginate = query.page || 1;
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
  const pageSize = 75;

  const allItems = [];
  let pageNum = 1;
  let lastResult = [];

  // Pull Items Data Based On Params
  if (tagged) {
    // Tagged items
    archives = await Client().query(
      [
        Prismic.Predicates.at("document.type", "archive_item"),
        Prismic.Predicates.at("document.tags", [tagged]),
      ],
      { pageSize: pageSize, page: paginate }
    );
  } else {
    // All Work items
    // archives = await Client().query(
    //   Prismic.Predicates.at("document.type", "archive_item"),
    //   { pageSize: pageSize, page: paginate }
    // );

    // Loop through pages of results and add those results to a storage array
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
      paginate,
      tagged,
      query,
    },
  };
}

const Home = ({ archives, document, everything, paginate, tagged, query }) => {
  // console.log("QUERY", query);
  console.log("ALL ITEMS", archives);
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
    scrollPos,
    setScrollPos,
    itemsPage,
    setItemsPage,
  } = useContext(MemoryContext);

  const mainRef = useRef(null);

  // data
  const page_content = document.data;
  const tags = everything.tags;

  // State
  const [filterOpen, setFilterOpen] = useState(false);

  // ComponentDidMount
  useEffect(() => {
    // console.log("SCROLL POS", scrollPos);

    if (scrollPos) {
      mainRef.current.scrollTop = parseInt(scrollPos, 10);
    }
  }, []);

  // Make sure any time paginate is updated, it's also updated in state
  useEffect(() => {
    setItemsPage(paginate);
  }, [paginate]);

  // Set archive list when archive data changes
  useEffect(() => {
    let loaded_archives = archives;

    // console.log("ARCHIVES UPDATED", loaded_archives);
    setArchiveList(loaded_archives);
  }, [archives, setArchiveList]);

  const ScrollTracker = () => {
    // console.log(mainRef.current.scrollTop);
    setScrollPos(mainRef.current.scrollTop);
  };

  console.log("DATA", page_content, "ARCHIVES", archiveList);

  // Pull archive items by tag
  const GetByTag = (name) => {
    setCurrentTag(name);
    setFilterOpen(false);

    router.push(`/?tag=${name}&page=1`);

    mainRef.current.scrollTo(0, 0);
  };

  const AllTags = () => {
    // const default_list = loaded_archives;
    // setArchiveList(default_list);
    setCurrentTag("All Work");
    router.push("/?page=1");
    setFilterOpen(false);
  };

  const ToggleFilters = () => {
    setFilterOpen(!filterOpen);
  };

  // Switch from List to Grid view
  const SwapView = () => {
    setLayoutView(!layoutView);
    // setGridView(!gridView);
  };

  // Sort by title alphabetically
  const AlphabetSort = () => {
    if (azSort === "az") {
      const list = _.orderBy(
        archiveList,
        [
          function (o) {
            return o.data.title[0].text;
          },
        ],
        ["desc"]
      );

      setArchiveList(list);
      setAzSort("za");
    } else if (azSort === "za" || !azSort) {
      const list = _.orderBy(
        archiveList,
        [
          function (o) {
            return o.data.title[0].text;
          },
        ],
        ["asc"]
      );

      setArchiveList(list);
      setAzSort("az");
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
      setTimeSort("new");
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
      setTimeSort("old");
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
      setTimeSort("new");
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

  // Handle Pagination Clicks
  const PaginationHandler = (page) => {
    const newpage = page.selected + 1;

    // console.log("Pagination Handler", page, newpage, tagged);

    setItemsPage(newpage);

    if (tagged && tagged !== "All Work") {
      setCurrentTag(tagged);
      router.push(`/?tag=${tagged}&page=${newpage}`);
    } else {
      router.push(`/?page=${newpage}`);
    }

    mainRef.current.scrollTo(0, 0);
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

      <nav className={styles.filter_bar}>
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

        <span
          className={
            filterOpen
              ? `${styles.controls} ${styles.controls_open}`
              : styles.controls
          }
        >
          <button onClick={() => SwapView()}>
            {layoutView ? "Grid" : "List"}
          </button>
          <button onClick={() => AlphabetSort()}>
            {!azSort || azSort === "az" ? "A-Z" : "Z-A"}
          </button>
          <button onClick={() => TimeSort()}>
            {!timeSort
              ? "New, Old"
              : timeSort === "new"
              ? "New, Old"
              : timeSort === "old"
              ? "Old, New"
              : null}
          </button>
        </span>
      </nav>

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

        <div
          className={
            archives.total_pages > 1
              ? `${styles.show} ${styles.pagination}`
              : styles.pagination
          }
        >
          <ReactPaginate
            disableInitialCallback={true}
            previousLabel={"back"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            activeClassName={styles.active}
            containerClassName={styles.pagination_list}
            subContainerClassName={styles.pages}
            initialPage={parseInt(paginate - 1, 10)}
            forcePage={itemsPage - 1}
            pageCount={archives.total_pages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={PaginationHandler}
          />
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
