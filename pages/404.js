import Head from "next/head";
import MyLayout from "../layouts/MyLayout";
import Link from "next/link";
import styles from "../styles/404.module.scss";

const Custom404 = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>404 - COLLECT NYC</title>
        <meta
          name="description"
          content="You have reached a page that does not exist. Head back to the COLLECT index."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>404 - Page Not Found</h2>
        <p>
          You have arrived on a page that does not exist.
          <br /> Find your way back to something real on the{" "}
          <Link href="/">
            <a>index page.</a>
          </Link>
        </p>
      </main>
    </div>
  );
};

Custom404.Layout = MyLayout;
export default Custom404;
