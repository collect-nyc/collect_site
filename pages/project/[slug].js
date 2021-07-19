import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import MyLayout from "../../layouts/MyLayout";
import ProjectViewer from "../../components/ProjectViewer";
import { RichText } from "prismic-reactjs";
import { DateTime } from "luxon";
import { getAllArchivesWithSlug, getArchiveItem } from "../../lib/api";
import { SITE_NAME } from "../../lib/constants";
import styles from "../../styles/Project.module.scss";

export async function getStaticProps({ params, preview = false, previewData }) {
  const response = await getArchiveItem(params.slug, previewData);

  const page = "project";
  return { props: { response, page, revalidate: 60 } };
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

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {page_data.title ? page_data.title[0].text : "Archive Item"} _{" "}
          {SITE_NAME}
        </title>
        <meta
          name="description"
          content={page_data.description ? page_data.description[0].text : null}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ProjectViewer images={page_data.images} embeds={page_data.embeds} />
      </main>

      <footer className={styles.project_footer}>
        <div className={styles.close_col}>
          <Link href="/">
            <a className={styles.close_btn}>Close</a>
          </Link>
        </div>

        <h1 className={styles.title}>{page_data.title[0].text}</h1>

        {page_data.description ? (
          <RichText render={page_data.description} />
        ) : null}

        <div className={styles.tags}>
          {page_data.tags.map((item, key) => (
            <span key={key}>
              {page_data.tags.length === key + 1
                ? item.tag.tag_name[0].text
                : item.tag.tag_name[0].text + ", "}
            </span>
          ))}
        </div>

        <span className={styles.date}>
          {DateTime.fromISO(page_data.creation_date).toFormat("yyyy")}
        </span>
        <div className={styles.expand_col}></div>
      </footer>
    </div>
  );
};

ArchiveItem.Layout = MyLayout;
export default ArchiveItem;
