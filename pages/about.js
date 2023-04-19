import { useRef } from "react";
import { Client } from "../lib/prismic-config";
import Head from "next/head";
import Link from "next/link";
import SharedHead from "../components/SharedHead";
import MyLayout from "../layouts/MyLayout";
import HomeFooter from "../components/HomeFooter";
import { RichText } from "prismic-reactjs";
import animateScrollTo from "animated-scroll-to";
import { useInView, motion } from "framer-motion";
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

  const footerRef = useRef(null);
  const isInView = useInView(footerRef);

  // console.log("Profile Content", document.data);
  const page_content = document.data;

  // framer motion variants
  const mobileNavVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

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
                animateScrollTo(inquiryRef.current, {
                  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
                  minDuration: 600,
                  speed: 500,
                  verticalOffset: -48,
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
                  verticalOffset: -48,
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
                  verticalOffset: -48,
                })
              }
            >
              Éditions
            </button>
          </div>
        </motion.div>

        <div className={styles.grid}>
          {/* ABOUT */}
          <div className={`${styles.column} ${styles.about} ${styles.desktop}`}>
            <h3 className={`heading`}>{page_content.team_title[0].text}</h3>
            <span className={styles.subtitle}>
              {page_content.our_team_subtitle}
            </span>
            <div className={styles.partner}>
              <span className={styles.name}>Andrew J.S.</span>
              <span>{page_content ? page_content.andrew[0].text : null}</span>
            </div>

            <div className={styles.partner}>
              <span className={styles.name}>Joshua Tuscan</span>
              <span>{page_content ? page_content.joshua[0].text : null}</span>
            </div>

            <div className={styles.partners_section}>
              <h3 className={`heading`}>
                {page_content.partners_title[0].text}
              </h3>
              <span className={styles.subtitle}>
                {page_content.partners_subtitle}
              </span>

              <div className={styles.partner}>
                <span className={styles.name}>Luke Robertson</span>
                <span>
                  <a href="https://luke-robertson.com" target="_blank">
                    {page_content
                      ? page_content.luke[0].text
                      : "Independent Art Director ↗"}
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <div
            ref={inquiryRef}
            className={`${styles.column} ${styles.contact}`}
          >
            <h2 className={`heading`}>
              {page_content.inquiries_title[0].text}
            </h2>
            <span className={styles.subtitle}>
              {page_content.inquiries_subtitle}
            </span>
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
              <h2 className={`heading`}>
                {page_content.opportunities_title[0].text}
              </h2>
              <span className={styles.subtitle}>
                {page_content.opportunities_subtitle}
              </span>

              <RichText render={page_content.opportunities_description} />

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

            <div className={styles.follow_section}>
              <h2 className={`heading`}>{page_content.follow_title[0].text}</h2>
              <span className={styles.subtitle}>
                {page_content.follow_subtitle}
              </span>
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
            <h3 className={`heading`}>{page_content.clients_title[0].text}</h3>
            <span className={styles.subtitle}>
              {page_content.clients_subtitle}
            </span>

            <RichText render={page_content.clients_description} />

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
                <h3 className={`heading`}>
                  {page_content.recent_work_title[0].text}
                </h3>
                <span className={styles.subtitle}>
                  {page_content.recent_work_subtitle}
                </span>

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
            <h3 className={`heading`}>{page_content.editions_title[0].text}</h3>
            <span className={styles.subtitle}>
              {page_content.editions_subtitle}
            </span>

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
        <div ref={footerRef} className={styles.mobilefooter}>
          <HomeFooter />
        </div>
      </main>
    </div>
  );
};

About.Layout = MyLayout;
export default About;
