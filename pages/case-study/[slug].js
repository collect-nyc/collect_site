import React, {
  // useEffect,
  useState,
  // useContext,
  useRef,
  useMemo,
  useEffect,
  // createRef,
} from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";
// import { useRouter } from "next/router";
// import { gql } from "@apollo/client";
// import { motion } from "framer-motion";
import animateScrollTo from "animated-scroll-to";
import SharedHead from "../../components/SharedHead";
import MyLayout from "../../layouts/MyLayout";
// import ProjectViewer from "../../components/ProjectViewer";
import { Client } from "../../lib/prismic-config";
import { SITE_NAME } from "../../lib/constants";
// import MemoryContext from "../../components/MemoryContext";
import { ImageSlider } from "../../components/ImageSlider";
import Slider from "react-slick";
import styles from "./CaseStudy.module.scss";

export async function getStaticProps({ params, preview = false, previewData }) {
  const uid = params.slug;
  const document = await Client().getByUID("case_study", uid);

  const page = "case_study";

  return {
    props: { document, page, revalidate: 10 },
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

const CaseStudy = ({ document }) => {
  console.log(document);

  const {
    body,
    credits,
    project_description,
    header_description,
    hi_res_project_images,
    mobile_images,
    tagline,
    title,
  } = document.data;

  const exploreRef = useRef(null);
  const creditsRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(1);

  const refs = useMemo(() => body?.map(() => React.createRef()), []);

  console.log("REFS", refs);

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1.665,
    slidesToScroll: 1,
    centerMode: true,
    // centerPadding: "50px",
    beforeChange: (current, next) => {
      // const newCurrentIndexes = [...currentIndexes];
      // newCurrentIndexes[index] = next + 1;
      // setCurrentIndexes(newCurrentIndexes);
      setCurrentSlide(next + 1);
    },
  };

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

  useEffect(() => {
    console.log("CURRENT SLIDE", currentSlide - 1);
  }, [currentSlide]);

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
                  <Image
                    src={slice.primary.full_screen_image.url}
                    layout={"responsive"}
                    alt={slice.primary.full_screen_image.alt}
                    height={slice.primary.full_screen_image.dimensions.height}
                    width={slice.primary.full_screen_image.dimensions.width}
                  />
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
                  <Image
                    src={slice.primary.centered_image.url}
                    layout={"responsive"}
                    alt={slice.primary.centered_image.alt}
                    height={slice.primary.centered_image.dimensions.height}
                    width={slice.primary.centered_image.dimensions.width}
                  />
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
                  <Image
                    src={slice.primary.image.url}
                    layout={"responsive"}
                    alt={slice.primary.image.alt}
                    height={slice.primary.image.dimensions.height}
                    width={slice.primary.image.dimensions.width}
                  />
                </figure>
              </section>
            );
          } else if (slice.slice_type === "carousel") {
            return (
              <section
                key={index}
                className={`${styles.section} ${styles.carousel}`}
              >
                <Slider ref={refs[index]} {...settings}>
                  {slice.items.map((item, index) => {
                    return (
                      <div key={index} className={styles.carousel_slide}>
                        <Image
                          src={item.image.url}
                          layout={"responsive"}
                          alt={item.image.alt}
                          height={item.image.dimensions.height}
                          width={item.image.dimensions.width}
                        />
                      </div>
                    );
                  })}
                </Slider>
                <div className={styles.controls}>
                  <div className={styles.holder}>
                    <div className={styles.details}>
                      <span className={styles.numbers}>
                        {currentSlide}/{slice.items.length}
                      </span>
                      <span>{slice.items[currentSlide - 1]?.caption}</span>
                    </div>
                    <ul className={styles.arrows}>
                      <li>
                        <button onClick={() => previousSlidez(index)}>←</button>
                      </li>
                      <li>
                        <button onClick={() => nextSlidez(index)}>→</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            );
          } else {
            return null;
          }
        })
      : null;

  return (
    <>
      <Head>
        <title>
          {title[0].text ? title[0].text : "Case Study"} – {SITE_NAME}
        </title>
        <meta
          name="description"
          content={
            header_description && header_description.length > 0
              ? header_description[0].text
              : "A case study project by Collect NEW YORK."
          }
        />

        <SharedHead />
      </Head>
      <main className={styles.case_study_page}>
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
                      minDuration: 600,
                      speed: 500,
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
                      speed: 500,
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
        <article className={styles.main_content} ref={exploreRef} id="explore">
          {SliceZone}
        </article>
        <footer className={styles.credits_section} ref={creditsRef} id="info">
          <div className={styles.description}>
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
                  <span>T</span> +1 718 902 4911
                </li>
              </ul>
            </div>
            {/* <Link href={}><a>See Next Project →</a></Link> */}
          </div>
        </footer>
      </main>
    </>
  );
};

CaseStudy.Layout = MyLayout;
export default CaseStudy;
