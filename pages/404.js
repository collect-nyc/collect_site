import Head from "next/head";
import SharedHead from "../components/SharedHead";
import Link from "next/link";
import styles from "./404.module.scss";

export async function getStaticProps() {
  const page = "404";

  return {
    props: { page },
  };
}

const Custom404 = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>404 Not Found &ndash; Collect NYC</title>
        <meta
          name="description"
          content="You have reached a page that does not exist. Head back to the COLLECT index."
        />
        <SharedHead />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>404 - Page Not Found</h2>
        <p>
          You have arrived on a page that does not exist.
          <br /> Find your way back to something real on the{" "}
          <Link href="/">index page.</Link>
        </p>
      </main>
    </div>
  );
};

export default Custom404;
