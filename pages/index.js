import React, { useEffect, useContext, useRef, useMemo, useState } from "react";
import Head from "next/head";
import SharedHead from "../components/SharedHead";
import { client } from "../sanity.config";
import { PortableText } from "@portabletext/react";
import _ from "lodash";
import MemoryContext from "../components/MemoryContext";
import LoaderContext from "../components/LoaderContext";
import HomeFooter from "../components/HomeFooter";
import { motion } from "framer-motion";
import { SITE_NAME } from "../lib/constants";
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
  // console.log("Landing Data", data);
  const { title, metadesc, statement, projects } = data;
  // console.log("featured data", document.data.body1);

  const { archiveCounted, setMobileMenuOpen, setMobileMemory } =
    useContext(MemoryContext);

  const { loaderDidRun } = useContext(LoaderContext);
  const [viewportHeight, setViewportHeight] = useState(null);

  // State to track visibility for each element
  const [projectStates, setProjectStates] = useState(
    projects.map(() => ({ isVisible: false }))
  );

  const toggleVisibility = (index) => {
    setProjectStates((prevStates) =>
      prevStates.map((state, i) =>
        i === index ? { ...state, isVisible: !state.isVisible } : state
      )
    );
  };

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

    setMobileMenuOpen(false);
    setMobileMemory(false);
  }, []);

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
                {/* <Link className={styles.offering_link} href="/services">
                  Our Offerings →
                </Link> */}
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
                          <li key={i}>
                            {i + 1 === project.tags.length ? tag : tag + ","}
                          </li>
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
                      {project.href && (
                        <a href={project.href} target="_blank">
                          {project?.hrefText
                            ? `${project.hrefText} ↗`
                            : "Visit Site ↗"}
                        </a>
                      )}
                    </div>
                  ) : null}
                </header>
                <CardSlider
                  small={project.small}
                  images={project.images}
                  index={i}
                />
              </div>
            );
          })}
        </section>

        <HomeFooter />
        <a
          href={"https://calendly.com/collect-nyc"}
          target="_blank"
          className={styles.mobile_cta}
        >
          Book a New Business Meeting
        </a>
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
      small,
      images[] {
        "url": asset->url,
        "type": asset->mimeType,
        "alt": alt,
      },
      tags,
      hrefText,
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

export default Home;
