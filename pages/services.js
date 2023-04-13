import { useState, useRef } from "react";
import { Client } from "../lib/prismic-config";
import Head from "next/head";
import Link from "next/link";
import SharedHead from "../components/SharedHead";
import MyLayout from "../layouts/MyLayout";
import Footer from "../components/Footer";
import { RichText } from "prismic-reactjs";
import Image from "next/image";
import animateScrollTo from "animated-scroll-to";
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

  console.log("Case Studies", caseStudies);

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

        <div className={styles.mobile_jump}>
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
        </div>

        <div className={styles.grid}>
          {/* APPROACH */}
          <div
            ref={approachRef}
            className={`${styles.column} ${styles.approach}`}
          >
            <h2 className={`heading`}>Our Approach</h2>
            <span className={styles.subtitle}>New York, Paris, Chicago</span>
            <p>
              We work with company leaders, business owners and
              singularly-talented artists in the realms of commerce and culture
              to transform ideas in realities.
            </p>
            <p>
              Enterprise clients engage with our studio to solve key issues in
              design and technology, working alongside leadership establish
              brand vision and systems, lorem ipsum dolor sit amet.
            </p>
            <p>
              We partner with artists and creators to create gorgeous objects
              and experiences that resonate with their audiences, from limited
              edition vinyl pressings to art books, printed matter and merch.
            </p>
          </div>

          {/* SERVICES */}
          <div
            ref={servicesRef}
            className={`${styles.column} ${styles.services}`}
          >
            <h3 className={`heading`}>COLLECTED SERVICES</h3>
            <span className={styles.subtitle}>What We Do</span>

            <p>
              We draw on expertise across a range of disciplines, shaping each
              project along lines of design and technology in the service of
              expression and function with teams, skills and scopes tailored to
              each project:
            </p>

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
            <h3 className={`heading`}>In Practice</h3>
            <span className={styles.subtitle}>Outcomes</span>

            <p className={styles.practice_intro}>
              From one-off capsule projects to ongoing retainer relationships,
              case studies demonstrates the craft and consideration that goes
              into every project, regardless of format or scale:
            </p>

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
        <div className={styles.mobilefooter}>
          <Footer />
        </div>
      </main>
    </div>
  );
};

Services.Layout = MyLayout;
export default Services;
