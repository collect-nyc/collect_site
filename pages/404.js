import Head from "next/head";
import MyLayout from "../layouts/MyLayout";
import styles from "../styles/404.module.scss";

const Custom404 = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>404 - COLLECT NYC</title>
        <meta
          name="description"
          content="You've reached a page that does not exist. Head back to the COLLECT index."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>404 - Page Not Found</h2>
      </main>
    </div>
  );
};

Custom404.Layout = MyLayout;
export default Custom404;
