import { useEffect, useContext, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import SharedHead from "../../components/SharedHead";
import { SITE_NAME } from "../../lib/constants";
import Collect from "../../svg/big_collect.svg";
import styles from "./Work.module.scss";

const WorkPage = () => {
  // console.log("Page Data", document);

  // const { meta_title, meta_description, meta_image } = data;

  return (
    <>
      <Head>
        <title>{"All Work - Collect NEW YORK"}</title>
        <meta name="description" content={"Projects by Collect NEW YORK."} />

        <meta property="og:title" content={"All Work - Collect NEW YORK"} />
        <meta
          property="og:description"
          content={"Projects by Collect NEW YORK."}
        />
        <meta
          property="og:image"
          content={"https://collect.nyc/images/collect-new-york-og.jpg"}
        />

        <SharedHead />
      </Head>
      <div className={styles.container}>
        <Collect />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // const document = await client.fetch(`*[_type == "about"]{
  //   title,
  //   metadesc,
  //   statement,
  //   newbusiness,
  //   hiring,
  //   founders,
  //   instagram,
  //   sociallinks,
  //   editions,
  //   selectedclients,
  //   clients
  // }`);
  // const data = document[0];

  const page = "work";

  return {
    props: {
      // data,
      page,
    },
  };
}

export default WorkPage;
