import { useState, useRef } from "react";
import { Client } from "../lib/prismic-config";
import Head from "next/head";
import Link from "next/link";
import SharedHead from "../components/SharedHead";
import MyLayout from "../layouts/MyLayout";
import Footer from "../components/Footer";
import { RichText } from "prismic-reactjs";
import EditionsLogo from "../svg/editions.svg";
import animateScrollTo from "animated-scroll-to";
import styles from "./About.module.scss";

export async function getServerSideProps() {
  //Page Data
  const document = await Client().getSingle("profile");

  const page = "about";

  return {
    props: { page, document },
  };
}

const About = ({ document }) => {
  const inquiryRef = useRef(null);
  const offeringRef = useRef(null);
  const clientsRef = useRef(null);
  const editionsRef = useRef(null);

  // console.log("Profile Content", document.data);
  const page_content = document.data;

  return (
    <div className={styles.container}>
      <Head>
        <title>About Collect NEW YORK</title>
        <meta name="description" content="Contact, Clients, Updates and More" />
        <SharedHead />
      </Head>

      <main className={styles.main}>
        <div className={styles.info_bar}>
          <span className={styles.desktop}>
            <span className={styles.heading}>Information</span>
            <span className={styles.subtitle}>
              Contact, Clients, Updates and More
            </span>
          </span>
        </div>

        <div className={styles.mobile_jump}>
          <div className={styles.holder}>
            <button
              onClick={() =>
                animateScrollTo(inquiryRef.current, {
                  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
                  minDuration: 600,
                  speed: 500,
                  verticalOffset: -97,
                })
              }
            >
              Inquiries
            </button>
            <button
              onClick={() =>
                animateScrollTo(offeringRef.current, {
                  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
                  minDuration: 600,
                  speed: 500,
                  verticalOffset: -97,
                })
              }
            >
              Clients
            </button>
            <button
              onClick={() =>
                animateScrollTo(editionsRef.current, {
                  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
                  minDuration: 600,
                  speed: 500,
                  verticalOffset: -97,
                })
              }
            >
              Éditions
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {/* ABOUT */}
          <div className={`${styles.column} ${styles.about} ${styles.desktop}`}>
            <h3 className={`heading`}>Our Team</h3>
            <span className={styles.subtitle}>New York, Paris, Chicago</span>
            <div className={styles.partner}>
              <span className={styles.name}>Andrew J.S.</span>
              <span>{page_content ? page_content.andrew[0].text : null}</span>
            </div>

            <div className={styles.partner}>
              <span className={styles.name}>Joshua Tuscan</span>
              <span>{page_content ? page_content.joshua[0].text : null}</span>
            </div>

            <div className={styles.partner}>
              <span className={styles.name}>Luke Robertson</span>
              <span>
                <a href="https://luke-robertson.com" target="_blank">
                  Independent Art Director ↗
                </a>
              </span>
            </div>

            <div className={styles.insta_group}>
              <ul className="insta">
                {page_content
                  ? page_content.instagrams.map((handle, key) => (
                      <li key={key}>
                        <RichText render={handle.item} />
                      </li>
                    ))
                  : null}
              </ul>
            </div>

            <div className={styles.socials_group}>
              <ul className={styles.socials}>
                {page_content
                  ? page_content.socials.map((handle, key) => (
                      <li key={key}>
                        <RichText render={handle.item} />
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>

          {/* CONTACT */}
          <div
            ref={inquiryRef}
            className={`${styles.column} ${styles.contact}`}
          >
            <h2 className={`heading`}>Inquiries</h2>
            <span className={styles.subtitle}>New Business</span>
            <div className={styles.contact_summary}>
              {page_content ? (
                <RichText render={page_content.instruction} />
              ) : null}
            </div>

            <div className={styles.contact_details}>
              <div className={styles.contact_field}>
                {page_content.email ? page_content.email : null}
              </div>
              <div className={styles.contact_field}>
                <RichText render={page_content.phone} />
              </div>
            </div>

            <div className={styles.contact_collab}>
              <h2 className={`heading`}>Opportunities</h2>
              <span className={styles.subtitle}>Work with Us</span>

              <p>For freelance opportunities send your work or DM:</p>

              <ul>
                <li>
                  <a href="mailto:new@collect.nyc">new@collect.nyc</a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/collect.nyc/"
                    target="_blank"
                  >
                    @collect.nyc
                  </a>
                </li>
              </ul>
            </div>

            <div
              className={`${styles.column} ${styles.about} ${styles.mobile}`}
            >
              <div className={styles.partner}>
                <span className={styles.name}>Andrew J.S.</span>
                <span>{page_content ? page_content.andrew[0].text : null}</span>
              </div>

              <div className={styles.partner}>
                <span className={styles.name}>Joshua Tuscan</span>
                <span>{page_content ? page_content.joshua[0].text : null}</span>
              </div>

              <div className={styles.partner}>
                <span className={styles.name}>Luke Robertson</span>
                <span>
                  <a href="https://luke-robertson.com" target="_blank">
                    Independent Art Director ↗
                  </a>
                </span>
              </div>

              <div className={styles.insta_group}>
                <ul className="insta">
                  {page_content
                    ? page_content.instagrams.map((handle, key) => (
                        <li key={key}>
                          <RichText render={handle.item} />
                        </li>
                      ))
                    : null}
                </ul>
              </div>

              <div className={styles.socials_group}>
                <ul className={styles.socials}>
                  {page_content
                    ? page_content.socials.map((handle, key) => (
                        <li key={key}>
                          <RichText render={handle.item} />
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            </div>
          </div>

          {/* OFFERING */}
          <div
            ref={offeringRef}
            className={`${styles.column} ${styles.offering}`}
          >
            <h3 className={`heading`}>CLIENTS, COLLABORATORS</h3>
            <span className={styles.subtitle}>Culture and Commerce</span>

            <RichText render={page_content.summary} />

            <div ref={clientsRef} className={styles.clients_collabs}>
              <ul>
                {page_content
                  ? page_content.clients_and_collaborators.map(
                      (client, key) => (
                        <li key={key}>
                          <RichText render={client.item} />
                        </li>
                      )
                    )
                  : null}
              </ul>
            </div>
            {page_content.client_case_studies?.length > 0 && (
              <div className={styles.clients_cases}>
                <h3 className={`heading`}>RECENT WORK</h3>
                <span className={styles.subtitle}>New Projects</span>

                {page_content.client_case_studies.map((case_study, key) => (
                  <div key={key} className={styles.case_study}>
                    <h4 className={`heading`}>{case_study.title[0].text}</h4>
                    <p>{case_study.description}</p>
                    {case_study.link && case_study.link.link_type === "Web" ? (
                      <a href={case_study.link.url}>See Project→</a>
                    ) : (
                      <Link href={"/case-study/" + case_study.link.uid}>
                        See Project→
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* EDITIONS */}
          <div
            ref={editionsRef}
            className={`${styles.column} ${styles.editions}`}
          >
            <h3 className={`heading`}>Éditions</h3>
            <span className={styles.subtitle}>Fall 2023</span>

            {page_content.editions_text ? (
              <RichText render={page_content.editions_text} />
            ) : null}

            <a
              href={
                page_content.editions_link.url
                  ? page_content.editions_link.url
                  : "https://www.instagram.com/shop.editions/"
              }
              target="_blank"
              rel="noreferrer"
            >
              {page_content.editions_link_text
                ? page_content.editions_link_text
                : null}
            </a>
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

About.Layout = MyLayout;
export default About;
