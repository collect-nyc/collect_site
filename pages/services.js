import React, {
  useRef,
  useEffect,
  createRef,
  useState,
  useContext,
} from "react";
import { client } from "../sanity.config";
import { PortableText } from "@portabletext/react";
import Head from "next/head";
import SharedHead from "../components/SharedHead";
import Footer from "../components/Footer";
import { motion, cubicBezier } from "framer-motion";
import { SITE_NAME } from "../lib/constants";
import styles from "./Services.module.scss";
import MemoryContext from "../components/MemoryContext";
import Link from "next/link";

// const ScrollLogger = ({ children, itemIndex, setCurrentItem }) => {
//   const elementRef = useRef();

//   useEffect(() => {
//     const handleScroll = () => {
//       const element = elementRef.current;
//       const rect = element.getBoundingClientRect();
//       const offset = 176;

//       // Check if the top of the element is within the desired range
//       if (rect.top <= offset && rect.bottom >= offset) {
//         setCurrentItem(itemIndex);
//       }
//     };

//     // Attach the scroll event listener
//     window.addEventListener("scroll", handleScroll);

//     // Clean up the event listener when the component unmounts
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []); // Run this effect only once when the component mounts

//   return <div ref={elementRef}>{children}</div>;
// };

const Services = ({ data }) => {
  // console.log("Data", data);

  const { title, metadesc, workwithus } = data;
  const workRef = useRef(null);
  const offeringsRef = useRef(null);
  const elementsRef = useRef(data.offerings.map(() => createRef()));

  const { setMobileMenuOpen, setMobileMemory } = useContext(MemoryContext);

  const [seeMoreClicked, setSeeMoreClicked] = useState(
    new Array(data.offerings.length).fill(false)
  );
  // const [seeMoreClicked, setSeeMoreClicked] = useState(() => {
  //   const initialState = new Array(data.offerings.length).fill(false);
  //   if (initialState.length > 0) {
  //     initialState[0] = true; // Set the first element to true
  //   }
  //   return initialState;
  // });

  const handleSeeMoreClick = (index) => {
    // Create a new array to avoid mutating state directly
    const newSeeMoreClicked = [...seeMoreClicked];
    newSeeMoreClicked[index] = !newSeeMoreClicked[index];
    setSeeMoreClicked(newSeeMoreClicked);
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileMemory(false);

    setTimeout(() => {
      setSeeMoreClicked((prevState) => {
        const newState = [...prevState];
        newState[0] = true;
        return newState;
      });
    }, 350);
  }, []);

  const customEase = cubicBezier(0.5, 1, 0.89, 1);

  const variants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.5, ease: customEase },
        opacity: { duration: 0.7, delay: 0.4, ease: customEase }, // Slower fade when opening
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.5, delay: 0.1, ease: customEase }, // Slower height transition when closing
        opacity: { duration: 0.2, ease: customEase }, // Faster fade when closing
      },
    },
  };

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
            <div className={styles.pagenav}>
              <Link href="/about">I. About & Contact</Link>
              <Link href="/services">II. Agency Services</Link>
            </div>
          </section>
          <section ref={offeringsRef} className={styles.offerings}>
            <div
              className={`${styles.offering} ${styles.row} ${styles.first} ${styles.closed} ${styles.workwith}`}
            >
              <span className={styles.label}>Work With Us</span>
              <div className={styles.center}>
                {workwithus ? (
                  <PortableText value={workwithus} />
                ) : (
                  <p>
                    Foundational offerings for artists, creators, companies and
                    institutions; we bring strategy and focus to technology and
                    the arts, allowing our collaborators to do more by design.
                  </p>
                )}
              </div>
            </div>
            {data.offerings.map((offering, i) => (
              <div
                key={i}
                ref={elementsRef.current[i]}
                className={`${styles.offering} ${styles.row}  ${
                  seeMoreClicked[i] ? styles.open : styles.closed
                }`}
                onClick={() => handleSeeMoreClick(i)}
              >
                <span className={styles.label}>
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <div className={styles.center}>
                  <h2>{offering.title}</h2>
                  <div className={styles.description}>
                    <PortableText value={offering.description} />
                  </div>

                  <motion.div
                    className={`${styles.examples} ${
                      seeMoreClicked[i] ? styles.open : styles.closed
                    }`}
                    variants={variants}
                    initial="closed"
                    animate={seeMoreClicked[i] ? "open" : "closed"}
                  >
                    <ul>
                      {offering.examples.map((example, i) => (
                        <li key={i}>{example}</li>
                      ))}
                    </ul>
                    <div className={styles.example_images}>
                      <div className={styles.interior}>
                        {offering.images.map((image, i) => (
                          <img src={image.url} alt={image.alt} key={i} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
                <div className={styles.cta}>
                  <button>
                    {seeMoreClicked[i] ? "See Less -" : "See More +"}
                  </button>
                </div>
              </div>
            ))}
          </section>

          <section
            ref={workRef}
            className={`${styles.ways_to_work} ${styles.row}`}
          >
            <span className={styles.label}>
              {(data.offerings.length + 1).toString().padStart(2, "0")}
            </span>
            <div className={styles.center}>
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

              <span className={styles.offering_text}>
                Have a project?{" "}
                <a
                  className={styles.offering_link}
                  href="https://calendly.com/collect-nyc"
                  target="_blank"
                >
                  Book a new business call now ↗
                </a>
              </span>
            </div>
          </section>
        </article>
        {/* <aside className={styles.stickynav}>
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
              <span key={i}>
                <button
                  onClick={() =>
                    animateScrollTo(elementsRef.current[i].current, {
                      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
                      minDuration: 600,
                      speed: 500,
                      verticalOffset: -175,
                    })
                  }
                  className={currentItem === i ? styles.active : null}
                >
                  {offering.title}
                </button>
                <br />
              </span>
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
        </aside> */}
      </main>
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const document = await client.fetch(`*[_type == "services"]{
    title,
    metadesc,
    workwithus,
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

export default Services;
