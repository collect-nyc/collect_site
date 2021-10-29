import { useContext, useEffect } from "react";
import Head from "next/head";
import SharedHead from "../components/SharedHead";
import MyLayout from "../layouts/MyLayout";
import MemoryContext from "../components/MemoryContext";
import Link from "next/link";
import styles from "../styles/404.module.scss";

export async function getStaticProps() {
  const page = "404";

  return {
    props: { page },
  };
}

const Custom404 = () => {
  const { setReturnPage } = useContext(MemoryContext);

  useEffect(() => {
    setReturnPage(false);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>404 - COLLECT NYC</title>
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
