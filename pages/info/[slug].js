import { useRef } from "react";
import Head from "next/head";
import _ from "lodash";
import SharedHead from "../../components/SharedHead";
import Footer from "../../components/Footer";
import { client } from "../../sanity.config";
import { PortableText } from "@portabletext/react";
import { SITE_NAME } from "../../lib/constants";
import styles from "./EssentialText.module.scss";

const EssentialText = ({ document }) => {
  const { title, metadesc, bodycopy } = document;

  // console.log("Project Data", document);

  return (
    <>
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
        <main>
          <div className={styles.text}>
            {bodycopy ? <PortableText value={bodycopy} /> : null}
          </div>
        </main>
      </div>
      <Footer essential="true" />
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

  const page = "essential";

  return {
    props: {
      document,
      page,
    },
  };
}

export default EssentialText;
