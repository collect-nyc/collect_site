import React, { useEffect, useState, useContext } from "react";
import Head from "next/head";
import SharedHead from "../../components/SharedHead";
import Link from "next/link";
import { useRouter } from "next/router";
import MyLayout from "../../layouts/MyLayout";
import ProjectViewer from "../../components/ProjectViewer";
// import { RichText } from "prismic-reactjs";
import { DateTime } from "luxon";
import Prismic from "prismic-javascript";
import { Client } from "../../lib/prismic-config";
import { SITE_NAME } from "../../lib/constants";
import MemoryContext from "../../components/MemoryContext";
import styles from "../../styles/Item.module.scss";

export async function getStaticProps({ params, preview = false, previewData }) {
  const document = await Client().getByUID("archive_item", params.slug);

  const page = "project";
  return { props: { document, page, revalidate: 60 } };
}

export async function getStaticPaths() {
  const archives = await Client().query(
    Prismic.Predicates.at("document.type", "archive_item"),
    { pageSize: 100 }
  );

  const posts = archives.results;

  console.log(posts);

  const paths = posts.map((post) => ({
    params: {
      slug: post.uid,
    },
  }));

  // console.log(paths);
  return { paths, fallback: "blocking" };
}

const ArchiveItem = ({ document }) => {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);

  const { itemsPage, currentTag } = useContext(MemoryContext);

  const page_data = document.data;
  // console.log("Project Data", page_data);
  const images = page_data.images;
  const total = images.length;

  useEffect(() => {
    window.document.querySelector("body").classList.add("item_page");

    return () => {
      window.document.querySelector("body").classList.remove("item_page");
    };
  }, []);

  const NextItem = () => {
    let newcurrent = currentImage + 1 >= total ? 0 : currentImage + 1;
    setCurrentImage(newcurrent);
  };

  const PrevItem = () => {
    let newcurrent = currentImage === 0 ? total - 1 : currentImage - 1;
    setCurrentImage(newcurrent);
  };

  // Use Effect for Keyboard Controls
  useEffect(() => {
    const NextItem = () => {
      let newcurrent = currentImage + 1 >= total ? 0 : currentImage + 1;
      setCurrentImage(newcurrent);
    };

    const PrevItem = () => {
      let newcurrent = currentImage === 0 ? total - 1 : currentImage - 1;
      setCurrentImage(newcurrent);
    };

    const Exit = () => {
      router.push(
        itemsPage && currentTag && currentTag !== "All Work"
          ? `/?tag=${currentTag}&page=${itemsPage}`
          : itemsPage
          ? `/?page=${itemsPage}`
          : "/?page=1"
      );
    };

    const handleDown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          // Left pressed
          PrevItem();
          break;
        case "ArrowRight":
          // Right pressed
          NextItem();
          break;
        case "Escape":
          // Down pressed
          Exit();
          break;
      }
    };

    window.addEventListener("keydown", handleDown);

    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keydown", handleDown);
    };
  }, [currentImage]);

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {page_data.title[0].text
            ? page_data.title[0].text
            : "COLLECT Project"}{" "}
          _ {SITE_NAME}
        </title>
        <meta
          name="description"
          content={
            page_data.description.length > 0
              ? page_data.description[0].text
              : "An archive item by COLLECT NYC."
          }
        />
        <SharedHead />
      </Head>

      <div className={styles.mobile_close}>
        <Link
          href={
            itemsPage && currentTag && currentTag !== "All Work"
              ? `/?tag=${currentTag}&page=${itemsPage}`
              : itemsPage
              ? `/?page=${itemsPage}`
              : "/?page=1"
          }
        >
          <a className={styles.close_btn}>Close</a>
        </Link>
      </div>

      <main className={styles.main}>
        <ProjectViewer
          images={images}
          PrevItem={PrevItem}
          NextItem={NextItem}
          currentImage={currentImage}
        />
      </main>

      <footer
        className={
          images.length > 1
            ? `${styles.project_footer} ${styles.multi_item}`
            : `${styles.project_footer} ${styles.single_item}`
        }
      >
        <div className={styles.close_col}>
          <Link
            href={
              itemsPage && currentTag && currentTag !== "All Work"
                ? `/?tag=${currentTag}&page=${itemsPage}`
                : itemsPage
                ? `/?page=${itemsPage}`
                : "/?page=1"
            }
          >
            <a className={styles.close_btn}>Close</a>
          </Link>
        </div>

        <h1 className={styles.title}>
          {page_data.title[0] ? page_data.title[0].text : "COLLECT Project"}
        </h1>

        {/*page_data.description ? (
          <RichText render={page_data.description} />
        ) : null*/}

        <div className={styles.tags}>
          {document.tags.map((tag, key) => (
            <span key={key}>
              {document.tags.length === key + 1 && tag
                ? tag
                : tag
                ? tag + ", "
                : null}
            </span>
          ))}
        </div>

        <span className={styles.date}>
          {page_data.creation_date
            ? DateTime.fromISO(page_data.creation_date).toFormat("yyyy")
            : "TBD"}
        </span>
        <div className={styles.multi_col}>
          {total > 1 ? (
            <span>
              {currentImage + 1}/{total}
            </span>
          ) : null}
        </div>
      </footer>
    </div>
  );
};

ArchiveItem.Layout = MyLayout;
export default ArchiveItem;
