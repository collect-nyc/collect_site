import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  createRef,
} from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import { motion } from "framer-motion";
// import animateScrollTo from "animated-scroll-to";
import SharedHead from "../../components/SharedHead";
import MyLayout from "../../layouts/MyLayout";
import ProjectViewer from "../../components/ProjectViewer";
import { Client } from "../../lib/prismic-config";
import { SITE_NAME } from "../../lib/constants";
import MemoryContext from "../../components/MemoryContext";
import { ImageSlider } from "../../components/ImageSlider";
import styles from "./CaseStudy.module.scss";

export async function getStaticProps({ params, preview = false, previewData }) {
  const uid = params.slug;
  const document = await Client().getByUID("case_study", uid);

  return {
    props: { document, revalidate: 10 },
  };
}

export async function getStaticPaths() {
  const items = await Client().query(
    Prismic.Predicates.at("document.type", "case_study"),
    { pageSize: 100 }
  );

  const posts = items.results;

  // console.log(posts);

  const paths = posts.map((post) => ({
    params: {
      slug: post.uid,
    },
  }));

  // console.log(paths);
  return { paths, fallback: "blocking" };
}

const CaseStudy = ({ document }) => {
  console.log(document);
  const page_data = document.data;

  return (
    <>
      <Head>
        <title>
          {page_data.title[0].text
            ? page_data.title[0].text
            : "Collect NEW YORK Case Study"}{" "}
          – {SITE_NAME}
        </title>
        <meta
          name="description"
          content={
            page_data.header_description &&
            page_data.header_description.length > 0
              ? page_data.header_description[0].text
              : "A case study project by Collect NEW YORK."
          }
        />

        <SharedHead />
      </Head>
      <div>
        <h1>Hello</h1>
      </div>
    </>
  );
};

CaseStudy.Layout = MyLayout;
export default CaseStudy;
