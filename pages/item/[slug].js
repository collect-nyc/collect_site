import React, { useEffect, useState, useContext, createRef } from "react";
import Head from "next/head";
import SharedHead from "../../components/SharedHead";
import Link from "next/link";
import { useRouter } from "next/router";
import MyLayout from "../../layouts/MyLayout";
import ProjectViewer from "../../components/ProjectViewer";
import LeftArrow from "../../svg/left-arrow.svg";
// import { RichText } from "prismic-reactjs";
import { DateTime } from "luxon";
import Prismic from "prismic-javascript";
import { Client } from "../../lib/prismic-config";
import { SITE_NAME } from "../../lib/constants";
import MemoryContext from "../../components/MemoryContext";
import styles from "../../styles/Item.module.scss";
import { divide } from "lodash";

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

  // console.log(posts);

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

  const { currentTag, setReturnPage } = useContext(MemoryContext);
  const footerRef = createRef();

  const page_data = document.data;
  console.log("Project Data", page_data);
  const images = page_data.images;
  const total = images.length;

  useEffect(() => {
    window.document.querySelector("body").classList.add("item_page");
    setReturnPage(true);

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
        currentTag && currentTag !== "All Work" ? `/?tag=${currentTag}` : "/"
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

      {/* <div className={styles.mobile_close}>
        <Link
          href={
            currentTag && currentTag !== "All Work"
              ? `/?tag=${currentTag}`
              : "/"
          }
        >
          <a className={styles.close_btn}>Close</a>
        </Link>
      </div> */}

      <main className={styles.main}>
        <div className={styles.inner}>
          <ProjectViewer
            images={images}
            PrevItem={PrevItem}
            NextItem={NextItem}
            currentImage={currentImage}
          />
          <div className={styles.archive}>
            <Link href="/">
              <a>
                <LeftArrow /> Archive
              </a>
            </Link>
          </div>
          <div className={styles.info}>
            {total > 1 ? (
              <span className={styles.current_image}>
                {currentImage + 1}/{total}
              </span>
            ) : null}
            <a
              onClick={() => {
                footerRef.current.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Info
            </a>
          </div>
        </div>
        <div ref={footerRef}></div>

        <footer
          className={
            images.length > 1
              ? `${styles.project_footer} ${styles.multi_item}`
              : `${styles.project_footer} ${styles.single_item}`
          }
        >
          <div className={styles.title_and_description}>
            <h1 className={styles.title}>
              {page_data.title[0] ? page_data.title[0].text : "COLLECT Project"}
            </h1>

            <div className={styles.description}>
              {page_data.description[0] ? page_data.description[0].text : null}
            </div>
          </div>

          <div className={styles.credits_and_download}>
            <div className={styles.credits}>
              {page_data.body1[0]
                ? page_data.body1[0].items.map((credit, index) => (
                    <div className={styles.credit}>
                      <p key={index}>{credit.title_or_category[0].text}</p>
                      {/* loop through name under this title or category */}
                      {credit.names.map((name, index) =>
                        name.spans.length > 0 ? (
                          <a
                            href={name.spans[0].data.url}
                            className={styles.name}
                          >
                            {" "}
                            {name.text}
                          </a>
                        ) : (
                          <p className={styles.name}>{name.text}</p>
                        )
                      )}
                    </div>
                  ))
                : null}
            </div>
            <div className={styles.download}>Download Project Images</div>
          </div>
        </footer>
      </main>
    </div>
  );
};

ArchiveItem.Layout = MyLayout;
export default ArchiveItem;
