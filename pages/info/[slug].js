import React, { useEffect, useState, useContext, useRef } from "react";
import Head from "next/head";
import Prismic from "prismic-javascript";
import _ from "lodash";
import { Link, RichText, Date } from "prismic-reactjs";

import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import SharedHead from "../../components/SharedHead";
import MyLayout from "../../layouts/MyLayout";

import { Client } from "../../lib/prismic-config";
import { SITE_NAME } from "../../lib/constants";
import MemoryContext from "../../components/MemoryContext";
import { apolloClient } from "../../lib/apollo-config";
import {
  motion,
  useElementScroll,
  useTransform,
  useViewportScroll,
} from "framer-motion";

import styles from "../../styles/EssentialText.module.scss";

export async function getStaticProps({ params, preview = false, previewData }) {
  const uid = params.slug;
  const { loading, error, data } = await apolloClient.query({
    query: gql`
      query essential_text($uid: String!) {
        essential_text(lang: "en-us", uid: $uid) {
          text
        }
      }
    `,
    variables: {
      uid: params.slug,
    },
  });

  // console.log(data);

  const document = data;
  const page = "essential_text";

  return { props: { document, page, uid, revalidate: 60 } };
}

export async function getStaticPaths() {
  const essential_text = await Client().query(
    Prismic.Predicates.at("document.type", "essential_text"),
    { pageSize: 100 }
  );

  const posts = essential_text.results;

  // console.log(posts);

  const paths = posts.map((post) => ({
    params: {
      slug: post.uid,
    },
  }));
  // console.log(paths);
  return { paths, fallback: "blocking" };
}

const EssentialText = ({ document, uid }) => {
  const page_data = document;

  // console.log("Project Data", page_data);

  const router = useRouter();

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
    <div className={styles.container} ref={ref}>
      <Head>
        <title>{_.capitalize(uid)} – COLLECT NYC</title>
        {/* TODO: add meta description content */}
        <meta name="description" content={_.capitalize(uid)} />

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
          {page_data.essential_text
            ? page_data.essential_text.text.map((text, index) => {
                if (text.type == "heading6") {
                  return (
                    <h6 className={styles.heading} key={index}>
                      {text.text}
                    </h6>
                  );
                } else if (text.type == "paragraph") {
                  return (
                    <p className={styles.paragraph} key={index}>
                      {text.text}
                    </p>
                  );
                } else if (text.type == "list-item") {
                  return <li>{text.text}</li>;
                }
              })
            : null}
        </div>
      </main>
    </div>
  );
};

EssentialText.Layout = MyLayout;
export default EssentialText;
