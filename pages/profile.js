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
import styles from "./Profile.module.scss";

export async function getServerSideProps() {
  //Page Data
  const document = await Client().getSingle("profile");

  const page = "profile";

  return {
    props: { page, document },
  };
}

const Profile = ({ document }) => {
  // const { setReturnPage, setScrollPos } = useContext(MemoryContext);
  // Reset scroll position for Archive Index
  // setScrollPos(0);

  // useEffect(() => {
  //   setReturnPage(false);
  // }, []);

  const inquiryRef = useRef(null);
  const offeringRef = useRef(null);
  const clientsRef = useRef(null);
  const editionsRef = useRef(null);

  // console.log("Profile Content", document.data);
  const page_content = document.data;

  const [profilePage, setProfilePage] = useState("info");

  return (
    <div className={styles.container}>
      <Head>
        <title>Collect NYC Profile</title>
        <meta
          name="description"
          content="Collect NYC is a full-spectrum interdisciplinary creative practice centered in direction and development."
        />
        <SharedHead />
      </Head>

      <main
        className={
          profilePage === "contact"
            ? `${styles.main} ${styles.contact_page}`
            : styles.main
        }
      >
        <div className={styles.info_bar}>
          <span className={styles.desktop}>
            Agency Profile, Services, Updates and More
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
              Offering
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

            <ul className={styles.visual}>
              {page_content
                ? page_content.visual_offerings.map((offering, key) => (
                    <li key={key}>
                      <RichText render={offering.item} />
                    </li>
                  ))
                : null}
            </ul>

            <ul className={styles.technical}>
              {page_content
                ? page_content.technical_offerings.map((offering, key) => (
                    <li key={key}>
                      <RichText render={offering.item} />
                    </li>
                  ))
                : null}
            </ul>

            <ul className={styles.leadership}>
              {page_content
                ? page_content.leadership_offerings.map((offering, key) => (
                    <li key={key}>
                      <RichText render={offering.item} />
                    </li>
                  ))
                : null}
            </ul>

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
          <Link href="/info/privacy">
            <a>Privacy</a>
          </Link>
          <Link href="/info/impressum">
            <a>Impressum</a>
          </Link>
        </div>

        {/* FULL FOOTER FOR MOBILE */}
        <div className={styles.mobilefooter}>
          <Footer />
        </div>
      </main>
    </div>
  );
};

Profile.Layout = MyLayout;
export default Profile;
