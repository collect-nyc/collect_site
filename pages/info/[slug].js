import React, { useRef } from "react";
import Head from "next/head";
import _ from "lodash";
import { RichText } from "prismic-reactjs";
import SharedHead from "../../components/SharedHead";
import Footer from "../../components/Footer";
import MyLayout from "../../layouts/MyLayout";
import { Client } from "../../lib/prismic-config";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { SITE_NAME } from "../../lib/constants";
import styles from "./EssentialText.module.scss";

export async function getServerSideProps({
  params,
  preview = false,
  previewData,
}) {
  const uid = params.slug;
  const data = await Client().getByUID("essential_text", uid);

  // console.log(data);

  const document = data;
  const page = "essential_text";

  return { props: { document, page, uid, revalidate: 60 } };
}

const EssentialText = ({ document, uid }) => {
  const { meta_title, meta_description, meta_image, text } = document.data;

  console.log("Project Data", document);

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
          <title>{meta_title ? meta_title : `${SITE_NAME}`}</title>
          <meta
            name="description"
            content={
              meta_description
                ? meta_description
                : "Independent agency for NEW IDEAS in direction, design, technology and development."
            }
          />

          <meta
            property="og:title"
            content={meta_title ? meta_title : `${SITE_NAME}`}
          />
          <meta
            property="og:description"
            content={
              meta_description
                ? meta_description
                : "Independent agency for NEW IDEAS in direction, design, technology and development."
            }
          />
          <meta
            property="og:image"
            content={
              meta_image?.url
                ? meta_image.url
                : "https://collect.nyc/images/collect-new-york-og.jpg"
            }
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
            {text ? <RichText render={text} /> : null}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

EssentialText.Layout = MyLayout;
export default EssentialText;
