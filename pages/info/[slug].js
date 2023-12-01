import React, { useRef } from "react";
import Head from "next/head";
import _ from "lodash";
import { RichText } from "prismic-reactjs";
import SharedHead from "../../components/SharedHead";
import Footer from "../../components/Footer";
import MyLayout from "../../layouts/MyLayout";
import { client } from "../../sanity.config";
import { PortableText } from "@portabletext/react";
// import { Client } from "../../lib/prismic-config";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { SITE_NAME } from "../../lib/constants";
import styles from "./EssentialText.module.scss";

const EssentialText = ({ document }) => {
  const { title, metadesc, slug, bodycopy } = document;

  // console.log("Project Data", document);

  const ref = useRef();
  const { scrollYProgress } = useViewportScroll(ref);

  const top_gradient = useTransform(
    scrollYProgress,
    [0, 0.07, 0.08, 1],
    [0, 0, 1, 1]
  );

  const bottom_gradient = useTransform(
    scrollYProgress,
    [0, 0.99, 1],
    [1, 0.5, 0]
  );

  return (
    <>
      <div className={styles.container} ref={ref}>
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
        <main>
          <div className={styles.text}>
            <motion.div
              className={styles.gradient_top}
              style={{ scrollYProgress, opacity: top_gradient }}
              key={"essential_top"}
            />
            <motion.div
              className={styles.gradient_bottom}
              style={{ scrollYProgress, opacity: bottom_gradient }}
              key={"essential_bottom"}
            />
            {bodycopy ? <PortableText value={bodycopy} /> : null}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const slug = params.slug;
  const document = await client.fetch(
    `
    *[_type == "essential" && slug.current == $slug][0]{
      title,
      metadesc,
      slug,
      bodycopy
    }
  `,
    { slug: slug }
  );

  return {
    props: {
      document,
    },
  };
}

EssentialText.Layout = MyLayout;
export default EssentialText;
