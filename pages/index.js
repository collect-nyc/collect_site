import Head from "next/head";
import MyLayout from "../layouts/MyLayout";
import { getIndexPage, getAllArchives } from "../lib/api";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Index.module.scss";

export async function getServerSideProps() {
  const data = await getIndexPage();

  const archives = await getAllArchives();

  const page = "index";

  return {
    props: { data, archives, page },
  };
}

const Home = ({ data, archives }) => {
  const page_content = data[0].node;

  console.log("DATA", page_content, "ARCHIVES", archives);

  return (
    <div className={styles.container}>
      <Head>
        <title>COLLECT NYC</title>
        <meta
          name="description"
          content="COLLECT NYC is a full-spectrum interdisciplinary creative practice centered in direction and development."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <span>{page_content.title[0].text}</span>
          <span>{page_content.date_range[0].text}</span>
        </h1>

        <section className={styles.all_archives}>
          <ul>
            {archives
              ? archives.map((archive, key) => (
                  <li key={key}>
                    <Link href={"/project/" + archive.node._meta.uid}>
                      <a>
                        <span className={styles.name}>
                          {archive.node.title[0].text}
                        </span>

                        <span className={styles.tags}>
                          {archive.node.tags.map((item, key) => (
                            <span key={key}>
                              {archive.node.tags.length === key + 1 && item.tag
                                ? item.tag.tag_name[0].text
                                : item.tag
                                ? item.tag.tag_name[0].text + ", "
                                : null}
                            </span>
                          ))}
                        </span>

                        <span className={styles.date}>
                          {archive.node.creation_date
                            ? DateTime.fromISO(
                                archive.node.creation_date
                              ).toFormat("yyyy")
                            : "TBD"}
                        </span>
                      </a>
                    </Link>
                  </li>
                ))
              : null}
          </ul>
        </section>
      </main>
      <footer className={styles.footer}>
        <Image
          layout="responsive"
          width={page_content.footer_graphic.dimensions.width}
          height={page_content.footer_graphic.dimensions.height}
          src={page_content.footer_graphic.url}
          alt="Collect Graphic"
        />
      </footer>
    </div>
  );
};

Home.Layout = MyLayout;
export default Home;
