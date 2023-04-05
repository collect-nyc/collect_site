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
import styles from "./Services.module.scss";

export async function getServerSideProps() {
  //Page Data
  const document = await Client().getSingle("profile");

  const page = "services";

  return {
    props: { page, document },
  };
}

const Services = ({ document }) => {
  const inquiryRef = useRef(null);
  const offeringRef = useRef(null);
  const clientsRef = useRef(null);
  const editionsRef = useRef(null);

  // console.log("Profile Content", document.data);
  const page_content = document.data;

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
                animateScrollTo(inquiryRef.current, {
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
                animateScrollTo(offeringRef.current, {
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
                animateScrollTo(clientsRef.current, {
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
          {/* ABOUT */}
          <div className={`${styles.column} ${styles.about} ${styles.desktop}`}>
            <div className={styles.partner}>
              <span className={styles.name}>Andrew J.S.</span>
              <span>{page_content ? page_content.andrew[0].text : null}</span>
            </div>

            <div className={styles.partner}>
              <span className={styles.name}>Joshua Tuscan</span>
              <span>{page_content ? page_content.joshua[0].text : null}</span>
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
            <div className={styles.contact_summary}>
              {page_content ? (
                <RichText render={page_content.instruction} />
              ) : null}
            </div>

            <div className={styles.contact_details}>
              <div className={styles.contact_field}>
                <span>E</span>
                {page_content.email ? page_content.email : null}
              </div>
              <div className={styles.contact_field}>
                <span>T</span>
                <RichText render={page_content.phone} />
              </div>
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
            <h3 className={`heading`}>Offerings</h3>

            <RichText render={page_content.summary} />

            <div ref={clientsRef} className={styles.clients_collabs}>
              <h3 className={`heading`}>Clients, Collaborators</h3>
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
          </div>

          {/* EDITIONS */}
          <div
            ref={editionsRef}
            className={`${styles.column} ${styles.editions}`}
          >
            <figure>
              <EditionsLogo />
            </figure>

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

Services.Layout = MyLayout;
export default Services;
