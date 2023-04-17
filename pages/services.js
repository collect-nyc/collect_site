import { useRef, useEffect } from "react";
import { Client } from "../lib/prismic-config";
import Head from "next/head";
import Link from "next/link";
import SharedHead from "../components/SharedHead";
import MyLayout from "../layouts/MyLayout";
import HomeFooter from "../components/HomeFooter";
import { RichText } from "prismic-reactjs";
import Image from "next/image";
import animateScrollTo from "animated-scroll-to";
import { useInView, motion } from "framer-motion";
import styles from "./Services.module.scss";

export async function getServerSideProps() {
  //Page Data

  const data = await Client().getSingle("services");

  const projects = await Client().getAllByType("case_study");

  const page = "services";

  return {
    props: { page, data, projects },
  };
}

const Services = ({ data, projects }) => {
  const approachRef = useRef(null);
  const servicesRef = useRef(null);
  const practiceRef = useRef(null);

  const page_data = data.data;
  const caseStudies = projects;

  const footerRef = useRef(null);
  const isInView = useInView(footerRef);

  // useEffect(() => {
  //   if (isInView) {
  //     console.log("Its in View", isInView);
  //   } else {
  //     console.log("Its not in View", isInView);
  //   }
  // }, [isInView]);

  // console.log("Page Data", page_data);
  // console.log("Case Studies", caseStudies);

  // framer motion variants
  const mobileNavVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Agency Services - Collect NEW YORK</title>
        <meta
          name="description"
          content="Collect New York draws on expertise across a range of disciplines, shaping each project along lines of design and technology in the service of expression and function with teams, skills and scopes tailored to each project."
        />
        <SharedHead />
      </Head>

      <main className={styles.main}>
        <div className={styles.info_bar}>
          <span className={styles.desktop}>
            <span className={styles.heading}>Core Capabilities</span>
            <span className={styles.subtitle}>
              Approach, Services, In Practice
            </span>
          </span>
          <span className={styles.mobile_border} />
        </div>

        <motion.div
          initial={{ opacity: 1 }}
          animate={isInView ? "hidden" : "visible"}
          transition={{ duration: 0.2 }}
          variants={mobileNavVariants}
          className={styles.mobile_jump}
        >
          <div className={styles.holder}>
            <button
              onClick={() =>
                animateScrollTo(approachRef.current, {
                  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
                  minDuration: 600,
                  speed: 500,
                  verticalOffset: -48,
                })
              }
            >
              Approach
            </button>
            <button
              onClick={() =>
                animateScrollTo(servicesRef.current, {
                  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
                  minDuration: 600,
                  speed: 500,
                  verticalOffset: -48,
                })
              }
            >
              Services
            </button>
            <button
              onClick={() =>
                animateScrollTo(practiceRef.current, {
                  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
                  minDuration: 600,
                  speed: 500,
                  verticalOffset: -48,
                })
              }
            >
              In Practice
            </button>
          </div>
        </motion.div>

        <div className={styles.grid}>
          {/* APPROACH */}
          <div
            ref={approachRef}
            className={`${styles.column} ${styles.approach}`}
          >
            <h2 className={`heading`}>{page_data.title[0].text}</h2>
            <span className={styles.subtitle}>{page_data.subtitle}</span>
            <RichText render={page_data.description} />
          </div>

          {/* SERVICES */}
          <div
            ref={servicesRef}
            className={`${styles.column} ${styles.services}`}
          >
            <h3 className={`heading`}>{page_data.title2[0].text}</h3>
            <span className={styles.subtitle}>{page_data.subtitle2}</span>

            <RichText render={page_data.description2} />

            <div className={styles.clients_collabs}>
              <h4 className={`heading`}>Creative Direction</h4>
              <p>{page_data.creative_direction_description[0].text}</p>
              <ul className={styles.visual}>
                {page_data?.creative_direction
                  ? page_data.creative_direction.map((offering, key) => (
                      <li key={key}>
                        <RichText render={offering.item} />
                      </li>
                    ))
                  : null}
              </ul>
              <h4 className={`heading ${styles.group}`}>Design</h4>
              <p>{page_data.design_description[0].text}</p>
              <ul className={styles.technical}>
                {page_data?.design
                  ? page_data.design.map((offering, key) => (
                      <li key={key}>
                        <RichText render={offering.item} />
                      </li>
                    ))
                  : null}
              </ul>

              <h4 className={`heading ${styles.group}`}>Technical Direction</h4>
              <p>{page_data.technical_description[0].text}</p>
              <ul className={styles.technical}>
                {page_data?.technical_direction
                  ? page_data.technical_direction.map((offering, key) => (
                      <li key={key}>
                        <RichText render={offering.item} />
                      </li>
                    ))
                  : null}
              </ul>

              <h4 className={`heading ${styles.group}`}>Web Development</h4>
              <p>{page_data.web_description[0].text}</p>
              <ul className={styles.technical}>
                {page_data?.web_development
                  ? page_data.web_development.map((offering, key) => (
                      <li key={key}>
                        <RichText render={offering.item} />
                      </li>
                    ))
                  : null}
              </ul>

              <h4 className={`heading ${styles.group}`}>Photography</h4>
              <p>{page_data.photography_description[0].text}</p>
              <ul className={styles.technical}>
                {page_data?.photography_offerings
                  ? page_data.photography_offerings.map((offering, key) => (
                      <li key={key}>
                        <RichText render={offering.item} />
                      </li>
                    ))
                  : null}
              </ul>

              <h4 className={`heading ${styles.group}`}>Transformation</h4>
              <p>{page_data.transformation_description[0].text}</p>
              <ul className={styles.leadership}>
                {page_data?.transformation_offerings
                  ? page_data.transformation_offerings.map((offering, key) => (
                      <li key={key}>
                        <RichText render={offering.item} />
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>

          {/* IN PRACTICE */}
          <div
            ref={practiceRef}
            className={`${styles.column} ${styles.practice}`}
          >
            <h3 className={`heading`}>{page_data.title1[0].text}</h3>
            <span className={styles.subtitle}>{page_data.subtitle1}</span>

            <div className={styles.practice_intro}>
              <RichText render={page_data.description1} />
            </div>

            <div className={styles.case_studies}>
              {caseStudies && caseStudies.length > 0
                ? caseStudies.map((caseStudy, key) => (
                    <div key={key} className={styles.case_study}>
                      {caseStudy?.data?.index_thumbnail?.url && (
                        <Link
                          className={styles.image_link}
                          href={`/case-study/${caseStudy.uid}`}
                        >
                          <Image
                            className={styles.thumbnail}
                            src={caseStudy.data.index_thumbnail.url}
                            alt={
                              caseStudy?.data?.index_thumbnail?.alt
                                ? caseStudy.data.index_thumbnail.alt
                                : "image from case study"
                            }
                            height={
                              caseStudy.data.index_thumbnail.dimensions.height
                            }
                            width={
                              caseStudy.data.index_thumbnail.dimensions.width
                            }
                          />
                        </Link>
                      )}
                      <h4 className={`heading`}>
                        {caseStudy.data.title[0].text}
                      </h4>
                      <span className={styles.subtitle}>
                        {caseStudy.tags?.map((tag, i, arr) => {
                          if (arr.length - 1 === i) {
                            return <span key={i}>{tag}</span>;
                          } else {
                            return <span key={i}>{tag}, </span>;
                          }
                        })}
                      </span>
                      <p>{caseStudy.data.header_description[0].text}</p>
                      <Link
                        className={styles.text_link}
                        href={`/case-study/${caseStudy.uid}`}
                      >
                        See Case Study →
                      </Link>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>

        {/* REDUCED FOOTER */}
        <div className={styles.minifooter}>
          <Link href="/info/privacy">Privacy</Link>
          <Link href="/info/impressum">Impressum</Link>
        </div>

        {/* FULL FOOTER FOR MOBILE */}
        <div ref={footerRef} className={styles.mobilefooter}>
          <HomeFooter />
        </div>
      </main>
    </div>
  );
};

Services.Layout = MyLayout;
export default Services;
