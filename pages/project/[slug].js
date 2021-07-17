import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import MyLayout from "../../layouts/MyLayout";
import { RichText } from "prismic-reactjs";
import { DateTime } from "luxon";
import { getAllArchivesWithSlug, getArchiveItem } from "../../lib/api";
import { SITE_NAME } from "../../lib/constants";
import styles from "../../styles/Work.module.scss";

export async function getStaticProps({ params, preview = false, previewData }) {
  const response = await getArchiveItem(params.slug, previewData);

  return { props: { response, revalidate: 60 } };
}

export async function getStaticPaths() {
  const posts = await getAllArchivesWithSlug();

  const paths = posts.map((post) => ({
    params: {
      slug: post.node._meta.uid,
    },
  }));

  // console.log(paths);
  return { paths, fallback: "blocking" };
}

const ArchiveItem = ({ response }) => {
  console.log("Response", response);

  const page_data = response.archive_item;

  console.log("Page Data", page_data.title[0].text);

  // {page_data.title}

  return (
    <MyLayout page="project">
      <div className={styles.container}>
        <Head>
          <title>
            {page_data.title ? page_data.title[0].text : "Archive Item"} _{" "}
            {SITE_NAME}
          </title>
          <meta
            name="description"
            content={
              page_data.description ? page_data.description[0].text : null
            }
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Link href="/">Close</Link>
          <h1>{page_data.title[0].text}</h1>
          {page_data.description ? (
            <RichText render={page_data.description} />
          ) : null}

          <div className="tags">
            {page_data.tags.map((item, key) => (
              <span key={key}>{item.tag.tag_name[0].text}</span>
            ))}
          </div>

          <span>
            {DateTime.fromISO(page_data.creation_date).toFormat("yyyy")}
          </span>
        </main>
      </div>
    </MyLayout>
  );
};

export default ArchiveItem;
