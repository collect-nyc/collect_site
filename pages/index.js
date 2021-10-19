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
        <section
          key={index}
          className={
            slice.primary.left_side_gutters && slice.primary.left_side_gutters
              ? `${styles.double_image} ${styles.left_gutters} ${styles.right_gutters}`
              : slice.primary.left_side_gutters &&
                !slice.primary.right_side_gutters
              ? `${styles.double_image} ${styles.left_gutters}`
              : slice.primary.right_side_gutters &&
                !slice.primary.left_side_gutters
              ? `${styles.double_image} ${styles.right_gutters}`
              : `${styles.double_image}`
          }
        >
          <div className={styles.left_side}>
            {slice.primary.first_image.url ? (
              <Image
                src={slice.primary.first_image.url}
                layout={"responsive"}
                height={slice.primary.first_image.dimensions.height}
                width={slice.primary.first_image.dimensions.width}
                alt={slice.primary.first_image.alt}
              />
            ) : null}
          </div>
          <div className={styles.right_side}>
            {slice.primary.second_image.url ? (
              <Image
                src={slice.primary.second_image.url}
                layout={"responsive"}
                height={slice.primary.second_image.dimensions.height}
                width={slice.primary.second_image.dimensions.width}
                alt={slice.primary.second_image.alt}
              />
            ) : null}
          </div>
        </section>
      );

      // Featured Items Slice
    } else if (slice.slice_type === "single_image") {
      return (
        <section key={index}>
          <p>sup</p>
        </section>
      );
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

      <main className={styles.main}>
        <div className={styles.divider} />
        {pageContent}
      </main>
    </div>
  );
};

Home.Layout = MyLayout;
export default Home;
