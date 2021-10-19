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
import RightArrow from "../svg/right-arrow.svg";
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
  const document = await Client().getSingle("landing_page");

  const page = "index";

  return {
    props: {
      document,
      page,
      everything,
    },
  };
}

const Home = ({ document }) => {
  console.log("Landing Data", document.data);

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

  // ComponentDidMount
  useEffect(() => {
    // console.log("SCROLL POS", scrollPos);
  }, []);

  const ScrollTracker = () => {
    // console.log(mainRef.current.scrollTop);
    setScrollPos(mainRef.current.scrollTop);
  };

  const pageContent = document.data.body.map((slice, index) => {
    // Render the right markup for the given slice type

    // 2up Images
    if (slice.slice_type === "2up_images") {
      return (
        <section className={styles.double_image} key={index}>
          <p>hello</p>
        </section>
      );

      // Featured Items Slice
    } else if (slice.slice_type === "featured_items") {
      const featuredContent = slice.items.map((featuredItem, featuredIndex) => (
        <div key={featuredIndex}>
          <img src={featuredItem.image.url} alt={featuredItem.image.alt} />
          {RichText.render(featuredItem.title, linkResolver)}
          {RichText.render(featuredItem.summary, linkResolver)}
        </div>
      ));
      return (
        <div className="featured-items" key={index}>
          {featuredContent}
        </div>
      );

      // Text Slice
    } else if (slice.slice_type === "text") {
      return (
        <div className="text" key={index}>
          {RichText.render(slice.primary.rich_text, linkResolver)}
        </div>
      );

      // Return null by default
    } else {
      return null;
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>COLLECT NYC</title>
        <meta
          name="description"
          content="COLLECT NYC is a full-spectrum interdisciplinary creative practice centered in direction and development."
        />
        <SharedHead />
      </Head>

      <main className={`${styles.main} ${styles.grid}`}>{pageContent}</main>
    </div>
  );
};

Home.Layout = MyLayout;
export default Home;
