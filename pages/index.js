import { useEffect, useContext } from "react";
import Head from "next/head";
import SharedHead from "../components/SharedHead";
import MyLayout from "../layouts/MyLayout";
import { Client } from "../lib/prismic-config";
import Image from "next/image";
import Link from "next/link";
import _ from "lodash";
import { useRouter } from "next/router";
import MemoryContext from "../components/MemoryContext";
import Footer from "../components/Footer";
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

  const {
    setScrollPos,
    setReturnPage,
    setRunCSFade,
    setCsColor,
    homeScrollPos,
    setHomeScrollPos,
  } = useContext(MemoryContext);

  useEffect(() => {
    // Reset scroll position for Archive Index
    setScrollPos(0);
    setReturnPage(false);

    if (homeScrollPos) {
      window.scrollBy(0, parseInt(homeScrollPos, 10));
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

  // const pageContent = document?.data?.body.map((slice, index) => {
  //   // Render the right markup for the given slice type

  //   // 2up Images Slice
  //   if (slice.slice_type === "2up_images") {
  //     return (
  //       <section
  //         key={index}
  //         className={
  //           slice.primary.vertical_padding === "Default"
  //             ? `${styles.double_image} ${styles.default}`
  //             : slice.primary.vertical_padding === "Half"
  //             ? `${styles.double_image} ${styles.half}`
  //             : slice.primary.vertical_padding === "Extra"
  //             ? `${styles.double_image} ${styles.extra}`
  //             : `${styles.double_image}`
  //         }
  //       >
  //         <div
  //           className={
  //             slice.primary.left_side_gutters
  //               ? `${styles.left_side} ${styles.gutters}`
  //               : `${styles.left_side}`
  //           }
  //         >
  //           {slice.primary.first_image.url ? (
  //             slice.primary.archive_link && slice.primary.archive_link.uid ? (
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
  //                   <Image
  //                     src={slice.primary.first_image.url}
  //                     layout={"responsive"}
  //                     height={slice.primary.first_image.dimensions.height}
  //                     width={slice.primary.first_image.dimensions.width}
  //                     alt={slice.primary.first_image.alt}
  //                     priority
  //                     quality={100}
  //                   />
  //                 </a>
  //               ) : (
  //                 <Link
  //                   href={"/archive/item/" + slice.primary.archive_link.uid}
  //                 >
  //                   <a onClick={() => ScrollTracker()}>
  //                     <Image
  //                       src={slice.primary.first_image.url}
  //                       layout={"responsive"}
  //                       height={slice.primary.first_image.dimensions.height}
  //                       width={slice.primary.first_image.dimensions.width}
  //                       alt={slice.primary.first_image.alt}
  //                       priority
  //                       quality={100}
  //                     />
  //                   </a>
  //                 </Link>
  //               )
  //             ) : (
  //               <Image
  //                 src={slice.primary.first_image.url}
  //                 layout={"responsive"}
  //                 height={slice.primary.first_image.dimensions.height}
  //                 width={slice.primary.first_image.dimensions.width}
  //                 alt={slice.primary.first_image.alt}
  //                 priority
  //                 quality={100}
  //               />
  //             )
  //           ) : null}
  //         </div>
  //         <div
  //           className={
  //             slice.primary.right_side_gutters
  //               ? `${styles.right_side} ${styles.gutters}`
  //               : `${styles.right_side}`
  //           }
  //         >
  //           {slice.primary.second_image.url ? (
  //             slice.primary.archive_link && slice.primary.archive_link.uid ? (
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
  //                   <Image
  //                     src={slice.primary.second_image.url}
  //                     layout={"responsive"}
  //                     height={slice.primary.second_image.dimensions.height}
  //                     width={slice.primary.second_image.dimensions.width}
  //                     alt={slice.primary.second_image.alt}
  //                     priority
  //                     quality={100}
  //                   />
  //                 </a>
  //               ) : (
  //                 <Link
  //                   href={"/archive/item/" + slice.primary.archive_link.uid}
  //                 >
  //                   <a onClick={() => ScrollTracker()}>
  //                     <Image
  //                       src={slice.primary.second_image.url}
  //                       layout={"responsive"}
  //                       height={slice.primary.second_image.dimensions.height}
  //                       width={slice.primary.second_image.dimensions.width}
  //                       alt={slice.primary.second_image.alt}
  //                       priority
  //                       quality={100}
  //                     />
  //                   </a>
  //                 </Link>
  //               )
  //             ) : (
  //               <Image
  //                 src={slice.primary.second_image.url}
  //                 layout={"responsive"}
  //                 height={slice.primary.second_image.dimensions.height}
  //                 width={slice.primary.second_image.dimensions.width}
  //                 alt={slice.primary.second_image.alt}
  //                 priority
  //                 quality={100}
  //               />
  //             )
  //           ) : null}
  //         </div>
  //       </section>
  //     );

  //     // Single Image Slice
  //   } else if (slice.slice_type === "single_image") {
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
  //         {slice.primary.image.url ? (
  //           <figure
  //             className={
  //               slice.primary.full_bleed ? `${styles.full_bleed}` : null
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
  //                   <Image
  //                     src={slice.primary.image.url}
  //                     layout={"responsive"}
  //                     height={slice.primary.image.dimensions.height}
  //                     width={slice.primary.image.dimensions.width}
  //                     alt={slice.primary.image.alt}
  //                     priority
  //                     quality={100}
  //                   />
  //                 </a>
  //               ) : (
  //                 <Link
  //                   href={"/archive/item/" + slice.primary.archive_link.uid}
  //                 >
  //                   <a onClick={() => ScrollTracker()}>
  //                     <Image
  //                       src={slice.primary.image.url}
  //                       layout={"responsive"}
  //                       height={slice.primary.image.dimensions.height}
  //                       width={slice.primary.image.dimensions.width}
  //                       alt={slice.primary.image.alt}
  //                       priority
  //                       quality={100}
  //                     />
  //                   </a>
  //                 </Link>
  //               )
  //             ) : (
  //               <Image
  //                 src={slice.primary.image.url}
  //                 layout={"responsive"}
  //                 height={slice.primary.image.dimensions.height}
  //                 width={slice.primary.image.dimensions.width}
  //                 alt={slice.primary.image.alt}
  //                 priority
  //                 quality={100}
  //               />
  //             )}
  //           </figure>
  //         ) : null}
  //       </section>
  //     );
  //   } else {
  //     return null;
  //   }
  // });

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
            {slice.primary.left_image.url ? (
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
                  </Link>
                )
              ) : (
                <Image
                  src={slice.primary.left_image.url}
                  layout={"responsive"}
                  height={slice.primary.left_image.dimensions.height}
                  width={slice.primary.left_image.dimensions.width}
                  alt={slice.primary.left_image.alt}
                  priority
                  quality={100}
                />
              )
            ) : null}
          </div>
          <div className={`${styles.image} ${styles.right}`}>
            {slice.primary.right_image.url ? (
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
                    <Image
                      src={slice.primary.right_image.url}
                      layout={"responsive"}
                      height={slice.primary.right_image.dimensions.height}
                      width={slice.primary.right_image.dimensions.width}
                      alt={slice.primary.right_image.alt}
                      priority
                      quality={100}
                    />
                  </a>
                ) : (
                  <Link
                    href={
                      "/archive/item/" + slice.primary.archive_link_right.uid
                    }
                  >
                    <a onClick={() => ScrollTracker()}>
                      <Image
                        src={slice.primary.right_image.url}
                        layout={"responsive"}
                        height={slice.primary.right_image.dimensions.height}
                        width={slice.primary.right_image.dimensions.width}
                        alt={slice.primary.right_image.alt}
                        priority
                        quality={100}
                      />
                    </a>
                  </Link>
                )
              ) : (
                <Image
                  src={slice.primary.right_image.url}
                  layout={"responsive"}
                  height={slice.primary.right_image.dimensions.height}
                  width={slice.primary.right_image.dimensions.width}
                  alt={slice.primary.right_image.alt}
                  priority
                  quality={100}
                />
              )
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
          {slice.primary.image.url ? (
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
                    <Image
                      src={slice.primary.image.url}
                      layout={"responsive"}
                      height={slice.primary.image.dimensions.height}
                      width={slice.primary.image.dimensions.width}
                      alt={slice.primary.image.alt}
                      priority
                      quality={100}
                    />
                  </a>
                ) : (
                  <Link
                    href={"/archive/item/" + slice.primary.archive_link.uid}
                  >
                    <a onClick={() => ScrollTracker()}>
                      <Image
                        src={slice.primary.image.url}
                        layout={"responsive"}
                        height={slice.primary.image.dimensions.height}
                        width={slice.primary.image.dimensions.width}
                        alt={slice.primary.image.alt}
                        priority
                        quality={100}
                      />
                    </a>
                  </Link>
                )
              ) : (
                <Image
                  src={slice.primary.image.url}
                  layout={"responsive"}
                  height={slice.primary.image.dimensions.height}
                  width={slice.primary.image.dimensions.width}
                  alt={slice.primary.image.alt}
                  priority
                  quality={100}
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
        <title>Collect NYC</title>
        <meta
          name="description"
          content="Collect NYC is a full-spectrum interdisciplinary creative practice centered in direction, photography, technology and development."
        />
        <SharedHead />
      </Head>

      <main className={styles.main}>
        <div className={styles.divider} />
        {pageContent}

        <Footer />
      </main>
    </div>
  );
};

Home.Layout = MyLayout;
export default Home;
