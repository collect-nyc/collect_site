import Head from 'next/head';
import { getProfilePage } from '../lib/api';
import { RichText } from 'prismic-reactjs';
// import Image from 'next/image';
import styles from '../styles/Profile.module.scss';


export async function getServerSideProps() {
  const data = await getProfilePage();

  return {
    props: { data },
  }
}


const Profile = ({data}) => {
  console.log('Profile Content', data[0].node);

  const page_content = data[0].node;


  return (
    <div className={styles.container}>
      <Head>
        <title>About COLLECT NYC</title>
        <meta name="description" content="COLLECT NYC is a full-spectrum interdisciplinary creative practice centered in direction and development." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="profile_main">
        <div className="summary">
        <h1>COLLECT NYC</h1>
        <RichText render={page_content.summary} />
        </div>
        <div className="clients_collabs">
          <h2>Clients, Collaborators</h2>
          <ul>
            {page_content
              ? page_content.clients_and_collaborators.map((client, key) => (
                  <li key={key}><RichText render={client.item} /></li>
                ))
              : null}
          </ul>
        </div>
        <div className="offerings">
          <h2>Offerings</h2>
          <ul className="visual offerings">
            {page_content
              ? page_content.visual_offerings.map((offering, key) => (
                  <li key={key}><RichText render={offering.item} /></li>
                ))
              : null}
          </ul>

          <ul className="technical offerings">
            {page_content
              ? page_content.technical_offerings.map((offering, key) => (
                  <li key={key}><RichText render={offering.item} /></li>
                ))
              : null}
          </ul>

          <ul className="leadership offerings">
            {page_content
              ? page_content.leadership_offerings.map((offering, key) => (
                  <li key={key}><RichText render={offering.item} /></li>
                ))
              : null}
          </ul>
        </div>

        <p className="thanks">Thanks, talk soon.</p>
      </main>

      <aside className="contact_info">
        <h3>Contact</h3>

        {page_content ? (<RichText render={page_content.instruction} />) : null}

        <div className="partner">
          <span>Andrew J.S.</span>
          <span>{page_content ? page_content.andrew[0].text : null}</span>
        </div>

        <div className="partner">
          <span>Joshua Tuscan</span>
          <span>{page_content ? page_content.joshua[0].text : null}</span>
        </div>
      </aside>
    </div>
  )
}

export default Profile;