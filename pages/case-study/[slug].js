import React, { useState, useRef, useMemo, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/legacy/image";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";
import { useInView, motion } from "framer-motion";
import animateScrollTo from "animated-scroll-to";
import SharedHead from "../../components/SharedHead";
import MyLayout from "../../layouts/MyLayout";
import { Client } from "../../lib/prismic-config";
import { SITE_NAME } from "../../lib/constants";
// import MemoryContext from "../../components/MemoryContext";
// import { ImageSlider } from "../../components/ImageSlider";
import VideoPlayer from "../../components/common/VideoPlayer";
import Slider from "react-slick";
import styles from "./CaseStudy.module.scss";

export async function getStaticProps({ params, preview = false, previewData }) {
  const uid = params.slug;
  const document = await Client().getByUID("case_study", uid);

  const projects = await Client().query(
    Prismic.Predicates.at("document.type", "case_study"),
    { pageSize: 100 }
  );
  const studies = projects.results;

  const page = document.data.use_carousel
    ? "case_study_carousel"
    : "case_study";

  return {
    props: { document, studies, page, revalidate: 10 },
  };
}

export async function getStaticPaths() {
  const items = await Client().query(
    Prismic.Predicates.at("document.type", "case_study"),
    { pageSize: 100 }
  );

  const posts = items.results;

  // console.log(posts);

  const paths = posts.map((post) => ({
    params: {
      slug: post.uid,
    },
  }));

  // console.log(paths);
  return { paths, fallback: "blocking" };
}

const CaseStudy = ({ document, studies }) => {
  console.log("PAGE DATA", document);

  const {
    body,
    credits,
    project_description,
    header_description,
    hi_res_project_images,
    mobile_images,
    tagline,
    title,
    use_carousel,
    index_thumbnail,
  } = document.data;

  const PageTitle = title[0].text ? title[0].text : "Case Study";

  const exploreRef = useRef(null);
  const creditsRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentMobileSlide, setMobileCurrentSlide] = useState(1);
  const [nextProject, setNextProject] = useState(null);
  const [showCredits, setShowCredits] = useState(false);

  const mobileRef = useRef(null);
  const isInView = useInView(creditsRef);
  const refs = useMemo(() => body?.map(() => React.createRef()), []);
  const [clickedArray, setClickedArray] = useState([]);

  useEffect(() => {
    // console.log("REFS", refs);

    if (refs.length > 0) {
      const newArray = refs.map((item) => {
        return (item = false);
      });
      setClickedArray(newArray);
    }
  }, []);

  // useEffect(() => {
  //   if (clickedArray.length > 0) {
  //     console.log("clicked array", clickedArray);
  //   }
  // }, [clickedArray]);

  function handleUpdateItem(index) {
    const updatedItems = [...clickedArray]; // Make a copy of the original array
    updatedItems[index] = true; // Update the value at the specified index
    setClickedArray(updatedItems); // Set the state variable to the new array
  }

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    slidesToShow: 1.665,
    slidesToScroll: 1,
    centerMode: true,
    cssEase: "ease-in-out",
    useTransform: true,
    beforeChange: (current, next) => {
      setCurrentSlide(next);
    },
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const mobileSettings = {
    arrows: false,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      setMobileCurrentSlide(next + 1);
    },
  };

  // Get the next project URL
  useEffect(() => {
    const totalProjects = studies.length;
    const currentProject = _.findIndex(studies, { uid: document.uid });
    let calcNextProject;

    if (totalProjects > 1) {
      if (currentProject >= totalProjects - 1) {
        calcNextProject = 0;
      } else {
        calcNextProject = currentProject + 1;
      }

      setNextProject(studies[calcNextProject].uid);
    }
  }, [nextProject, studies, document.uid]);

  // useEffect(() => {
  //   console.log("NEXT PROJECT", nextProject);
  // }, [nextProject]);

  const nextSlidez = (index) => {
    if (refs[index]) {
      refs[index].current.slickNext();
    }
  };

  const previousSlidez = (index) => {
    if (refs[index]) {
      refs[index].current.slickPrev();
    }
  };

  const moveLastToFirst = (theArray) => {
    if (theArray.length > 1) {
      const lastElement = theArray[theArray.length - 1];
      const newArray = [lastElement, ...theArray.slice(0, -1)];
      // console.log("New Array", newArray);
      return newArray;
    } else {
      return theArray;
    }
  };

  // Slice Rendering
  const SliceZone =
    body && body.length > 0
      ? body.map((slice, index) => {
          if (slice.slice_type === "full_screen") {
            return (
              <section
                key={index}
                className={`${styles.section} ${styles.fullscreen}`}
              >
                <figure className={styles.fullscreen_image_container}>
                  {slice.primary.full_screen_video?.url ? (
                    <VideoPlayer source={slice.primary.full_screen_video.url} />
                  ) : (
                    slice.primary.full_screen_image &&
                    slice.primary.full_screen_image.url && (
                      <Image
                        src={slice.primary.full_screen_image.url}
                        layout={"responsive"}
                        alt={slice.primary.full_screen_image.alt}
                        height={
                          slice.primary.full_screen_image.dimensions.height
                        }
                        width={slice.primary.full_screen_image.dimensions.width}
                      />
                    )
                  )}
                </figure>
              </section>
            );
          } else if (slice.slice_type === "centered_image") {
            return (
              <section
                key={index}
                className={`${styles.section} ${styles.centered_image}`}
              >
                <figure className={styles.centered_image_container}>
                  {slice.primary.centered_video?.url ? (
                    <VideoPlayer source={slice.primary.centered_video.url} />
                  ) : (
                    slice.primary.centered_image && (
                      <Image
                        src={slice.primary.centered_image.url}
                        layout={"responsive"}
                        alt={slice.primary.centered_image.alt}
                        height={slice.primary.centered_image.dimensions.height}
                        width={slice.primary.centered_image.dimensions.width}
                      />
                    )
                  )}
                </figure>
              </section>
            );
          } else if (slice.slice_type === "image_with_text") {
            return (
              <section
                key={index}
                className={`${styles.section} ${styles.image_with_text} ${
                  slice.primary.orientation === "Left"
                    ? styles.left
                    : styles.right
                }`}
              >
                <div className={styles.text}>
                  {slice.primary.description && (
                    <RichText render={slice.primary.description} />
                  )}
                </div>
                <figure className={styles.image_container}>
                  {slice.primary.video?.url ? (
                    <VideoPlayer source={slice.primary.video.url} />
                  ) : (
                    slice.primary.image && (
                      <Image
                        src={slice.primary?.image?.url}
                        layout={"responsive"}
                        alt={slice.primary?.image?.alt}
                        height={slice.primary?.image?.dimensions?.height}
                        width={slice.primary?.image?.dimensions?.width}
                      />
                    )
                  )}
                </figure>
              </section>
            );
          } else if (slice.slice_type === "carousel") {
            return (
              <section
                key={index}
                className={`${styles.section} ${styles.carousel}`}
              >
                <Slider
                  className={`${"carousel_slider"} ${
                    "carousel_slider_" + index
                  } ${styles.slider}`}
                  ref={refs[index]}
                  {...settings}
                >
                  {moveLastToFirst(slice.items).map((item, i) => {
                    return (
                      <div
                        onClick={(event) => {
                          handleUpdateItem(index);

                          // console.log(
                          //   "Clicked Array Value",
                          //   clickedArray[index]
                          // );

                          if (clickedArray[index] === true) {
                            if (
                              event.target.closest(".carousel_slider") !== null
                            ) {
                              event.target
                                .closest(".carousel_slider")
                                .classList.remove("carousel_slider");
                            }
                          }

                          const hasAncestorWithClassname =
                            event.target.closest(".slick-current") !== null;

                          if (hasAncestorWithClassname) {
                            slice.items.length > 1 && previousSlidez(index);
                          } else {
                            slice.items.length > 1 && nextSlidez(index);
                          }
                        }}
                        key={i}
                        className={styles.carousel_slide}
                        index={i}
                      >
                        {item.video?.url ? (
                          <VideoPlayer source={item.video.url} />
                        ) : (
                          item.image && (
                            <Image
                              src={item.image.url}
                              layout={"responsive"}
                              alt={item.image.alt}
                              height={item.image.dimensions.height}
                              width={item.image.dimensions.width}
                            />
                          )
                        )}
                      </div>
                    );
                  })}
                </Slider>
                <div className={styles.controls}>
                  <div className={styles.holder}>
                    <div className={styles.details}>
                      <span className={styles.numbers}>
                        {currentSlide + 1}/{slice.items.length}
                      </span>
                      <span className={styles.caption}>
                        {/* {currentSlide === slice.items.length
                          ? slice.items[0]?.caption
                          : slice.items[currentSlide]?.caption} */}
                        {slice.items[currentSlide]?.caption}
                      </span>
                    </div>
                    <ul className={styles.arrows}>
                      <li>
                        <button
                          onClick={() => {
                            handleUpdateItem(index);

                            if (clickedArray[index] === true) {
                              const element = window.document.querySelector(
                                ".carousel_slider_" + index
                              );
                              if (element) {
                                element.classList.remove("carousel_slider");
                              }
                            }

                            previousSlidez(index);
                          }}
                        >
                          ←
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleUpdateItem(index);

                            if (clickedArray[index] === true) {
                              const element = window.document.querySelector(
                                ".carousel_slider_" + index
                              );
                              if (element) {
                                element.classList.remove("carousel_slider");
                              }
                            }

                            nextSlidez(index);
                          }}
                        >
                          →
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={styles.mobile_stack}>
                  {slice.items.map((item, i) => {
                    return (
                      <div
                        key={i}
                        className={`${styles.mobile_stack_item} ${
                          currentSlide === i ? styles.active : ""
                        }`}
                      >
                        {item.video?.url ? (
                          <VideoPlayer source={item.video.url} />
                        ) : (
                          item.image && (
                            <Image
                              src={item.image.url}
                              layout={"responsive"}
                              alt={item.image.alt}
                              height={item.image.dimensions.height}
                              width={item.image.dimensions.width}
                            />
                          )
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          } else {
            return null;
          }
        })
      : null;

  // framer motion variants
  const mobileNavVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <Head>
        <title>
          {PageTitle} &ndash; {SITE_NAME}
        </title>
        <meta
          name="description"
          content={
            header_description && header_description.length > 0
              ? header_description[0].text
              : "A case study project by Collect NEW YORK."
          }
        />

        <meta property="og:title" content={`${PageTitle} – ${SITE_NAME}`} />
        <meta
          property="og:description"
          content={
            header_description && header_description.length > 0
              ? header_description[0].text
              : "A case study project by Collect NEW YORK."
          }
        />
        {index_thumbnail?.url && (
          <meta property="og:image" content={index_thumbnail.url} />
        )}

        <SharedHead />
      </Head>
      <main
        className={`${styles.case_study_page} ${
          use_carousel && styles.carousel
        }`}
      >
        <header className={styles.intro}>
          <h1>{tagline && tagline}</h1>
          <div className={styles.description}>
            {header_description && header_description.length > 0 ? (
              <RichText render={header_description} />
            ) : null}

            <ul className={styles.ctas}>
              <li>
                <button
                  onClick={() =>
                    animateScrollTo(exploreRef.current, {
                      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
                      minDuration: 1000,
                      speed: 100,
                      verticalOffset: -97,
                    })
                  }
                >
                  Explore
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    animateScrollTo(creditsRef.current, {
                      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
                      minDuration: 600,
                      maxDuration: 1600,
                      speed: 600,
                      verticalOffset: -97,
                    })
                  }
                >
                  Project Info
                </button>
              </li>
            </ul>
          </div>
        </header>

        <header
          className={`${styles.mobile_intro} ${
            use_carousel && styles.carousel
          }`}
        >
          <span className={styles.heading}>
            {title[0].text && title[0].text}
          </span>
          <span className={styles.subtitle}>
            {document.tags?.map((tag, i, arr) => {
              if (arr.length - 1 === i) {
                return <span key={i}>{tag}</span>;
              } else {
                return <span key={i}>{tag}, </span>;
              }
            })}
          </span>
        </header>
        <article
          className={`${styles.main_content} ${
            use_carousel && styles.carousel
          }`}
          ref={exploreRef}
          id="explore"
        >
          {SliceZone}
        </article>
        {mobile_images && mobile_images.length > 0 ? (
          <aside
            className={`${styles.mobile_slides} ${
              use_carousel && styles.carousel
            }`}
          >
            <div className={styles.holder}>
              <Slider ref={mobileRef} {...mobileSettings}>
                {mobile_images.map((slide, index) => {
                  return (
                    <figure
                      onClick={() => mobileRef?.current?.slickNext()}
                      key={index}
                    >
                      <div className={styles.content}>
                        {slide.mobile_video?.url ? (
                          <VideoPlayer source={slide.mobile_video.url} />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={slide.mobile_image.url}
                            alt={slide.mobile_image.alt}
                          />
                        )}
                      </div>
                    </figure>
                  );
                })}
              </Slider>
            </div>
          </aside>
        ) : null}

        <motion.footer
          className={`${styles.credits_section} ${showCredits && styles.open} ${
            use_carousel ? styles.carousel : styles.full
          }`}
          ref={creditsRef}
          id="info"
          animate={{ top: showCredits ? "47px" : "calc(100% - 50px)" }}
          transition={{
            duration: 0.6,
            ease: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
          }}
        >
          <div className={styles.mobile_heading}>
            <div className={styles.left}>
              <span>{title[0].text ? title[0].text : "Case Study"}</span>
              {showCredits ? null : (
                <button onClick={() => setShowCredits(!showCredits)}>
                  Read More
                </button>
              )}
            </div>
            <span className={styles.right}>
              {showCredits ? (
                <button onClick={() => setShowCredits(!showCredits)}>
                  Close
                </button>
              ) : (
                <>
                  {currentMobileSlide}/{mobile_images?.length}
                </>
              )}
            </span>
          </div>
          <div className={styles.container}>
            <div className={styles.description}>
              <span className={styles.title}>
                {title[0].text ? title[0].text : "Case Study"}
              </span>
              <span className={styles.subtitle}>
                {document.tags?.map((tag, i, arr) => {
                  if (arr.length - 1 === i) {
                    return <span key={i}>{tag}</span>;
                  } else {
                    return <span key={i}>{tag}, </span>;
                  }
                })}
              </span>
              {project_description && project_description.length > 0 ? (
                <RichText render={project_description} />
              ) : null}
            </div>
            <div className={styles.credits}>
              <div className={styles.credits_groups}>
                {credits.length > 0 &&
                  credits.map((credit, index) => {
                    return (
                      <div key={index}>
                        <span>{credit.group_title[0].text}</span>
                        <RichText render={credit.group_content} />
                      </div>
                    );
                  })}
              </div>
              {hi_res_project_images?.url && (
                <a
                  className={styles.img_download}
                  href={hi_res_project_images.url}
                >
                  Download Hi-Res Project Images
                </a>
              )}
            </div>
            <div className={styles.contact}>
              <div className={styles.contact_info}>
                <p>
                  <span>GET IN TOUCH</span> We&apos;d love to hear about your
                  project. Feel free to email or give us a call:
                </p>
                <ul>
                  <li>
                    <span>E</span>{" "}
                    <a href="mailto:info@collect.nyc">info@collect.nyc</a>
                  </li>
                  <li>
                    <span>T</span> <a href="tel:7189024911">+1 718 902 4911</a>
                  </li>
                </ul>
              </div>

              {nextProject && (
                <Link
                  className={styles.next_project}
                  href={"/case-study/" + nextProject}
                >
                  See Next Project →
                </Link>
              )}
            </div>
          </div>
        </motion.footer>
        <motion.button
          initial={{ opacity: 1 }}
          animate={isInView ? "hidden" : "visible"}
          transition={{ duration: 0.2 }}
          variants={mobileNavVariants}
          className={styles.mobile_jump}
          onClick={() =>
            animateScrollTo(creditsRef.current, {
              easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
              minDuration: 600,
              speed: 500,
              verticalOffset: -46,
            })
          }
        >
          <div className={styles.holder}>
            <span>View Full Project Info</span>
          </div>
        </motion.button>
      </main>
    </>
  );
};

CaseStudy.Layout = MyLayout;
export default CaseStudy;
