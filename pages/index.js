import Head from 'next/head';
import { getIndexPage, getAllArchives } from '../lib/api';
import { RichText } from 'prismic-reactjs';
import { DateTime } from "luxon";
// import Image from 'next/image'
import styles from '../styles/Index.module.scss';

export async function getServerSideProps() {
  const data = await getIndexPage();

  const archives = await getAllArchives();

  return {
    props: { data, archives },
  }
}


const Home = ({data, archives}) => {
  const page_content = data[0].node;


  console.log('DATA', page_content, 'ARCHIVES', archives);

  return (
    <div className={styles.container}>
      <Head>
        <title>COLLECT NYC</title>
        <meta name="description" content="COLLECT NYC is a full-spectrum interdisciplinary creative practice centered in direction and development." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <span><RichText render={page_content.title} /></span>
          <span><RichText render={page_content.date_range} /></span>
        </h1>

        <section className="all_archives">
          <ul>
          {archives
            ? archives.map((archive, key) => (
                <li key={key}>
                  {archive.node.title[0].text}

                  {archive.node.tags.map((item, key) => (
                    <span key={key}>
                      {item.tag.tag_name[0].text}
                    </span>
                  ))}

                  {DateTime.fromISO(archive.node.creation_date).toFormat("yyyy")}
                </li>
              ))
            : null}
          </ul>
        </section>
        
        {/* 
        <p className={styles.description}>
          
        </p>

        <div className={styles.grid}>
          
        </div>
        */}


        <footer className={styles.footer}>
          <img src={page_content.footer_graphic.url} />
        </footer>
      </main>
    </div>
  )
}

export default Home;
