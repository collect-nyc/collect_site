import React, { useEffect, useContext, useRef, useMemo, useState } from "react";
import Head from "next/head";
import SharedHead from "../components/SharedHead";
import MyLayout from "../layouts/MyLayout";
import { client } from "../sanity.config";
import { PortableText } from "@portabletext/react";
import _ from "lodash";
import MemoryContext from "../components/MemoryContext";
import LoaderContext from "../components/LoaderContext";
import HomeFooter from "../components/HomeFooter";
import Slider from "react-slick";
import { motion } from "framer-motion";
// import Marquee from "react-fast-marquee";
import VideoPlayer from "../components/common/VideoPlayer";
import FeaturedSlider from "../components/FeaturedSlider";
import animateScrollTo from "animated-scroll-to";
import { SITE_NAME } from "../lib/constants";
import Link from "next/link";
import CardSlider from "@/components/common/CardSlider";
import styles from "./Index.module.scss";

function vh(percent) {
  var h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return (percent * h) / 100;
}

const Home = ({ data }) => {
  console.log("Landing Data", data);

  const { title, metadesc, statement, projects } = data;
  // console.log("featured data", document.data.body1);

  const { archiveCounted } = useContext(MemoryContext);

  const { loaderDidRun } = useContext(LoaderContext);

  // State to track visibility for each element
  const [projectStates, setProjectStates] = useState(
    projects.map(() => ({ isVisible: false }))
  );

  // Array of refs, one for each element
  const sliderRefs = useRef(projects.map(() => React.createRef()));

  useEffect(() => {
    // Example: Log the references
    console.log(sliderRefs.current);
    console.log("test", sliderRefs.current[0]);
  }, []);

  const toggleVisibility = (index) => {
    setProjectStates((prevStates) =>
      prevStates.map((state, i) =>
        i === index ? { ...state, isVisible: !state.isVisible } : state
      )
    );
  };

  // console.log("loader did run", loaderDidRun);

  const refs = useMemo(() => projects?.map(() => React.createRef()), []);

  // const [currentIndexes, setCurrentIndexes] = useState(
  //   Array(document?.data?.body1.length).fill(1)
  // );

  // const [isScrolling, setIsScrolling] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(null);

  useEffect(() => {
    // console.log("Landing Data", document.data);

    if (!loaderDidRun) {
      // window.document.body.className = "noscroll";

      setTimeout(() => {
        // document.body.classList.add("noscroll");
        window.scrollTo(0, 0);
      }, 100);
    }

    // get half the viewport height in pixels
    setViewportHeight(vh(50));
  }, []);

  // const featureContent = document?.data?.body1?.map((slice, index) => {
  //   if (
  //     slice.primary.case_study_link &&
  //     slice.primary.case_study_link.data &&
  //     slice.primary.case_study_link.data.images &&
  //     slice.primary.case_study_link.data.images.length > 0
  //   ) {
  //     return (
  //       <section
  //         key={index}
  //         className={`${styles.feature} ${
  //           slice.primary.position === "Left"
  //             ? styles.left
  //             : slice.primary.position === "Right"
  //             ? styles.right
  //             : styles.center
  //         }`}
  //         id={"feature-" + (index + 1)}
  //       >
  //         <div
  //           className={
  //             slice.primary.width === "7"
  //               ? `${styles.media_container} ${styles.seven_col}`
  //               : slice.primary.width === "8"
  //               ? `${styles.media_container}  ${styles.eight_col}`
  //               : slice.primary.width === "Square"
  //               ? `${styles.media_container}  ${styles.square}`
  //               : `${styles.media_container}  ${styles.seven_col}`
  //           }
  //           onClick={() => {
  //             slice.items &&
  //             slice.items.length > 0 &&
  //             slice.items[0].external_link.url &&
  //             slice.primary.case_study_link.data.images.length < 2
  //               ? window.open(slice.items[0].external_link.url, "_blank")
  //               : () => {
  //                   return false;
  //                 };
  //           }}
  //         >
  //           <div
  //             className={`${styles.inner} ${
  //               slice.items &&
  //               slice.items.length > 0 &&
  //               slice.items[0].external_link.url &&
  //               slice.primary.case_study_link.data.images.length < 2
  //                 ? styles.link_style
  //                 : null
  //             }`}
  //           >
  //             {slice.primary.case_study_link.data &&
  //             slice.primary.case_study_link.data.images.length > 1 ? (
  //               <FeaturedSlider
  //                 refs={refs}
  //                 images={slice.primary.case_study_link.data.images}
  //                 index={index}
  //                 currentIndexes={currentIndexes}
  //                 setCurrentIndexes={setCurrentIndexes}
  //               />
  //             ) : slice.primary.case_study_link.data &&
  //               slice.primary.case_study_link.data.images[0].video &&
  //               slice.primary.case_study_link.data.images[0].video.url ? (
  //               <VideoPlayer
  //                 source={
  //                   slice.primary.case_study_link.data.images[0].video.url
  //                 }
  //               />
  //             ) : slice.primary.case_study_link.data &&
  //               slice.primary.case_study_link.data.images[0].image &&
  //               slice.primary.case_study_link.data.images[0].image.url ? (
  //               <Image
  //                 src={slice.primary.case_study_link.data.images[0].image.url}
  //                 alt={slice.primary.case_study_link.data.images[0].image.alt}
  //                 height={
  //                   slice.primary.case_study_link.data.images[0].image
  //                     .dimensions.height
  //                 }
  //                 width={
  //                   slice.primary.case_study_link.data.images[0].image
  //                     .dimensions.width
  //                 }
  //                 layout={"responsive"}
  //                 priority
  //                 quality={100}
  //               />
  //             ) : (
  //               <h1>No images in media tab</h1>
  //             )}
  //           </div>
  //           {slice.primary.case_study_link &&
  //           slice.primary.case_study_link.data &&
  //           slice.primary.case_study_link.data.images &&
  //           slice.primary.case_study_link.data.images.length > 1 ? (
  //             <span
  //               className={`${styles.slide_count} ${
  //                 !isScrolling && styles.hide
  //               }`}
  //             >
  //               {currentIndexes[index]}&nbsp;/&nbsp;
  //               {slice.primary.case_study_link.data.images.length}
  //             </span>
  //           ) : null}
  //         </div>
  //         <header
  //           className={`${styles.details} ${
  //             slice.primary.external_link && slice.primary.external_link.url
  //               ? styles.link
  //               : null
  //           }`}
  //         >
  //           <div className={styles.text}>
  //             <span className={styles.title}>
  //               {slice.primary.case_study_link.data?.title[0]?.text}
  //             </span>
  //             <span className={styles.tags}>
  //               {slice.primary.case_study_link.tags?.map((tag, i, arr) => {
  //                 if (arr.length - 1 === i) {
  //                   return <span key={i}>{tag}</span>;
  //                 } else {
  //                   return <span key={i}>{tag}, </span>;
  //                 }
  //               })}
  //             </span>
  //             <p>{slice.primary.case_study_link.data.description[0].text}</p>

  //             <div className={styles.links}>
  //               {/* Add external links if they exist */}
  //               {slice.items &&
  //               slice.items.length > 0 &&
  //               slice.items[0].external_link.url
  //                 ? slice.items.map((item, i) => {
  //                     return (
  //                       <a
  //                         className={styles.external_link}
  //                         href={item.external_link.url}
  //                         target="_blank"
  //                         rel="noreferrer"
  //                         key={i}
  //                       >
  //                         {item.external_link_text
  //                           ? item.external_link_text
  //                           : "Learn More"}
  //                       </a>
  //                     );
  //                   })
  //                 : null}

  //               {/* Add internal full case study link if it exists */}
  //               {slice.primary.full_case_study?.slug && (
  //                 <Link
  //                   href={`/case-study/${slice.primary.full_case_study.slug}`}
  //                   className={styles.external_link}
  //                 >
  //                   View Case Study→
  //                 </Link>
  //               )}
  //             </div>
  //           </div>
  //           <div className={styles.external_links_group}>
  //             {/* bottom of text area */}
  //           </div>
  //         </header>
  //         <div className={styles.divider} />
  //       </section>
  //     );
  //   } else {
  //     return null;
  //   }
  // });

  // const pageContent = document?.data?.body.map((slice, index) => {
  //   // Render the right markup for the given slice type

  //   // 2up Images Slice
  //   if (slice.slice_type === "2up_row") {
  //     return (
  //       <section
  //         key={index}
  //         className={`${styles.double_image} ${
  //           slice.primary.alignment === "Top" ? styles.top : styles.bottom
  //         } ${
  //           slice.primary.gutter === "None" ? styles.no_gutter : styles.gutter
  //         } ${
  //           slice.primary.size === "Even"
  //             ? styles.even
  //             : slice.primary.size === "7/5"
  //             ? styles.seven_five
  //             : slice.primary.size === "5/7"
  //             ? styles.five_seven
  //             : slice.primary.size === "8/4"
  //             ? styles.eight_four
  //             : styles.four_eight
  //         }`}
  //       >
  //         <div className={`${styles.image} ${styles.left}`}>
  //           {slice.primary.left_image.url || slice.primary.left_video.url ? (
  //             slice.primary.archive_link_left &&
  //             slice.primary.archive_link_left.uid ? (
  //               slice.primary.archive_link_left.data?.item_type ===
  //                 "Case Study" &&
  //               slice.primary.archive_link_left.data?.background_color ? (
  //                 <a
  //                   onClick={
  //                     slice.primary.archive_link_left.data?.item_type ===
  //                       "Case Study" &&
  //                     slice.primary.archive_link_left.data?.background_color
  //                       ? () =>
  //                           EnterCaseStudy(
  //                             slice.primary.archive_link_left.data
  //                               ?.background_color,
  //                             "/archive/item/" +
  //                               slice.primary.archive_link_left.uid
  //                           )
  //                       : null
  //                   }
  //                 >
  //                   <Image
  //                     src={slice.primary.left_image.url}
  //                     layout={"responsive"}
  //                     height={slice.primary.left_image.dimensions.height}
  //                     width={slice.primary.left_image.dimensions.width}
  //                     alt={slice.primary.left_image.alt}
  //                     priority
  //                     quality={100}
  //                   />
  //                 </a>
  //               ) : (
  //                 <Link
  //                   href={
  //                     "/archive/item/" + slice.primary.archive_link_left.uid
  //                   }
  //                 >
  //                   {slice.primary?.left_image?.url ? (
  //                     <Image
  //                       src={slice.primary.left_image.url}
  //                       layout={"responsive"}
  //                       height={slice.primary.left_image.dimensions.height}
  //                       width={slice.primary.left_image.dimensions.width}
  //                       alt={slice.primary.left_image.alt}
  //                       priority
  //                       quality={100}
  //                     />
  //                   ) : slice.primary.left_video?.url ? (
  //                     <video playsInline loop autoPlay muted>
  //                       <source
  //                         src={slice.primary.left_video.url}
  //                         type="video/mp4"
  //                       />
  //                     </video>
  //                   ) : null}
  //                 </Link>
  //               )
  //             ) : slice.primary?.left_image?.url ? (
  //               <Image
  //                 src={slice.primary.left_image.url}
  //                 layout={"responsive"}
  //                 height={slice.primary.left_image.dimensions.height}
  //                 width={slice.primary.left_image.dimensions.width}
  //                 alt={slice.primary.left_image.alt}
  //                 priority
  //                 quality={100}
  //               />
  //             ) : slice.primary.left_video?.url ? (
  //               <video playsInline loop autoPlay muted>
  //                 <source src={slice.primary.left_video.url} type="video/mp4" />
  //               </video>
  //             ) : null
  //           ) : null}
  //         </div>
  //         <div className={`${styles.image} ${styles.right}`}>
  //           {slice.primary.right_image.url || slice.primary.right_video.url ? (
  //             slice.primary.archive_link_right &&
  //             slice.primary.archive_link_right.uid ? (
  //               slice.primary.archive_link_right.data?.item_type ===
  //                 "Case Study" &&
  //               slice.primary.archive_link_right.data?.background_color ? (
  //                 <a
  //                   onClick={
  //                     slice.primary.archive_link_right.data?.item_type ===
  //                       "Case Study" &&
  //                     slice.primary.archive_link_right.data?.background_color
  //                       ? () =>
  //                           EnterCaseStudy(
  //                             slice.primary.archive_link_right.data
  //                               ?.background_color,
  //                             "/archive/item/" +
  //                               slice.primary.archive_link_right.uid
  //                           )
  //                       : null
  //                   }
  //                 >
  //                   {slice.primary?.right_image?.url ? (
  //                     <Image
  //                       src={slice.primary.right_image.url}
  //                       layout={"responsive"}
  //                       height={slice.primary.right_image.dimensions.height}
  //                       width={slice.primary.right_image.dimensions.width}
  //                       alt={slice.primary.right_image.alt}
  //                       priority
  //                       quality={100}
  //                     />
  //                   ) : slice.primary.right_video?.url ? (
  //                     <video playsInline loop autoPlay muted>
  //                       <source
  //                         src={slice.primary.right_video.url}
  //                         type="video/mp4"
  //                       />
  //                     </video>
  //                   ) : null}
  //                 </a>
  //               ) : (
  //                 <Link
  //                   href={
  //                     "/archive/item/" + slice.primary.archive_link_right.uid
  //                   }
  //                 >
  //                   {slice.primary?.right_image?.url ? (
  //                     <Image
  //                       src={slice.primary.right_image.url}
  //                       layout={"responsive"}
  //                       height={slice.primary.right_image.dimensions.height}
  //                       width={slice.primary.right_image.dimensions.width}
  //                       alt={slice.primary.right_image.alt}
  //                       priority
  //                       quality={100}
  //                     />
  //                   ) : slice.primary.right_video?.url ? (
  //                     <video playsInline loop autoPlay muted>
  //                       <source
  //                         src={slice.primary.right_video.url}
  //                         type="video/mp4"
  //                       />
  //                     </video>
  //                   ) : null}
  //                 </Link>
  //               )
  //             ) : slice.primary?.right_image?.url ? (
  //               <Image
  //                 src={slice.primary.right_image.url}
  //                 layout={"responsive"}
  //                 height={slice.primary.right_image.dimensions.height}
  //                 width={slice.primary.right_image.dimensions.width}
  //                 alt={slice.primary.right_image.alt}
  //                 priority
  //                 quality={100}
  //               />
  //             ) : slice.primary.right_video?.url ? (
  //               <video playsInline loop autoPlay muted>
  //                 <source
  //                   src={slice.primary.right_video.url}
  //                   type="video/mp4"
  //                 />
  //               </video>
  //             ) : null
  //           ) : null}
  //         </div>
  //       </section>
  //     );

  //     // Full Image Slice
  //   } else if (slice.slice_type === "full") {
  //     return (
  //       <section
  //         key={index}
  //         className={
  //           slice.primary.vertical_padding === "Default"
  //             ? `${styles.single_image} ${styles.default}`
  //             : slice.primary.vertical_padding === "Half"
  //             ? `${styles.single_image} ${styles.half}`
  //             : slice.primary.vertical_padding === "Extra"
  //             ? `${styles.single_image} ${styles.extra}`
  //             : `${styles.single_image}`
  //         }
  //       >
  //         {slice.primary.image.url || slice.primary.video.url ? (
  //           <figure
  //             className={
  //               slice.primary.gutter == "Gutter" ? null : `${styles.full_bleed}`
  //             }
  //           >
  //             {slice.primary.archive_link && slice.primary.archive_link.uid ? (
  //               slice.primary.archive_link.data?.item_type === "Case Study" &&
  //               slice.primary.archive_link.data?.background_color ? (
  //                 <a
  //                   onClick={
  //                     slice.primary.archive_link.data?.item_type ===
  //                       "Case Study" &&
  //                     slice.primary.archive_link.data?.background_color
  //                       ? () =>
  //                           EnterCaseStudy(
  //                             slice.primary.archive_link.data?.background_color,
  //                             "/archive/item/" + slice.primary.archive_link.uid
  //                           )
  //                       : null
  //                   }
  //                 >
  //                   {slice.primary.image?.url ? (
  //                     <Image
  //                       src={slice.primary.image.url}
  //                       layout={"responsive"}
  //                       height={slice.primary.image.dimensions.height}
  //                       width={slice.primary.image.dimensions.width}
  //                       alt={slice.primary.image.alt}
  //                       priority
  //                       quality={100}
  //                     />
  //                   ) : slice.primary.video?.url ? (
  //                     <video playsInline loop autoPlay muted>
  //                       <source
  //                         src={slice.primary.video.url}
  //                         type="video/mp4"
  //                       />
  //                     </video>
  //                   ) : null}
  //                 </a>
  //               ) : (
  //                 <Link
  //                   href={"/archive/item/" + slice.primary.archive_link.uid}
  //                 >
  //                   {slice.primary.image?.url ? (
  //                     <Image
  //                       src={slice.primary.image.url}
  //                       layout={"responsive"}
  //                       height={slice.primary.image.dimensions.height}
  //                       width={slice.primary.image.dimensions.width}
  //                       alt={slice.primary.image.alt}
  //                       priority
  //                       quality={100}
  //                     />
  //                   ) : slice.primary.video?.url ? (
  //                     <video playsInline loop autoPlay muted>
  //                       <source
  //                         src={slice.primary.video.url}
  //                         type="video/mp4"
  //                       />
  //                     </video>
  //                   ) : null}
  //                 </Link>
  //               )
  //             ) : slice.primary.image?.url ? (
  //               <Image
  //                 src={slice.primary.image.url}
  //                 layout={"responsive"}
  //                 height={slice.primary.image.dimensions.height}
  //                 width={slice.primary.image.dimensions.width}
  //                 alt={slice.primary.image.alt}
  //                 priority
  //                 quality={100}
  //               />
  //             ) : slice.primary.video?.url ? (
  //               <video playsInline loop autoPlay muted>
  //                 <source src={slice.primary.video.url} type="video/mp4" />
  //               </video>
  //             ) : null}
  //           </figure>
  //         ) : null}
  //       </section>
  //     );
  //   } else {
  //     return null;
  //   }
  // });

  const loaderVariants = {
    hide: {
      opacity: 0,
      top: viewportHeight && `${viewportHeight - 49} + "px"`,
      transition: {
        opacity: {
          duration: 0,
          ease: "linear",
        },
        top: {
          duration: 0,
          ease: "linear",
        },
      },
    },
    show: {
      opacity: 1,
      top: "0px",
      transition: {
        opacity: {
          duration: 0.3,
          ease: "linear",
          delay: 0.5,
        },
        top: {
          duration: 1,
          delay: 1,
        },
      },
    },
    normal: {
      opacity: 1,
      top: "0px",
      transition: {
        opacity: {
          duration: 0,
          ease: "linear",
          delay: 0,
        },
        top: {
          duration: 0,
          delay: 0,
        },
      },
    },
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{title ? title : `${SITE_NAME}`}</title>
        <meta
          name="description"
          content={
            metadesc
              ? metadesc
              : "Independent agency for NEW IDEAS in direction, design, technology and development."
          }
        />

        <meta property="og:title" content={title ? title : `${SITE_NAME}`} />
        <meta
          property="og:description"
          content={
            metadesc
              ? metadesc
              : "Independent agency for NEW IDEAS in direction, design, technology and development."
          }
        />
        <meta
          property="og:image"
          content={"https://collect.nyc/images/collect-new-york-og.jpg"}
        />

        <SharedHead />
      </Head>

      <motion.main
        initial={!loaderDidRun ? { opacity: 0 } : { opacity: 1 }}
        animate={
          !archiveCounted && !loaderDidRun
            ? "hide"
            : archiveCounted && !loaderDidRun
            ? "show"
            : "normal"
        }
        variants={loaderVariants}
        className={`${styles.main} ${
          !loaderDidRun ? styles.loading : styles.loading
        }`}
      >
        <section className={styles.statement}>
          <div className={styles.textbox}>
            {statement ? (
              <>
                <PortableText value={statement} />
                <Link className={styles.offering_link} href="/services">
                  Our Offerings →
                </Link>
              </>
            ) : null}
          </div>
        </section>
        <section className={styles.projects}>
          {projects?.map((project, i) => {
            return (
              <div className={styles.project} key={i}>
                <header>
                  <h2>{project.title}</h2>
                  {projectStates[i].isVisible ? null : (
                    <>
                      <ul className={styles.tags}>
                        {project.tags?.map((tag, i) => (
                          <li key={i}>{tag}</li>
                        ))}
                      </ul>
                      <button
                        className={styles.readmore}
                        onClick={() => toggleVisibility(i)}
                      >
                        Read More +
                      </button>
                    </>
                  )}

                  {projectStates[i].isVisible ? (
                    <div className={styles.reveal}>
                      {project.description && (
                        <PortableText value={project.description} />
                      )}

                      <button onClick={() => toggleVisibility(i)}>
                        Read Less -
                      </button>
                      {project.href && <a href={project.href}>Visit Site ↗</a>}
                    </div>
                  ) : null}
                </header>
                <CardSlider images={project.images} index={i} />
              </div>
            );
          })}
        </section>

        <HomeFooter />
      </motion.main>
    </div>
  );
};

export async function getServerSideProps() {
  const document = await client.fetch(`*[_type == "home"]{
    title,
    metadesc,
    statement,
    "projects": projects[]->{
      title,
      description,
      images[] {
        "url": asset->url,
        "alt": alt,
      },
      tags,
      href,
    }
  }`);
  const data = document[0];

  const page = "index";

  return {
    props: {
      data,
      page,
    },
  };
}

Home.Layout = MyLayout;
export default Home;
