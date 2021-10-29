import { useState, useEffect, useContext, useRef } from "react";
import Head from "next/head";
import SharedHead from "../components/SharedHead";
import MyLayout from "../layouts/MyLayout";
import { Client } from "../lib/prismic-config";
import Image from "next/image";
import Link from "next/link";
import _ from "lodash";
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

  const { setScrollPos, setReturnPage } = useContext(MemoryContext);

  useEffect(() => {
    // Reset scroll position for Archive Index
    setScrollPos(0);
    setReturnPage(false);
  }, []);

  const pageContent = document.data.body.map((slice, index) => {
    // Render the right markup for the given slice type

    // 2up Images Slice
    if (slice.slice_type === "2up_images") {
      return (
        <section
          key={index}
          className={
            slice.primary.vertical_padding === "Default"
              ? `${styles.double_image} ${styles.default}`
              : slice.primary.vertical_padding === "Half"
              ? `${styles.double_image} ${styles.half}`
              : slice.primary.vertical_padding === "Extra"
              ? `${styles.double_image} ${styles.extra}`
              : `${styles.double_image}`
          }
        >
          <div
            className={
              slice.primary.left_side_gutters
                ? `${styles.left_side} ${styles.gutters}`
                : `${styles.left_side}`
            }
          >
            {slice.primary.first_image.url ? (
              slice.primary.archive_link && slice.primary.archive_link.slug ? (
                <Link href={"/archive/item/" + slice.primary.archive_link.slug}>
                  <a>
                    <Image
                      src={slice.primary.first_image.url}
                      layout={"responsive"}
                      height={slice.primary.first_image.dimensions.height}
                      width={slice.primary.first_image.dimensions.width}
                      alt={slice.primary.first_image.alt}
                      priority
                    />
                  </a>
                </Link>
              ) : (
                <Image
                  src={slice.primary.first_image.url}
                  layout={"responsive"}
                  height={slice.primary.first_image.dimensions.height}
                  width={slice.primary.first_image.dimensions.width}
                  alt={slice.primary.first_image.alt}
                  priority
                />
              )
            ) : null}
          </div>
          <div
            className={
              slice.primary.right_side_gutters
                ? `${styles.right_side} ${styles.gutters}`
                : `${styles.right_side}`
            }
          >
            {slice.primary.second_image.url ? (
              slice.primary.archive_link && slice.primary.archive_link.slug ? (
                <Link href={"/archive/item/" + slice.primary.archive_link.slug}>
                  <a>
                    <Image
                      src={slice.primary.second_image.url}
                      layout={"responsive"}
                      height={slice.primary.second_image.dimensions.height}
                      width={slice.primary.second_image.dimensions.width}
                      alt={slice.primary.second_image.alt}
                      priority
                    />
                  </a>
                </Link>
              ) : (
                <Image
                  src={slice.primary.second_image.url}
                  layout={"responsive"}
                  height={slice.primary.second_image.dimensions.height}
                  width={slice.primary.second_image.dimensions.width}
                  alt={slice.primary.second_image.alt}
                  priority
                />
              )
            ) : null}
          </div>
        </section>
      );

      // Single Image Slice
    } else if (slice.slice_type === "single_image") {
      return (
        <section
          key={index}
          className={
            slice.primary.vertical_padding === "Default"
              ? `${styles.single_image} ${styles.default}`
              : slice.primary.vertical_padding === "Half"
              ? `${styles.single_image} ${styles.half}`
              : slice.primary.vertical_padding === "Extra"
              ? `${styles.single_image} ${styles.extra}`
              : `${styles.single_image}`
          }
        >
          {slice.primary.image.url ? (
            <figure
              className={
                slice.primary.full_bleed ? `${styles.full_bleed}` : null
              }
            >
              {slice.primary.archive_link && slice.primary.archive_link.slug ? (
                <Link href={"/archive/item/" + slice.primary.archive_link.slug}>
                  <a>
                    <Image
                      src={slice.primary.image.url}
                      layout={"responsive"}
                      height={slice.primary.image.dimensions.height}
                      width={slice.primary.image.dimensions.width}
                      alt={slice.primary.image.alt}
                      priority
                    />
                  </a>
                </Link>
              ) : (
                <Image
                  src={slice.primary.image.url}
                  layout={"responsive"}
                  height={slice.primary.image.dimensions.height}
                  width={slice.primary.image.dimensions.width}
                  alt={slice.primary.image.alt}
                  priority
                />
              )}
            </figure>
          ) : null}
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
