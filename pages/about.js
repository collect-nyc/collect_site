import { useRef } from "react";
import { client } from "../sanity.config";
import { PortableText } from "@portabletext/react";
import Head from "next/head";
import Link from "next/link";
import SharedHead from "../components/SharedHead";
import MyLayout from "../layouts/MyLayout";
import Footer from "../components/Footer";
import animateScrollTo from "animated-scroll-to";
import { useInView, motion } from "framer-motion";
import { SITE_NAME } from "../lib/constants";
import styles from "./About.module.scss";

const About = ({ data }) => {
  const {
    title,
    metadesc,
    statement,
    newbusiness,
    hiring,
    founders,
    instagram,
    sociallinks,
    editions,
    selectedclients,
    clients,
  } = data;

  // console.log("Data", data);

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

      <main className={styles.main}>
        <article>
          <section className={styles.statement}>
            <div className={styles.textbox}>
              {statement ? <PortableText value={statement} /> : null}
            </div>
          </section>
          <section className={`${styles.section} ${styles.newbusiness}`}>
            <div className={styles.inner}>
              <span className={styles.label}>New Business</span>
              <div className={styles.content}>
                <PortableText value={newbusiness} />
                <p>
                  <a href="mailto:new@collect.nyc">new@collect.nyc</a>
                  <br />
                  +1 718 902 4911
                </p>
              </div>
            </div>
          </section>
          <section className={`${styles.section} ${styles.hiring}`}>
            <div className={styles.inner}>
              <span className={styles.label}>Work Opportunities</span>
              <div className={styles.content}>
                <PortableText value={hiring} />
                <p>
                  <a href="mailto:info@collect.nyc">info@collect.nyc</a>
                  <br />
                  <a
                    target="_blank"
                    href="https://www.instagram.com/collect.nyc"
                  >
                    @collect.nyc
                  </a>
                </p>
              </div>
            </div>
          </section>
          <section className={`${styles.section} ${styles.founders}`}>
            <div className={styles.inner}>
              <span className={styles.label}>Founders, Principals</span>
              <div className={styles.content}>
                {founders.map((founder, i) => (
                  <div className={styles.founder} key={i}>
                    <span>{founder.Name}</span>
                    <span>{founder.Title}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className={`${styles.section} ${styles.socials}`}>
            <div className={styles.inner}>
              <span className={styles.label}>Now Online</span>
              <div className={styles.content}>
                <ul>
                  {instagram.map((instalink, i) => (
                    <li key={i}>
                      <a
                        className={styles.instalink}
                        href={instalink.URL}
                        target="_blank"
                      >
                        {instalink.Account}
                      </a>
                    </li>
                  ))}
                </ul>

                <ul>
                  {sociallinks.map((sociallink, i) => (
                    <li key={i}>
                      <a
                        className={styles.sociallink}
                        href={sociallink.URL}
                        target="_blank"
                      >
                        {sociallink.Account} →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <section className={`${styles.section} ${styles.editions}`}>
            <div className={styles.inner}>
              <span className={styles.label}>Éditions Magazine</span>
              <div className={styles.content}>
                <PortableText value={editions} />
                <a className={styles.cta} href="">
                  Follow Éditions →
                </a>
              </div>
            </div>
          </section>
          <section className={`${styles.section} ${styles.clients}`}>
            <div className={styles.inner}>
              <span className={styles.label}>Selected Clients</span>
              <div className={styles.content}>
                <PortableText value={selectedclients} />
                <ul>
                  {clients.map((client, i) => (
                    <li key={i}>
                      {client.url ? (
                        <a target="_blank" href={client.url}>
                          {client.name}
                        </a>
                      ) : (
                        client.name
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </article>
        {/* <aside className={styles.stickynav}>
          <h5>NEW BUSINESS</h5>
          <p>
            <a href="mailto:new@collect.nyc">new@collect.nyc</a>
            <br />
            +1 718 902 4911
          </p>
          <h5>WORK OPPORTUNITIES</h5>{" "}
          <p>
            <a href="mailto:info@collect.nyc">info@collect.nyc</a>
            <br />
            <a target="_blank" href="https://instagram.com/collect.nyc">
              @collect.nyc
            </a>
          </p>{" "}
          <h5>NOW ONLINE</h5>{" "}
          <p>
            <a target="_blank" href="https://instagram.com/collect.nyc">
              Instagram
            </a>
            <br />
            <a target="_blank" href="https://www.threads.net/@collect.nyc">
              Threads
            </a>
            <br />
            <a
              target="_blank"
              href="https://www.linkedin.com/company/collect-nyc"
            >
              LinkedIn
            </a>
          </p>
          <h5>ÉDITIONS MAGAZINE</h5>
          <p>
            <a target="_blank" href="https://www.instagram.com/editions.mag/">
              @editions.mag
            </a>
            <br />
            <a target="_blank" href="https://editionsnewyork.com">
              editionsnewyork.com
            </a>
          </p>
          <h5>MAILBOX</h5>{" "}
          <p>
            100A Broadway #377
            <br /> Brooklyn, NY 11249
          </p>
        </aside> */}
      </main>

      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const document = await client.fetch(`*[_type == "about"]{
    title,
    metadesc,
    statement,
    newbusiness,
    hiring,
    founders,
    instagram,
    sociallinks,
    editions,
    selectedclients,
    clients
  }`);
  const data = document[0];

  const page = "about";

  return {
    props: {
      data,
      page,
    },
  };
}

About.Layout = MyLayout;
export default About;
