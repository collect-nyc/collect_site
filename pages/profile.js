import { useState, useContext, useEffect } from "react";
import { Client } from "../lib/prismic-config";
import Head from "next/head";
import Link from "next/link";
import SharedHead from "../components/SharedHead";
import MyLayout from "../layouts/MyLayout";
// import MemoryContext from "../components/MemoryContext";
// import { motion, useViewportScroll, useTransform } from "framer-motion";
import { RichText } from "prismic-reactjs";
import EditionsLogo from "../svg/editions.svg";
import styles from "../styles/Profile.module.scss";

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

  console.log("Profile Content", document.data);
  const page_content = document.data;

  const [profilePage, setProfilePage] = useState("info");

  // const { scrollYProgress } = useViewportScroll();

  // this prints out number between 0 and 1 for scroll position of the page
  // useEffect(() => {
  //   scrollYProgress.onChange((latest) => {
  //     console.log(latest);
  //   });
  // });

  // const top_gradient = useTransform(
  //   scrollYProgress,
  //   [0, 0.2, 0.2, 1],
  //   [0, 0, 1, 1]
  // );

  // const bottom_gradient = useTransform(scrollYProgress, [0, 1, 1], [1, 0.5, 0]);

  // const ChangePage = (page) => {
  //   setProfilePage(page);
  // };

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
        {/* <motion.div
            className={styles.gradient_top}
            style={{ scrollYProgress, opacity: top_gradient }}
            key={"top"}
          />
          <motion.div
            className={styles.gradient_bottom}
            style={{ scrollYProgress, opacity: bottom_gradient }}
            key={"bottom"}
          /> */}

        {/* <div className={styles.summary}>
            {page_content && page_content.latest
              ? page_content.latest.map((handle, key) => (
                  <div
                    key={key}
                    className={
                      handle.update === true
                        ? `${styles.latest_info} ${styles.update}`
                        : styles.latest_info
                    }
                  >
                    <RichText render={handle.text} />
                  </div>
                ))
              : null}
          </div> */}

        <div className={styles.info_bar}>
          <span>Agency Profile, Services, Updates and More</span>
        </div>

        <div className={styles.grid}>
          {/* ABOUT */}
          <div className={`${styles.column} ${styles.about}`}>
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
          <div className={`${styles.column} ${styles.contact}`}>
            <h2 className={`heading`}>Inquiries</h2>
            <div className={styles.contact_summary}>
              {page_content ? (
                <RichText render={page_content.instruction} />
              ) : null}
            </div>

            <div className={styles.contact_details}>
              <div className={styles.phone}>
                <div>
                  <span>E</span>
                  {page_content.email ? page_content.email : null}
                </div>
                <div>
                  <span>T</span>
                  <RichText render={page_content.phone} />
                </div>
              </div>
            </div>
          </div>

          {/* OFFERING */}
          <div className={`${styles.column} ${styles.offering}`}>
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

            <div className={styles.clients_collabs}>
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
          <div className={`${styles.column} ${styles.editions}`}>
            <figure>
              <EditionsLogo />
            </figure>
            <p>
              A new retail experience from our studio, Éditions is a carrier of
              curated books for a lifetime, and independent publishing imprint
              and more.
            </p>
            <a href="" target="_blank" rel="noreferrer">
              Shop Éditions →
            </a>
          </div>
        </div>

        {/* REDUCED FOOTER */}
        <div className={styles.footer}>
          <Link href="/info/privacy">
            <a>Privacy</a>
          </Link>
          <Link href="/info/impressum">
            <a>Impressum</a>
          </Link>
        </div>
      </main>
    </div>
  );
};

Profile.Layout = MyLayout;
export default Profile;
