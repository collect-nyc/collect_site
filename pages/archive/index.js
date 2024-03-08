import { useEffect, useContext, useRef, useState } from "react";
import Head from "next/head";
import Prismic from "prismic-javascript";
import { DateTime } from "luxon";
import Image from "next/legacy/image";
import Link from "next/link";
import Masonry from "react-masonry-css";
import _ from "lodash";
import { useRouter } from "next/router";
import SharedHead from "../../components/SharedHead";
import { Client } from "../../lib/prismic-config";
import RightArrow from "../../svg/right-arrow.svg";
import MemoryContext from "../../components/MemoryContext";
import { isEqual } from "../../lib/helpers";
import ArchiveLoader from "../../components/ArchiveLoader";
import ArchiveLoaderMobile from "../../components/ArchiveLoaderMobile";
import Marquee from "react-fast-marquee";
import { SITE_NAME } from "../../lib/constants";
import styles from "./ArchiveIndex.module.scss";

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

  const document = await Client().getSingle("home_page");

  const archive_page = await Client().getSingle("index_page");

  const loader = await Client().getSingle("archive_loader");

  // Loop through all pages of results and build one big array
  // let archives;
  // const pageSize = 100;

  // const allItems = [];
  // let pageNum = 1;
  // let lastResult = [];

  // Pull Items Data Based On Params
  // if (tagged) {
  //   // if there is a Tag
  //   do {
  //     const resp = await Client().query(
  //       [
  //         Prismic.Predicates.at("document.type", "archive_item"),
  //         Prismic.Predicates.at("document.tags", [tagged]),
  //       ],
  //       { pageSize: pageSize, page: pageNum }
  //     );

  //     lastResult = resp;

  //     allItems.push(...resp.results);

  //     pageNum++;
  //     // console.log("Page Num", pageNum);
  //   } while (lastResult.next_page !== null);
  // } else {
  //   // Get all items
  //   do {
  //     const resp = await Client().query(
  //       Prismic.Predicates.at("document.type", "archive_item"),
  //       { pageSize: pageSize, page: pageNum }
  //     );

  //     lastResult = resp;

  //     allItems.push(...resp.results);

  //     pageNum++;
  //     // console.log("Page Num", pageNum);
  //   } while (lastResult.next_page !== null);
  // }

  // archives = allItems;

  const page = "archive_index";

  return {
    props: {
      document,
      archive_page,
      loader,
      page,
      everything,
      tagged,
    },
  };
}

const Home = ({ document, tagged, loader, archive_page }) => {
  // console.log("Pure Archive from Data", archives);
  // console.log("Page Data", document);
  // console.log("Archive Page", archive_page);

  const router = useRouter();

  const { meta_title, meta_description, meta_image } = archive_page.data;

  const {
    archiveList,
    setArchiveList,
    layoutView,
    azSort,
    timeSort,
    currentTag,
    setCurrentTag,
    // scrollPos,
    // setScrollPos,
    // setHomeScrollPos,
    setRunCSFade,
    setCsColor,
  } = useContext(MemoryContext);

  // console.log("First Load", archiveList);

  // List View JSX
  // const ListView = () => {
  //   // console.log("LIST", archiveList)

  //   return (
  //     <section className={styles.all_archives}>
  //       <ul>
  //         {archiveList && archiveList.length > 0 ? (
  //           archiveList.map((archive, key) => (
  //             <li key={key}>
  //               {archive.data.coming_soon ? (
  //                 <div className={styles.coming_soon}>
  //                   <span className={styles.coming_text}>Coming Soon</span>
  //                   <span className={styles.name}>
  //                     {archive.data?.title[0]?.text ? (
  //                       <span>{archive.data.title[0].text}</span>
  //                     ) : null}
  //                   </span>

  //                   <span className={styles.tags}>
  //                     {ModifyTags(archive.tags)}
  //                   </span>

  //                   <span className={styles.date}>
  //                     {archive.data.creation_date
  //                       ? DateTime.fromISO(archive.data.creation_date).toFormat(
  //                           "yyyy"
  //                         )
  //                       : "TBD"}
  //                   </span>

  //                   <span className={styles.thumbnail}>
  //                     {archive.data.index_thumbnail?.url ? (
  //                       <Image
  //                         className={styles.lazyloaded}
  //                         alt={archive.data.index_thumbnail.alt}
  //                         src={archive.data.index_thumbnail.url}
  //                         height={
  //                           archive.data.index_thumbnail.dimensions.height
  //                         }
  //                         width={archive.data.index_thumbnail.dimensions.width}
  //                         quality={75}
  //                         priority
  //                       />
  //                     ) : archive.data.images[0].image.url ? (
  //                       <Image
  //                         className={styles.lazyloaded}
  //                         alt={archive.data.images[0].image.alt}
  //                         src={archive.data.images[0].image.url}
  //                         height={
  //                           archive.data.images[0].image.dimensions.height
  //                         }
  //                         width={archive.data.images[0].image.dimensions.width}
  //                         quality={75}
  //                         priority
  //                       />
  //                     ) : null}
  //                   </span>

  //                   <span className={styles.view_project}>
  //                     View Project <RightArrow />
  //                   </span>
  //                 </div>
  //               ) : archive.data.item_type === "Case Study" &&
  //                 archive.data.background_color ? (
  //                 <a
  //                   onClick={() => {
  //                     ScrollTracker();
  //                     EnterCaseStudy(
  //                       archive.data.background_color,
  //                       "/archive/item/" + archive.uid
  //                     );
  //                   }}
  //                 >
  //                   <span className={styles.name}>
  //                     {archive.data?.title[0]?.text ? (
  //                       <span>{archive.data.title[0].text}</span>
  //                     ) : null}
  //                   </span>

  //                   <span className={styles.tags}>
  //                     {ModifyTags(archive.tags)}
  //                   </span>

  //                   <span className={styles.date}>
  //                     <span>
  //                       {archive.data.creation_date
  //                         ? DateTime.fromISO(
  //                             archive.data.creation_date
  //                           ).toFormat("yyyy")
  //                         : "TBD"}
  //                     </span>
  //                   </span>

  //                   <span className={styles.thumbnail}>
  //                     {archive.data.index_thumbnail?.url ? (
  //                       <Image
  //                         className={styles.lazyloaded}
  //                         alt={archive.data.index_thumbnail.alt}
  //                         src={archive.data.index_thumbnail.url}
  //                         height={
  //                           archive.data.index_thumbnail.dimensions.height
  //                         }
  //                         width={archive.data.index_thumbnail.dimensions.width}
  //                         quality={75}
  //                         priority
  //                       />
  //                     ) : archive.data.images[0].image.url ? (
  //                       <Image
  //                         className={styles.lazyloaded}
  //                         alt={archive.data.images[0].image.alt}
  //                         src={archive.data.images[0].image.url}
  //                         height={
  //                           archive.data.images[0].image.dimensions.height
  //                         }
  //                         width={archive.data.images[0].image.dimensions.width}
  //                         quality={75}
  //                         priority
  //                       />
  //                     ) : null}
  //                   </span>

  //                   <span className={styles.view_project}>
  //                     View Project <RightArrow />
  //                   </span>
  //                 </a>
  //               ) : (
  //                 <Link
  //                   onClick={() => ScrollTracker()}
  //                   href={"/archive/item/" + archive.uid}
  //                 >
  //                   <>
  //                     <span className={styles.name}>
  //                       {archive.data?.title[0]?.text ? (
  //                         <span>{archive.data.title[0].text}</span>
  //                       ) : null}
  //                     </span>

  //                     <span className={styles.tags}>
  //                       {ModifyTags(archive.tags)}
  //                     </span>

  //                     <span className={styles.date}>
  //                       <span>
  //                         {archive.data.creation_date
  //                           ? DateTime.fromISO(
  //                               archive.data.creation_date
  //                             ).toFormat("yyyy")
  //                           : "TBD"}
  //                       </span>
  //                     </span>

  //                     <span className={styles.thumbnail}>
  //                       {archive.data.index_thumbnail?.url ? (
  //                         <Image
  //                           className={styles.lazyloaded}
  //                           alt={archive.data.index_thumbnail.alt}
  //                           src={archive.data.index_thumbnail.url}
  //                           height={
  //                             archive.data.index_thumbnail.dimensions.height
  //                           }
  //                           width={
  //                             archive.data.index_thumbnail.dimensions.width
  //                           }
  //                           quality={75}
  //                           priority
  //                         />
  //                       ) : archive.data.images[0].image.url ? (
  //                         <Image
  //                           className={styles.lazyloaded}
  //                           alt={archive.data.images[0].image.alt}
  //                           src={archive.data.images[0].image.url}
  //                           height={
  //                             archive.data.images[0].image.dimensions.height
  //                           }
  //                           width={
  //                             archive.data.images[0].image.dimensions.width
  //                           }
  //                           quality={75}
  //                           priority
  //                         />
  //                       ) : null}
  //                     </span>

  //                     <span className={styles.view_project}>
  //                       View Project <RightArrow />
  //                     </span>
  //                   </>
  //                 </Link>
  //               )}
  //             </li>
  //           ))
  //         ) : (
  //           <li className={styles.no_items}>
  //             No &ldquo;{currentTag}&rdquo; items found.
  //           </li>
  //         )}
  //       </ul>
  //     </section>
  //   );
  // };

  // // Grid View JSX
  // const GridView = () => {
  //   // console.log("GRID", archiveList);

  //   const breakpointColumnsObj = {
  //     default: 3,
  //     900: 2,
  //   };

  //   return (
  //     <section className={styles.all_archives_grid}>
  //       <Masonry
  //         breakpointCols={breakpointColumnsObj}
  //         className="my-masonry-grid"
  //         columnClassName="my-masonry-grid_column"
  //       >
  //         {archiveList && archiveList.length > 0 ? (
  //           archiveList.map((archive, key) => (
  //             <article key={key} className={styles.grid_item}>
  //               {archive.data.coming_soon ? (
  //                 <a className={`${styles.thumbnail} ${styles.coming_soon}`}>
  //                   {archive.data.index_thumbnail?.url ? (
  //                     <Image
  //                       className={styles.lazyloaded}
  //                       alt={archive.data.index_thumbnail.alt}
  //                       src={archive.data.index_thumbnail.url}
  //                       height={archive.data.index_thumbnail.dimensions.height}
  //                       width={archive.data.index_thumbnail.dimensions.width}
  //                       quality={75}
  //                       priority
  //                     />
  //                   ) : archive.data.images[0].image.url ? (
  //                     <Image
  //                       className={styles.lazyloaded}
  //                       alt={archive.data.images[0].image.alt}
  //                       src={archive.data.images[0].image.url}
  //                       height={archive.data.images[0].image.dimensions.height}
  //                       width={archive.data.images[0].image.dimensions.width}
  //                       quality={75}
  //                       priority
  //                     />
  //                   ) : null}
  //                 </a>
  //               ) : archive.data.item_type === "Case Study" &&
  //                 archive.data.background_color ? (
  //                 <a
  //                   className={styles.thumbnail}
  //                   onClick={() => {
  //                     ScrollTracker();
  //                     EnterCaseStudy(
  //                       archive.data.background_color,
  //                       "/archive/item/" + archive.uid
  //                     );
  //                   }}
  //                 >
  //                   {archive.data.index_thumbnail?.url ? (
  //                     <Image
  //                       className={styles.lazyloaded}
  //                       alt={archive.data.index_thumbnail.alt}
  //                       src={archive.data.index_thumbnail.url}
  //                       height={archive.data.index_thumbnail.dimensions.height}
  //                       width={archive.data.index_thumbnail.dimensions.width}
  //                       quality={75}
  //                     />
  //                   ) : archive.data.images[0].image.url ? (
  //                     <Image
  //                       className={styles.lazyloaded}
  //                       alt={archive.data.images[0].image.alt}
  //                       src={archive.data.images[0].image.url}
  //                       height={archive.data.images[0].image.dimensions.height}
  //                       width={archive.data.images[0].image.dimensions.width}
  //                       quality={75}
  //                     />
  //                   ) : null}
  //                 </a>
  //               ) : (
  //                 <Link
  //                   className={styles.thumbnail}
  //                   onClick={() => ScrollTracker()}
  //                   href={"/archive/item/" + archive.uid}
  //                 >
  //                   {archive.data.index_thumbnail?.url ? (
  //                     <Image
  //                       className={styles.lazyloaded}
  //                       alt={archive.data.index_thumbnail.alt}
  //                       src={archive.data.index_thumbnail.url}
  //                       height={archive.data.index_thumbnail.dimensions.height}
  //                       width={archive.data.index_thumbnail.dimensions.width}
  //                       quality={75}
  //                     />
  //                   ) : archive.data.images[0].image.url ? (
  //                     <Image
  //                       className={styles.lazyloaded}
  //                       alt={archive.data.images[0].image.alt}
  //                       src={archive.data.images[0].image.url}
  //                       height={archive.data.images[0].image.dimensions.height}
  //                       width={archive.data.images[0].image.dimensions.width}
  //                       quality={75}
  //                     />
  //                   ) : null}
  //                 </Link>
  //               )}
  //             </article>
  //           ))
  //         ) : (
  //           <li className={styles.no_items}>
  //             No &ldquo;{currentTag}&rdquo; items found.
  //           </li>
  //         )}
  //       </Masonry>
  //     </section>
  //   );
  // };

  return (
    <div className={styles.container}>
      <Head>
        <title>{meta_title ? meta_title : `${SITE_NAME}`}</title>
        <meta
          name="description"
          content={
            meta_description
              ? meta_description
              : "Independent agency for NEW IDEAS in direction, design, technology and development."
          }
        />

        <meta
          property="og:title"
          content={meta_title ? meta_title : `${SITE_NAME}`}
        />
        <meta
          property="og:description"
          content={
            meta_description
              ? meta_description
              : "Independent agency for NEW IDEAS in direction, design, technology and development."
          }
        />
        <meta
          property="og:image"
          content={
            meta_image?.url
              ? meta_image.url
              : "https://collect.nyc/images/collect-new-york-og.jpg"
          }
        />

        <SharedHead />
      </Head>

      <ArchiveLoader data={loader.data} />
      <ArchiveLoaderMobile data={loader.data} />

      <div className={styles.marquee_section}>
        <Marquee gradient={false} speed={90}>
          {document.data.ticker[0].text}&nbsp; &nbsp; &nbsp; ... &nbsp; &nbsp;
          &nbsp;
        </Marquee>
      </div>

      {/*
      <div ref={TitleHolder} className={styles.archive_header}>
        <p>
          A continuously updated look at our output and interests, from
          observational photography and design études, to printed matter,
          one-of-ones and more.
        </p>
      </div>
      <main
        className={layoutView ? `${styles.main} ${styles.grid}` : styles.main}
        style={
          titleHeight
            ? {
                paddingTop: titleHeight,
              }
            : null
        }
      >
        <div className={styles.interior}>
          {layoutView ? <GridView /> : <ListView />}
        </div>
        <Footer />
      </main> */}
    </div>
  );
};

export default Home;
