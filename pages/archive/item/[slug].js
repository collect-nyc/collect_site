import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  createRef,
} from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import { motion } from "framer-motion";
import animateScrollTo from "animated-scroll-to";
import SharedHead from "../../../components/SharedHead";
import MyLayout from "../../../layouts/MyLayout";
import ProjectViewer from "../../../components/ProjectViewer";
import LeftArrow from "../../../svg/left-arrow.svg";
import { Client } from "../../../lib/prismic-config";
import { SITE_NAME } from "../../../lib/constants";
import MemoryContext from "../../../components/MemoryContext";
import { apolloClient } from "../../../lib/apollo-config";
import { ImageSlider } from "../../../components/ImageSlider";
import styles from "../../../styles/Item.module.scss";

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
          coming_soon
          creation_date
          title
          description
          download {
            _linkType
            ... on _FileLink {
              url
            }
          }
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
          item_type
          background_color
          text_color
          archive_view_text
          archive_view_background
          archive_view_linear_rule
          title_image
          title_image_width
          backup_text
          supporting_image
          supporting_image_width
          support_vertical_spacing
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
          body {
            ... on Archive_itemBodySingle_image {
              type
              primary {
                image
                columns
                vertical_spacing
              }
            }
            ... on Archive_itemBodyImages_slider {
              type
              primary {
                vertical_spacing
              }
              fields {
                image
                description
              }
            }
            ... on Archive_itemBodyText_block {
              type
              primary {
                vertical_spacing
                text
              }
            }
            ... on Archive_itemBody2up_images {
              type
              primary {
                layout
                vertical_spacing
                first_image
                second_image
              }
            }
            __typename
          }
          _linkType
        }
      }
    `,
    variables: {
      uid: params.slug,
    },
  });

  const document = data.archive_item;
  const page = "archive_item";
  const case_study =
    data?.archive_item?.item_type === "Case Study" ? true : false;
  const project_title =
    case_study && data?.archive_item?.title[0]?.text
      ? data.archive_item.title[0].text
      : null;

  return {
    props: { document, page, case_study, project_title, uid, revalidate: 60 },
  };
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

const ArchiveItem = ({ document, uid, case_study, project_title }) => {
  const page_data = document;

  console.log(
    "Project Data",
    page_data,
    "Is Case Study?",
    case_study,
    project_title
  );

  const {
    pageHistory,
    setCaseStudyView,
    currentTag,
    setReturnPage,
    setNavTextColor,
    archiveView,
    setArchiveView,
    setRunCSFade,
    setImageTotal,
  } = useContext(MemoryContext);

  useEffect(() => {
    if (
      page_data &&
      page_data.item_type &&
      page_data.item_type === "Case Study"
    ) {
      setCaseStudyView(true);
    } else {
      setCaseStudyView(false);
    }

    if (page_data && page_data.text_color) {
      setNavTextColor(page_data.text_color);
    }

    return () => {
      setCaseStudyView(false);
      setNavTextColor(null);
    };
  }, [page_data, setCaseStudyView]);

  const router = useRouter();

  // State
  const [currentImage, setCurrentImage] = useState(0);
  const [passwordField, setPasswordField] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLocked, setIsLocked] = useState(
    page_data && page_data.password_protected
      ? page_data.password_protected
      : null
  );
  const [titleImageDist, setTitleImageDist] = useState(null);
  const [appHeight, setAppHeight] = useState(null);
  const [onceAppHeight, setOnceAppHeight] = useState(null);

  // Refs
  const TitleImage = useRef();

  // Variables
  const images = page_data && page_data.images ? page_data.images : null;
  const total = images ? images.length : 0;

  useEffect(() => {
    setImageTotal(total);
  }, [total]);

  // Debounce
  const debounce = (func, time) => {
    var time = time || 100; // 100 by default if no param
    var timer;
    return function (event) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, time, event);
    };
  };

  // Get distance of title image from bottom of viewport
  const SupportDist = () => {
    if (TitleImage.current) {
      const el = TitleImage.current.firstChild.getBoundingClientRect();
      const top = el.top;

      // console.log("Support Image Distance", top);

      setTitleImageDist(top);
    }
  };

  // Get actual viewport height to use against iOS Safari 15 bottom bar
  const FindHeight = () => {
    const InnerHeight = window.innerHeight;
    // console.log("App Height", InnerHeight);

    setAppHeight(InnerHeight);
  };

  const OnceFindHeight = () => {
    const InnerHeight = window.innerHeight;
    setOnceAppHeight(InnerHeight);
  };

  useEffect(() => {
    setReturnPage(true);

    // Remove fade cover for case studies
    setTimeout(() => {
      setRunCSFade(false);
    }, 100);

    SupportDist();
    FindHeight();
    OnceFindHeight();

    window.addEventListener("resize", SupportDist);
    window.addEventListener("resize", debounce(FindHeight, 150));

    return () => {
      window.removeEventListener("resize", SupportDist);
      window.removeEventListener("resize", debounce(FindHeight, 150));
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
        pageHistory === "/"
          ? "/"
          : currentTag && currentTag !== "All Work"
          ? `/archive?tag=${currentTag}`
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
  }, [currentImage, pageHistory, total]);

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

  const SingleImageClasses = (columns, vertical) => {
    let output = [];

    switch (columns) {
      case "Gutters":
        output.push(`${styles.single_image} ${styles.gutters}`);
        break;
      case "Ultra":
        output.push(`${styles.single_image} ${styles.ultra}`);
        break;
      case "12":
        output.push(`${styles.single_image} ${styles.twelve}`);
        break;
      case "10":
        output.push(`${styles.single_image} ${styles.ten}`);
        break;
      case "8":
        output.push(`${styles.single_image} ${styles.eight}`);
        break;
      case "6":
        output.push(`${styles.single_image} ${styles.six}`);
        break;
      case "4":
        output.push(`${styles.single_image} ${styles.four}`);
        break;
      default:
        output.push(`${styles.single_image}`);
    }

    switch (vertical) {
      case "Default":
        output.push(` ${styles.vertical_default}`);
        break;
      case "120":
        output.push(` ${styles.column}`);
        break;
      case "30":
        output.push(` ${styles.thirty}`);
        break;
      case "10":
        output.push(` ${styles.vertical_ultra}`);
        break;
      case "None":
        output.push(` ${styles.vertical_none}`);
        break;
      default:
        break;
    }

    return output.join("");
  };

  const DoubleImageClasses = (layout, vertical) => {
    let output = [];

    switch (layout) {
      case "Equal":
        output.push(`${styles.double_image} ${styles.equal}`);
        break;
      case "Asymmetrical Left":
        output.push(`${styles.double_image} ${styles.left}`);
        break;
      case "Asymmetrical Right":
        output.push(`${styles.double_image} ${styles.right}`);
        break;
      default:
        output.push(`${styles.double_image}`);
    }

    switch (vertical) {
      case "Default":
        output.push(` ${styles.vertical_default}`);
        break;
      case "120":
        output.push(` ${styles.column}`);
        break;
      case "30":
        output.push(` ${styles.thirty}`);
        break;
      case "10":
        output.push(` ${styles.vertical_ultra}`);
        break;
      case "None":
        output.push(` ${styles.vertical_none}`);
        break;
      default:
        break;
    }

    return output.join("");
  };

  const OtherItemClasses = (default_class, vertical) => {
    let output = [];

    output.push(default_class);

    switch (vertical) {
      case "Default":
        output.push(` ${styles.vertical_default}`);
        break;
      case "120":
        output.push(` ${styles.column}`);
        break;
      case "30":
        output.push(` ${styles.thirty}`);
        break;
      case "10":
        output.push(` ${styles.vertical_ultra}`);
        break;
      case "None":
        output.push(` ${styles.vertical_none}`);
        break;
      default:
        break;
    }

    return output.join("");
  };

  const pageContent =
    page_data && page_data.body
      ? page_data.body.map((slice, index) => {
          // 2up Images Slice
          if (slice.type === "2up_images") {
            return (
              <section
                key={index}
                className={DoubleImageClasses(
                  slice.primary.layout,
                  slice.primary.vertical_spacing
                )}
              >
                <div
                  className={
                    slice.primary.first_image && !slice.primary.second_image
                      ? `${styles.no_marg}`
                      : !slice.primary.first_image && slice.primary.second_image
                      ? `${styles.no_marg}`
                      : null
                  }
                >
                  {slice.primary.first_image &&
                  slice.primary.first_image.url ? (
                    <figure>
                      <Image
                        src={slice.primary.first_image.url}
                        layout={"responsive"}
                        height={slice.primary.first_image.dimensions.height}
                        width={slice.primary.first_image.dimensions.width}
                        alt={slice.primary.first_image.alt}
                        quality={100}
                      />
                    </figure>
                  ) : null}
                </div>
                <div>
                  {slice.primary.second_image &&
                  slice.primary.second_image.url ? (
                    <figure>
                      <Image
                        src={slice.primary.second_image.url}
                        layout={"responsive"}
                        height={slice.primary.second_image.dimensions.height}
                        width={slice.primary.second_image.dimensions.width}
                        alt={slice.primary.second_image.alt}
                        quality={100}
                      />
                    </figure>
                  ) : null}
                </div>
              </section>
            );

            // Single Image Slice
          } else if (slice.type === "single_image") {
            return (
              <section
                key={index}
                className={SingleImageClasses(
                  slice.primary.columns,
                  slice.primary.vertical_spacing
                )}
              >
                {slice.primary.image && slice.primary.image.url ? (
                  <figure
                    className={
                      slice.primary.full_bleed ? `${styles.full_bleed}` : null
                    }
                  >
                    <Image
                      src={slice.primary.image.url}
                      layout={"responsive"}
                      height={slice.primary.image.dimensions.height}
                      width={slice.primary.image.dimensions.width}
                      alt={slice.primary.image.alt}
                      quality={100}
                    />
                  </figure>
                ) : null}
              </section>
            );
          } else if (slice.type === "text_block") {
            return (
              <section
                key={index}
                className={OtherItemClasses(
                  styles.text_block,
                  slice.primary.vertical_spacing
                )}
              >
                {slice.primary.text ? (
                  <RichText render={slice.primary.text} />
                ) : null}
              </section>
            );
          } else if (slice.type === "images_slider") {
            return (
              <section
                key={index}
                className={OtherItemClasses(
                  styles.image_slider,
                  slice.primary.vertical_spacing
                )}
              >
                <ImageSlider
                  images={slice.fields}
                  text_color={page_data.text_color}
                  background_color={page_data.background_color}
                  quality={100}
                />
              </section>
            );
          } else {
            return null;
          }
        })
      : null;

  if (!page_data) {
    return null;
  }

  return (
    <>
      <div
        className={styles.container}
        id="itemContainer"
        style={
          page_data &&
          page_data.item_type === "Case Study" &&
          page_data.background_color
            ? {
                backgroundColor: page_data.background_color,
                borderColor: page_data.text_color,
                color: page_data.text_color,
              }
            : null
        }
      >
        <Head>
          <title>
            {page_data.title[0].text
              ? page_data.title[0].text
              : "Collect NYC Project"}{" "}
            – {SITE_NAME}
          </title>
          <meta
            name="description"
            content={
              page_data.description && page_data.description.length > 0
                ? page_data.description[0].text
                : "An archive item by Collect NYC."
            }
          />

          <SharedHead />
        </Head>

        {isLocked ? (
          <div className={styles.password_wrapper}>
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
            {page_data.item_type === "Case Study" && !archiveView ? (
              <div
                className={styles.casestudy_container}
                style={
                  page_data.item_type === "Case Study" && page_data.text_color
                    ? {
                        color: page_data.text_color,
                        paddingTop:
                          "calc(" +
                          onceAppHeight +
                          "px - " +
                          (titleImageDist - 50) +
                          "px)",
                      }
                    : null
                }
              >
                <motion.figure
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1] }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  style={
                    page_data.item_type === "Case Study" &&
                    page_data.background_color
                      ? {
                          backgroundColor: page_data.background_color,
                          height: onceAppHeight + "px",
                        }
                      : null
                  }
                  className={
                    page_data.title_image_width &&
                    page_data.title_image_width === "12"
                      ? `${styles.title_image} ${styles.twelve}`
                      : page_data.title_image_width === "10"
                      ? `${styles.title_image} ${styles.ten}`
                      : page_data.title_image_width === "8"
                      ? `${styles.title_image} ${styles.eight}`
                      : page_data.title_image_width === "6"
                      ? `${styles.title_image} ${styles.six}`
                      : page_data.title_image_width === "4"
                      ? `${styles.title_image} ${styles.four}`
                      : page_data.title_image_width === "Gutters"
                      ? `${styles.title_image} ${styles.gutters}`
                      : page_data.title_image_width === "Ultra"
                      ? `${styles.title_image} ${styles.ultra}`
                      : `${styles.title_image}`
                  }
                  ref={TitleImage}
                >
                  {page_data.title_image && page_data.title_image.url ? (
                    <Image
                      src={page_data.title_image.url}
                      alt={page_data.title_image.alt}
                      height={page_data.title_image.dimensions.height}
                      width={page_data.title_image.dimensions.width}
                      quality={100}
                      className="title_image"
                      priority
                    />
                  ) : page_data.backup_text && page_data.backup_text[0] ? (
                    <p className={styles.backup_text}>
                      {page_data.backup_text[0].text}
                    </p>
                  ) : null}
                </motion.figure>
                <div className={styles.casestudy_content}>
                  <section
                    className={
                      page_data.supporting_image_width &&
                      page_data.supporting_image_width === "12"
                        ? `${styles.case_study_intro} ${styles.twelve}`
                        : page_data.supporting_image_width === "10"
                        ? `${styles.case_study_intro} ${styles.ten}`
                        : page_data.supporting_image_width === "8"
                        ? `${styles.case_study_intro} ${styles.eight}`
                        : page_data.supporting_image_width === "Gutters"
                        ? `${styles.case_study_intro} ${styles.gutters}`
                        : page_data.supporting_image_width === "Ultra"
                        ? `${styles.case_study_intro} ${styles.ultra}`
                        : `${styles.case_study_intro}`
                    }
                  >
                    <motion.figure
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1] }}
                      transition={{
                        duration: 1,
                        delay: 1.4,
                        ease: "easeOut",
                      }}
                      className={styles.support_image}
                    >
                      {page_data.supporting_image &&
                      page_data.supporting_image.url ? (
                        <Image
                          src={page_data.supporting_image.url}
                          alt={page_data.supporting_image.alt}
                          height={page_data.supporting_image.dimensions.height}
                          width={page_data.supporting_image.dimensions.width}
                          quality={100}
                          className={styles.image}
                          layout={"responsive"}
                          priority
                        />
                      ) : null}
                    </motion.figure>
                  </section>
                  <div
                    style={
                      page_data.item_type === "Case Study" &&
                      page_data.background_color
                        ? {
                            backgroundColor: page_data.background_color,
                          }
                        : null
                    }
                    className={
                      page_data.support_vertical_spacing &&
                      page_data.support_vertical_spacing === "Default"
                        ? `${styles.lower_content} ${styles.vertical_default}`
                        : page_data.support_vertical_spacing === "10"
                        ? `${styles.lower_content} ${styles.vertical_ultra}`
                        : page_data.support_vertical_spacing === "30"
                        ? `${styles.lower_content} ${styles.thirty}`
                        : page_data.support_vertical_spacing === "None"
                        ? `${styles.lower_content} ${styles.vertical_none}`
                        : page_data.support_vertical_spacing === "120"
                        ? `${styles.lower_content} ${styles.one_twenty}`
                        : `${styles.lower_content}`
                    }
                  >
                    {pageContent}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={styles.inner}
                style={
                  archiveView &&
                  page_data.item_type === "Case Study" &&
                  page_data.archive_view_background
                    ? {
                        backgroundColor: page_data.archive_view_background,
                        color: page_data.archive_view_text,
                      }
                    : {
                        height: appHeight + "px",
                      }
                }
              >
                <ProjectViewer
                  images={images}
                  PrevItem={PrevItem}
                  NextItem={NextItem}
                  currentImage={currentImage}
                />
              </div>
            )}

            <footer
              className={`${styles.project_footer} ${styles.multi_item}`}
              id={"itemFooter"}
              style={
                page_data.item_type === "Case Study" &&
                page_data.background_color &&
                !archiveView
                  ? {
                      backgroundColor: page_data.background_color,
                      borderColor: "transparent",
                      color: page_data.text_color,
                    }
                  : archiveView
                  ? {
                      backgroundColor: page_data.archive_view_background,
                      borderColor: page_data.archive_view_linear_rule
                        ? page_data.archive_view_linear_rule
                        : page_data.archive_view_text
                        ? page_data.archive_view_text
                        : "inherit",
                      color: page_data.archive_view_text,
                    }
                  : null
              }
            >
              <div className={styles.title_and_description}>
                <div className={styles.inner_desc}>
                  <h1 className={styles.title}>
                    {page_data?.title[0]?.text
                      ? page_data.title[0].text
                      : "COLLECT Project"}
                  </h1>

                  <div className={styles.description}>
                    {page_data.description &&
                    page_data.description.length > 0 ? (
                      <RichText render={page_data.description} />
                    ) : null}
                  </div>

                  <div className={styles.counter}>
                    {total > 1 ? (
                      <span className={styles.current_image}>
                        {currentImage + 1}/{total}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              {page_data.body1 &&
              page_data.body1[0] &&
              page_data.body1[0].fields ? (
                <div className={styles.credits_and_download}>
                  <div className={styles.credits}>
                    {page_data.body1 &&
                    page_data.body1[0] &&
                    page_data.body1[0].fields
                      ? page_data.body1[0].fields.map((credit, index) => (
                          <div key={index} className={styles.credit}>
                            <p className={styles.credit_title}>
                              {credit.title_or_category
                                ? credit.title_or_category[0]?.text
                                : null}
                            </p>
                            {credit.names ? (
                              <div className={"list_of_names"}>
                                <RichText render={credit.names} />
                              </div>
                            ) : null}
                          </div>
                        ))
                      : null}
                  </div>
                  {page_data.download && page_data.download.url ? (
                    <div className={styles.download}>
                      <a className={"color_link"} href={page_data.download.url}>
                        Download Project Images
                      </a>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {page_data.item_type === "Case Study" ? (
                <nav className={styles.back_nav}>
                  <Link href={"/"}>
                    <a className={"color_link"}>
                      <LeftArrow className={"color_svg"} /> Back to Home
                    </a>
                  </Link>
                  <Link
                    href={
                      currentTag && currentTag !== "All Work"
                        ? `/archive?tag=${currentTag}`
                        : "/archive"
                    }
                  >
                    <a className={"color_link"}>
                      <LeftArrow className={"color_svg"} /> Back to Archive
                    </a>
                  </Link>
                  <style global jsx>{`
                    .color_svg path {
                      fill: ${archiveView && page_data.archive_view_text
                        ? page_data.archive_view_text
                        : page_data.text_color};
                    }
                    .color_link {
                      color: ${archiveView && page_data.archive_view_text
                        ? page_data.archive_view_text
                        : page_data.text_color};
                    }

                    .list_of_names a {
                      color: ${archiveView && page_data.archive_view_text
                        ? page_data.archive_view_text
                        : page_data.text_color};
                    }
                  `}</style>
                </nav>
              ) : null}
            </footer>
          </main>
        )}
      </div>
    </>
  );
};

ArchiveItem.Layout = MyLayout;
export default ArchiveItem;
