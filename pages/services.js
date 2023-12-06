import { useRef, useEffect, createRef } from "react";
import { client } from "../sanity.config";
import { PortableText } from "@portabletext/react";
import Head from "next/head";
import SharedHead from "../components/SharedHead";
import MyLayout from "../layouts/MyLayout";
import Footer from "../components/Footer";
import animateScrollTo from "animated-scroll-to";
import { useInView, motion } from "framer-motion";
import { SITE_NAME } from "../lib/constants";
import styles from "./Services.module.scss";

const Services = ({ data }) => {
  // console.log("Data", data);

  const { title, metadesc, statement } = data;

  const footerRef = useRef(null);
  const workRef = useRef(null);
  const offeringsRef = useRef(null);
  const elementsRef = useRef(data.offerings.map(() => createRef()));
  const isInView = useInView(footerRef);

  // useEffect(() => {
  //   if (isInView) {
  //     console.log("Its in View", isInView);
  //   } else {
  //     console.log("Its not in View", isInView);
  //   }
  // }, [isInView]);

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
              <a
                className={styles.offering_link}
                href="https://calendly.com/collect-nyc"
                target="_blank"
              >
                Have a project? Book a new business meeting now →
              </a>
            </div>
          </section>
          <section ref={offeringsRef} className={styles.offerings}>
            {data.offerings.map((offering, i) => (
              <div
                ref={elementsRef.current[i]}
                className={styles.offering}
                key={i}
              >
                <h2>{offering.title}</h2>
                <div className={styles.description}>
                  <PortableText value={offering.description} />
                </div>
                <div className={styles.examples}>
                  <ul>
                    {offering.examples.map((example, i) => (
                      <li key={i}>{example}</li>
                    ))}
                  </ul>
                  <div className={styles.example_images}>
                    {offering.images.map((image, i) => (
                      <img src={image.url} alt={image.alt} key={i} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>
          <section ref={workRef} className={styles.ways_to_work}>
            <h3>Ways of Working</h3>
            <div className={styles.description}>
              <PortableText value={data.wow} />
            </div>
            <div className={styles.options}>
              <div className={styles.option}>
                <h4>Self-Contained Projects</h4>
                <PortableText value={data.projects} />
              </div>
              <div className={styles.option}>
                <h4>Ongoing Retainers</h4>
                <PortableText value={data.retainers} />
              </div>
              <div className={styles.option}>
                <h4>Scalable Teams</h4>
                <PortableText value={data.teams} />
              </div>
            </div>
            <a
              className={styles.offering_link}
              href="https://calendly.com/collect-nyc"
              target="_blank"
            >
              Have a project? Book a new business meeting now →
            </a>
          </section>
        </article>
        <aside className={styles.stickynav}>
          <h5
            onClick={() =>
              animateScrollTo(offeringsRef.current, {
                easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
                minDuration: 600,
                speed: 500,
                verticalOffset: -175,
              })
            }
          >
            OUR OFFERINGS
          </h5>
          <p>
            {data.offerings.map((offering, i) => (
              <>
                <button
                  onClick={() =>
                    animateScrollTo(elementsRef.current[i].current, {
                      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
                      minDuration: 600,
                      speed: 500,
                      verticalOffset: -175,
                    })
                  }
                  key={i}
                >
                  {offering.title}
                </button>
                <br />
              </>
            ))}
          </p>
          <h5
            onClick={() =>
              animateScrollTo(workRef.current, {
                easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
                minDuration: 600,
                speed: 500,
                verticalOffset: -175,
              })
            }
          >
            WAYS OF WORKING
          </h5>
          <p>
            <button
              onClick={() =>
                animateScrollTo(workRef.current, {
                  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
                  minDuration: 600,
                  speed: 500,
                  verticalOffset: -175,
                })
              }
            >
              Self-Contained Projects
            </button>
            <br />
            <button
              onClick={() =>
                animateScrollTo(workRef.current, {
                  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
                  minDuration: 600,
                  speed: 500,
                  verticalOffset: -175,
                })
              }
            >
              Ongoing Retainers
            </button>
            <br />
            <button
              onClick={() =>
                animateScrollTo(workRef.current, {
                  easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
                  minDuration: 600,
                  speed: 500,
                  verticalOffset: -175,
                })
              }
            >
              Scalable Teams
            </button>
          </p>
        </aside>
      </main>
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const document = await client.fetch(`*[_type == "services"]{
    title,
    metadesc,
    statement,
    "offerings": offering[]->{
      title,
      description,
      slug,
      examples,
      images[] {
        "url": asset->url,
        "alt": alt,
      },
    },
    wow,
    projects,
    retainers,
    teams
  }`);
  const data = document[0];

  const page = "services";

  return {
    props: {
      data,
      page,
    },
  };
}

Services.Layout = MyLayout;
export default Services;
