import React, { useEffect, useContext, useRef, useMemo } from "react";
import Head from "next/head";
import SharedHead from "../components/SharedHead";
import MyLayout from "../layouts/MyLayout";
import { Client } from "../lib/prismic-config";
import Image from "next/image";
import Link from "next/link";
import _ from "lodash";
import { useRouter } from "next/router";
import MemoryContext from "../components/MemoryContext";
import LoaderContext from "../components/LoaderContext";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import FeaturedSlider from "../components/FeaturedSlider";
import styles from "../styles/Index.module.scss";

export async function getServerSideProps({ query }) {
  // const tagged = query.tag || null;

  const everything = await fetch(
    "https://collectnyc.cdn.prismic.io/api/v2"
  ).then((res) => res.json());

  // New method of pulling tags
  // const taggers = await fetch(
  //   "https://collectnyc.cdn.prismic.io/api/tags"
  // ).then((res) => res.json());

  //Page Data
  // Used to be landing_page
  const document = await Client().getSingle("home_page", {
    fetchLinks: [
      "archive_item.background_color",
      "archive_item.item_type",
      "archive_item.title",
      "archive_item.description",
      "archive_item.images",
    ],
  });

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
  const router = useRouter();
  console.log("Landing Data", document.data);

  // console.log("featured data", document.data.body1);

  const {
    setScrollPos,
    setReturnPage,
    setRunCSFade,
    setCsColor,
    homeScrollPos,
    setHomeScrollPos,
  } = useContext(MemoryContext);

  const { loaderDidRun, setLoaderDidRun } = useContext(LoaderContext);

  const refs = useMemo(
    () => document?.data?.body1?.map(() => React.createRef()),
    []
  );

  useEffect(() => {
    // console.log("Landing Data", document.data);

    // Reset scroll position for Archive Index
    setScrollPos(0);
    setReturnPage(false);

    if (homeScrollPos) {
      // turn off scroll position for homepage for now
      // window.scrollBy(0, parseInt(homeScrollPos, 10));
      setHomeScrollPos(0);
    }
  }, []);

  const ScrollTracker = () => {
    let top =
      (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
    // console.log("Scroll Pos", top);
    setHomeScrollPos(top);
  };

  const EnterCaseStudy = (color, url) => {
    setCsColor(color);
    setRunCSFade(true);

    setTimeout(() => {
      ScrollTracker();
      router.push(url);
    }, 300);
  };

  // With links to Case Studies
  // if (slice.primary.featured_image?.url) {
  //   return (
  //     <section key={index} className={styles.feature}>
  //       <header>
  //         <span className={styles.tags}>
  //           {slice.primary.case_study_link.tags?.map((tag, index, arr) => {
  //             if (arr.length - 1 === index) {
  //               return <span key={index}>{tag}</span>;
  //             } else {
  //               return <span key={index}>{tag}, </span>;
  //             }
  //           })}
  //         </span>
  //         <span className={styles.title}>
  //           {slice.primary.case_study_link.data?.title[0]?.text}
  //         </span>
  //       </header>
  //       {slice.primary.case_study_link &&
  //       slice.primary.case_study_link.uid ? (
  //         slice.primary.case_study_link.data?.item_type === "Case Study" &&
  //         slice.primary.case_study_link.data?.background_color ? (
  //           <a
  //             onClick={
  //               slice.primary.case_study_link.data?.item_type ===
  //                 "Case Study" &&
  //               slice.primary.case_study_link.data?.background_color
  //                 ? () =>
  //                     EnterCaseStudy(
  //                       slice.primary.case_study_link.data?.background_color,
  //                       "/archive/item/" + slice.primary.case_study_link.uid
  //                     )
  //                 : null
  //             }
  //           >
  //             <Image
  //               src={slice.primary.featured_image.url}
  //               layout={"responsive"}
  //               height={slice.primary.featured_image.dimensions.height}
  //               width={slice.primary.featured_image.dimensions.width}
  //               alt={slice.primary.featured_image.alt}
  //               priority
  //               quality={100}
  //             />
  //           </a>
  //         ) : (
  //           <Link href={"/archive/item/" + slice.primary.case_study_link.uid}>
  //             <a onClick={() => ScrollTracker()}>
  //               <Image
  //                 src={slice.primary.featured_image.url}
  //                 layout={"responsive"}
  //                 height={slice.primary.featured_image.dimensions.height}
  //                 width={slice.primary.featured_image.dimensions.width}
  //                 alt={slice.primary.featured_image.alt}
  //                 priority
  //                 quality={100}
  //               />
  //             </a>
  //           </Link>
  //         )
  //       ) : (
  //         <Image
  //           src={slice.primary.featured_image.url}
  //           layout={"responsive"}
  //           height={slice.primary.featured_image.dimensions.height}
  //           width={slice.primary.featured_image.dimensions.width}
  //           alt={slice.primary.featured_image.alt}
  //           priority
  //           quality={100}
  //         />
  //       )}
  //     </section>
  //   );
  // } else {
  //   return null;
  // }

  const featureContent = document?.data?.body1?.map((slice, index) => {
    if (
      slice.primary.case_study_link &&
      slice.primary.case_study_link.data &&
      slice.primary.case_study_link.data.images &&
      slice.primary.case_study_link.data.images.length > 0
    ) {
      return (
        <section
          key={index}
          className={`${styles.feature} ${
            slice.primary.position === "Left"
              ? styles.left
              : slice.primary.position === "Right"
              ? styles.right
              : styles.center
          }`}
        >
          <div
            className={
              slice.primary.width === "7"
                ? `${styles.media_container} ${styles.seven_col}`
                : `${styles.media_container}  ${styles.eight_col}`
            }
          >
            <div className={styles.inner}>
              {slice.primary.case_study_link.data &&
              slice.primary.case_study_link.data.images.length > 1 ? (
                <FeaturedSlider
                  refs={refs}
                  images={slice.primary.case_study_link.data.images}
                  index={index}
                />
              ) : slice.primary.case_study_link.data &&
                slice.primary.case_study_link.data.images[0].image &&
                slice.primary.case_study_link.data.images[0].image.url ? (
                <Image
                  src={slice.primary.case_study_link.data.images[0].image.url}
                  alt={slice.primary.case_study_link.data.images[0].image.alt}
                  height={
                    slice.primary.case_study_link.data.images[0].image
                      .dimensions.height
                  }
                  width={
                    slice.primary.case_study_link.data.images[0].image
                      .dimensions.width
                  }
                  layout={"responsive"}
                  priority
                  quality={100}
                />
              ) : (
                <h1>No images in media tab</h1>
              )}
              <header>
                <span className={styles.tags}>
                  {slice.primary.case_study_link.tags?.map((tag, i, arr) => {
                    if (arr.length - 1 === i) {
                      return <span key={i}>{tag}</span>;
                    } else {
                      return <span key={i}>{tag}, </span>;
                    }
                  })}
                </span>
                <span className={styles.title}>
                  {slice.primary.case_study_link.data?.title[0]?.text}
                </span>
              </header>
            </div>
          </div>
        </section>
      );
    } else {
      return null;
    }
  });

  const pageContent = document?.data?.body.map((slice, index) => {
    // Render the right markup for the given slice type

    // 2up Images Slice
    if (slice.slice_type === "2up_row") {
      return (
        <section
          key={index}
          className={`${styles.double_image} ${
            slice.primary.alignment === "Top" ? styles.top : styles.bottom
          } ${
            slice.primary.gutter === "None" ? styles.no_gutter : styles.gutter
          } ${
            slice.primary.size === "Even"
              ? styles.even
              : slice.primary.size === "7/5"
              ? styles.seven_five
              : slice.primary.size === "5/7"
              ? styles.five_seven
              : slice.primary.size === "8/4"
              ? styles.eight_four
              : styles.four_eight
          }`}
        >
          <div className={`${styles.image} ${styles.left}`}>
            {slice.primary.left_image.url || slice.primary.left_video.url ? (
              slice.primary.archive_link_left &&
              slice.primary.archive_link_left.uid ? (
                slice.primary.archive_link_left.data?.item_type ===
                  "Case Study" &&
                slice.primary.archive_link_left.data?.background_color ? (
                  <a
                    onClick={
                      slice.primary.archive_link_left.data?.item_type ===
                        "Case Study" &&
                      slice.primary.archive_link_left.data?.background_color
                        ? () =>
                            EnterCaseStudy(
                              slice.primary.archive_link_left.data
                                ?.background_color,
                              "/archive/item/" +
                                slice.primary.archive_link_left.uid
                            )
                        : null
                    }
                  >
                    <Image
                      src={slice.primary.left_image.url}
                      layout={"responsive"}
                      height={slice.primary.left_image.dimensions.height}
                      width={slice.primary.left_image.dimensions.width}
                      alt={slice.primary.left_image.alt}
                      priority
                      quality={100}
                    />
                  </a>
                ) : (
                  <Link
                    href={
                      "/archive/item/" + slice.primary.archive_link_left.uid
                    }
                  >
                    <a onClick={() => ScrollTracker()}>
                      {slice.primary?.left_image?.url ? (
                        <Image
                          src={slice.primary.left_image.url}
                          layout={"responsive"}
                          height={slice.primary.left_image.dimensions.height}
                          width={slice.primary.left_image.dimensions.width}
                          alt={slice.primary.left_image.alt}
                          priority
                          quality={100}
                        />
                      ) : slice.primary.left_video?.url ? (
                        <video playsInline loop autoPlay muted>
                          <source
                            src={slice.primary.left_video.url}
                            type="video/mp4"
                          />
                        </video>
                      ) : null}
                    </a>
                  </Link>
                )
              ) : slice.primary?.left_image?.url ? (
                <Image
                  src={slice.primary.left_image.url}
                  layout={"responsive"}
                  height={slice.primary.left_image.dimensions.height}
                  width={slice.primary.left_image.dimensions.width}
                  alt={slice.primary.left_image.alt}
                  priority
                  quality={100}
                />
              ) : slice.primary.left_video?.url ? (
                <video playsInline loop autoPlay muted>
                  <source src={slice.primary.left_video.url} type="video/mp4" />
                </video>
              ) : null
            ) : null}
          </div>
          <div className={`${styles.image} ${styles.right}`}>
            {slice.primary.right_image.url || slice.primary.right_video.url ? (
              slice.primary.archive_link_right &&
              slice.primary.archive_link_right.uid ? (
                slice.primary.archive_link_right.data?.item_type ===
                  "Case Study" &&
                slice.primary.archive_link_right.data?.background_color ? (
                  <a
                    onClick={
                      slice.primary.archive_link_right.data?.item_type ===
                        "Case Study" &&
                      slice.primary.archive_link_right.data?.background_color
                        ? () =>
                            EnterCaseStudy(
                              slice.primary.archive_link_right.data
                                ?.background_color,
                              "/archive/item/" +
                                slice.primary.archive_link_right.uid
                            )
                        : null
                    }
                  >
                    {slice.primary?.right_image?.url ? (
                      <Image
                        src={slice.primary.right_image.url}
                        layout={"responsive"}
                        height={slice.primary.right_image.dimensions.height}
                        width={slice.primary.right_image.dimensions.width}
                        alt={slice.primary.right_image.alt}
                        priority
                        quality={100}
                      />
                    ) : slice.primary.right_video?.url ? (
                      <video playsInline loop autoPlay muted>
                        <source
                          src={slice.primary.right_video.url}
                          type="video/mp4"
                        />
                      </video>
                    ) : null}
                  </a>
                ) : (
                  <Link
                    href={
                      "/archive/item/" + slice.primary.archive_link_right.uid
                    }
                  >
                    <a onClick={() => ScrollTracker()}>
                      {slice.primary?.right_image?.url ? (
                        <Image
                          src={slice.primary.right_image.url}
                          layout={"responsive"}
                          height={slice.primary.right_image.dimensions.height}
                          width={slice.primary.right_image.dimensions.width}
                          alt={slice.primary.right_image.alt}
                          priority
                          quality={100}
                        />
                      ) : slice.primary.right_video?.url ? (
                        <video playsInline loop autoPlay muted>
                          <source
                            src={slice.primary.right_video.url}
                            type="video/mp4"
                          />
                        </video>
                      ) : null}
                    </a>
                  </Link>
                )
              ) : slice.primary?.right_image?.url ? (
                <Image
                  src={slice.primary.right_image.url}
                  layout={"responsive"}
                  height={slice.primary.right_image.dimensions.height}
                  width={slice.primary.right_image.dimensions.width}
                  alt={slice.primary.right_image.alt}
                  priority
                  quality={100}
                />
              ) : slice.primary.right_video?.url ? (
                <video playsInline loop autoPlay muted>
                  <source
                    src={slice.primary.right_video.url}
                    type="video/mp4"
                  />
                </video>
              ) : null
            ) : null}
          </div>
        </section>
      );

      // Full Image Slice
    } else if (slice.slice_type === "full") {
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
          {slice.primary.image.url || slice.primary.video.url ? (
            <figure
              className={
                slice.primary.gutter == "Gutter" ? null : `${styles.full_bleed}`
              }
            >
              {slice.primary.archive_link && slice.primary.archive_link.uid ? (
                slice.primary.archive_link.data?.item_type === "Case Study" &&
                slice.primary.archive_link.data?.background_color ? (
                  <a
                    onClick={
                      slice.primary.archive_link.data?.item_type ===
                        "Case Study" &&
                      slice.primary.archive_link.data?.background_color
                        ? () =>
                            EnterCaseStudy(
                              slice.primary.archive_link.data?.background_color,
                              "/archive/item/" + slice.primary.archive_link.uid
                            )
                        : null
                    }
                  >
                    {slice.primary.image?.url ? (
                      <Image
                        src={slice.primary.image.url}
                        layout={"responsive"}
                        height={slice.primary.image.dimensions.height}
                        width={slice.primary.image.dimensions.width}
                        alt={slice.primary.image.alt}
                        priority
                        quality={100}
                      />
                    ) : slice.primary.video?.url ? (
                      <video playsInline loop autoPlay muted>
                        <source
                          src={slice.primary.video.url}
                          type="video/mp4"
                        />
                      </video>
                    ) : null}
                  </a>
                ) : (
                  <Link
                    href={"/archive/item/" + slice.primary.archive_link.uid}
                  >
                    <a onClick={() => ScrollTracker()}>
                      {slice.primary.image?.url ? (
                        <Image
                          src={slice.primary.image.url}
                          layout={"responsive"}
                          height={slice.primary.image.dimensions.height}
                          width={slice.primary.image.dimensions.width}
                          alt={slice.primary.image.alt}
                          priority
                          quality={100}
                        />
                      ) : slice.primary.video?.url ? (
                        <video playsInline loop autoPlay muted>
                          <source
                            src={slice.primary.video.url}
                            type="video/mp4"
                          />
                        </video>
                      ) : null}
                    </a>
                  </Link>
                )
              ) : slice.primary.image?.url ? (
                <Image
                  src={slice.primary.image.url}
                  layout={"responsive"}
                  height={slice.primary.image.dimensions.height}
                  width={slice.primary.image.dimensions.width}
                  alt={slice.primary.image.alt}
                  priority
                  quality={100}
                />
              ) : slice.primary.video?.url ? (
                <video playsInline loop autoPlay muted>
                  <source src={slice.primary.video.url} type="video/mp4" />
                </video>
              ) : null}
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
        <title>Collect NYC</title>
        <meta
          name="description"
          content="Collect NYC is a full-spectrum interdisciplinary creative practice centered in direction, photography, technology and development."
        />
        <SharedHead />
      </Head>

      <main className={styles.main}>
        <motion.section
          className={styles.statement}
          initial={!loaderDidRun ? { opacity: 0 } : { opacity: 1 }}
          animate={
            !loaderDidRun
              ? {
                  opacity: [0, 1],
                }
              : { opacity: 1 }
          }
          transition={{ ease: "easeOut", delay: 0.3, duration: 0.3 }}
        >
          <h1>
            <span className={styles.desktop}>
              <span className={styles.untitled}>
                {document?.data?.untitled_sans_headline}{" "}
              </span>
              <span className={styles.caslon}>
                {document?.data?.caslon_headline}
              </span>
            </span>

            <span className={styles.mobile}>
              <span className={styles.caslon}>
                {document?.data?.mobile_headline_caslon}
                <br />
                {document?.data?.mobile_headline_caslon_break}
              </span>
              <span className={styles.untitled}>
                {" "}
                {document?.data?.mobile_headline_untitled}
              </span>
            </span>
          </h1>
        </motion.section>
        <motion.div
          initial={!loaderDidRun ? { opacity: 0 } : { opacity: 1 }}
          animate={
            !loaderDidRun
              ? {
                  opacity: [0, 1],
                }
              : { opacity: 1 }
          }
          transition={{ ease: "easeOut", delay: 1.5, duration: 0.7 }}
          onAnimationComplete={() => setLoaderDidRun(true)}
        >
          <div className={styles.featured_section}>{featureContent}</div>

          <div className={styles.marquee_section}>
            <Marquee gradient={false} speed={90}>
              COLLECT is an studio for identity centered in design, direction,
              development and the arts. In the realms of culture and commerce we
              enable select collaborators to do more through design. ‘SUDDENLY A
              MIST FELL FROM MY EYES, AND I KNEW THE WAY I HAD TO TAKE.’ EDVARD
              GRIEG &nbsp;&nbsp; ... &nbsp;&nbsp;
            </Marquee>
          </div>

          <div className={styles.select_section}>
            <header>
              <div className={styles.select_header}>
                <h2>
                  <span>Archive SELECTS</span>
                  <span>
                    1-of-1, Sketches, Études<em>, Process</em>
                  </span>
                </h2>
              </div>
              <div className={styles.cap_heading}>
                <div className={styles.left}>
                  <span className={styles.untitled}>
                    <em className={styles.desktop_txt}>
                      Works from Collect ARCHIVE
                    </em>
                    <em className={styles.mobile_txt}>
                      Works from Collect ARCHIVE
                    </em>
                  </span>
                </div>
                <div className={styles.right}>
                  <span>Full ARCHIVE Reopening Fall 2022</span>
                </div>
              </div>
            </header>
            {pageContent}
          </div>
        </motion.div>

        <Footer />
      </main>
    </div>
  );
};

Home.Layout = MyLayout;
export default Home;
