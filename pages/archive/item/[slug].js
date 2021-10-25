import React, { useEffect, useState, useContext, createRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { DateTime } from "luxon";
import { divide } from "lodash";
import Prismic from "prismic-javascript";
// import { RichText } from "prismic-reactjs";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import SharedHead from "../../../components/SharedHead";
import MyLayout from "../../../layouts/MyLayout";
import ProjectViewer from "../../../components/ProjectViewer";
import LeftArrow from "../../../svg/left-arrow.svg";
import { Client } from "../../../lib/prismic-config";
import { SITE_NAME } from "../../../lib/constants";
import MemoryContext from "../../../components/MemoryContext";
import styles from "../../../styles/Item.module.scss";
import { apolloClient } from "../../../lib/apollo-config";

// export async function getStaticProps({ params, preview = false, previewData }) {
//   const document = await Client().getByUID("archive_item", params.slug);

//   const page = "project";
//   return { props: { document, page, revalidate: 60 } };
// }
// export async function getStaticPaths() {
//   const archives = await Client().query(
//     Prismic.Predicates.at("document.type", "archive_item"),
//     { pageSize: 100 }
//   );

//   const posts = archives.results;

//   // console.log(posts);

//   const paths = posts.map((post) => ({
//     params: {
//       slug: post.uid,
//     },
//   }));

//   // console.log(paths);
//   return { paths, fallback: "blocking" };
// }

export async function getStaticProps({ params, preview = false, previewData }) {
  const uid = params.slug;
  const { loading, error, data } = await apolloClient.query({
    query: gql`
      query archive_item($uid: String!) {
        archive_item(lang: "en-us", uid: $uid) {
          _meta {
            tags
            uid
          }
          creation_date
          title
          description
          images {
            image
            video {
              _linkType
              ... on _ExternalLink {
                url
              }
              ... on _FileLink {
                url
              }
            }
          }
          password_protected
          case_study
          background_color
          text_color
          title_image
          backup_text
          supporting_image
          body1 {
            ... on Archive_itemBody1Credits {
              type

              fields {
                names
                title_or_category
              }
            }
            __typename
          }
        }
      }
    `,
    variables: {
      uid: params.slug,
    },
  });

  const document = data.archive_item;
  const customColors = {
    text_color: document.text_color,
    bg_color: document.background_color,
  };
  const page = "project";

  return { props: { document, page, uid, revalidate: 60 } };
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

const ArchiveItem = ({ document, uid }) => {
  const page_data = document;

  const {
    title_image,
    title,
    case_study,
    description,
    text_color,
    background_color,
    backup_text,
    supporting_image,
  } = page_data;
  console.log("Project Data", page_data);

  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const [passwordField, setPasswordField] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLocked, setIsLocked] = useState(page_data.password_protected);

  const { currentTag, setReturnPage, setNavTextColor } =
    useContext(MemoryContext);
  const footerRef = createRef();

  const images = page_data.images;
  const total = images ? images.length : 0;

  document.tags = document._meta.tags;

  useEffect(() => {
    window.document.querySelector("body").classList.add("item_page");
    setReturnPage(true);

    return () => {
      window.document.querySelector("body").classList.remove("item_page");
    };
  }, []);

  useEffect(() => {
    console.log("Nav Text Color", text_color);

    setNavTextColor(text_color);

    return () => {
      setNavTextColor(null);
    };
  }, [text_color]);

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
        currentTag && currentTag !== "All Work"
          ? `/?tag=${currentTag}`
          : "/archive"
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

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // console.log("Password is:", passwordField, "Slug is:", uid);

    const response = await fetch("/api/password", {
      method: "post",
      body: JSON.stringify({ uid, passwordField }),
      //pass current page slug and whats in the password field
    });

    const body = await response.json();

    if (!body.success) {
      console.log("body fail");
      setErrorMessage(body.message);
    } else {
      console.log("body win");
      setIsLocked(false);
    }
  };

  return (
    <div
      className={styles.container}
      style={
        case_study && background_color
          ? {
              backgroundColor: background_color,
              borderColor: text_color,
              color: text_color,
            }
          : null
      }
    >
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
            page_data.description && page_data.description.length > 0
              ? page_data.description[0].text
              : "An archive item by COLLECT NYC."
          }
        />

        <SharedHead />
      </Head>

      {isLocked ? (
        <div
          // className={styles.password_wrapper}
          style={{ backgroundColor: "#00000" }}
        >
          <form
            className={styles.password_field}
            onSubmit={handlePasswordSubmit}
          >
            <input
              className={styles.text_input}
              type="text"
              value={passwordField}
              placeholder="Enter Password"
              onChange={(e) => setPasswordField(e.target.value)}
            />
            <p>{errorMessage}</p>
            <button
              className={styles.password_button}
              onClick={(event) => handlePasswordSubmit(event)}
            >
              View Case Study
            </button>
          </form>
        </div>
      ) : (
        <main className={styles.main}>
          {case_study ? (
            <div
              className={styles.casestudy_container}
              style={
                background_color ? { backgroundColor: background_color } : null
              }
            >
              <section>
                <figure>
                  <Image
                    src={title_image.url}
                    alt={title_image.alt}
                    height={title_image.dimensions.height}
                    width={title_image.dimensions.width}
                  />
                </figure>
              </section>
            </div>
          ) : (
            <div className={styles.inner}>
              <ProjectViewer
                images={images}
                PrevItem={PrevItem}
                NextItem={NextItem}
                currentImage={currentImage}
              />

              <div className={styles.archive}>
                <Link href="/archive">
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
          )}

          <div ref={footerRef}></div>

          <footer
            className={
              images.length > 1
                ? `${styles.project_footer} ${styles.multi_item}`
                : `${styles.project_footer} ${styles.single_item}`
            }
            style={
              case_study && background_color
                ? {
                    backgroundColor: background_color,
                    borderColor: text_color,
                    color: text_color,
                  }
                : null
            }
          >
            <div className={styles.title_and_description}>
              <h1 className={styles.title}>
                {page_data.title[0]
                  ? page_data.title[0].text
                  : "COLLECT Project"}
              </h1>

              <div className={styles.description}>
                {page_data.description && page_data.description.length > 0
                  ? page_data.description[0].text
                  : null}
              </div>
            </div>

            <div className={styles.credits_and_download}>
              <div className={styles.credits}>
                {/* page_data.body1[0]
                  ? page_data.body1[0].items.map((credit, index) => (
                      <div key={index} className={styles.credit}>
                        <p>{credit.title_or_category[0].text}</p>
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
                          : null */}
              </div>
              <div className={styles.download}>Download Project Images</div>
            </div>
          </footer>
        </main>
      )}
    </div>
  );
};

ArchiveItem.Layout = MyLayout;
export default ArchiveItem;
