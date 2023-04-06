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
  const document = await Client().getSingle("profile");

  const projects = await Client().getAllByType("case_study");

  const page = "services";

  return {
    props: { page, document, projects },
  };
}

const Services = ({ document, projects }) => {
  const approachRef = useRef(null);
  const servicesRef = useRef(null);
  const practiceRef = useRef(null);

  // console.log("Profile Content", document.data);
  const page_content = document.data;
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
            Approach, Services, In Practice
          </span>
          <div className={styles.mobile_jump}>
            <button
              onClick={() =>
                animateScrollTo(approachRef.current, {
                  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
                  minDuration: 600,
                  speed: 500,
                  verticalOffset: -97,
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
                  verticalOffset: -97,
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
                  verticalOffset: -97,
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
              <p>
                Working alongside our clients to establish vision, visual
                identity, voice and tone, positioning, differentiators and more:
              </p>
              <ul className={styles.visual}>
                {page_content
                  ? page_content.visual_offerings.map((offering, key) => (
                      <li key={key}>
                        <RichText render={offering.item} />
                      </li>
                    ))
                  : null}
              </ul>
              <h4 className={`heading ${styles.group}`}>Design</h4>
              <p>
                The work that brings direction to life, cataloguing visual
                styles and bringing projects to life as
              </p>
              <ul className={styles.technical}>
                {page_content
                  ? page_content.technical_offerings.map((offering, key) => (
                      <li key={key}>
                        <RichText render={offering.item} />
                      </li>
                    ))
                  : null}
              </ul>

              <h4 className={`heading ${styles.group}`}>Technical Direction</h4>
              <p>
                Our approach to technical craft is rooted in design and
                creativity partnered with first class engineering rigor allows
                us to plan, prototype and build digital experiences that live up
                to the highest of expectations.
              </p>
              <ul className={styles.technical}>
                {page_content
                  ? page_content.technical_offerings.map((offering, key) => (
                      <li key={key}>
                        <RichText render={offering.item} />
                      </li>
                    ))
                  : null}
              </ul>

              <h4 className={`heading ${styles.group}`}>Leadership</h4>
              <p>
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
              </p>
              <ul className={styles.leadership}>
                {page_content
                  ? page_content.leadership_offerings.map((offering, key) => (
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

            <p>
              From one-off capsule projects to ongoing retainer relationships,
              case studies demonstrates the craft and consideration that goes
              into every project, regardless of format or scale:
            </p>

            <div className={styles.case_studies}>
              {caseStudies && caseStudies.length > 0
                ? caseStudies.map((caseStudy, key) => (
                    <div key={key} className={styles.case_study}>
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
