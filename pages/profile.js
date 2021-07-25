import { Client } from "../lib/prismic-config";
import Head from "next/head";
import SharedHead from "../components/SharedHead";
import MyLayout from "../layouts/MyLayout";
import { RichText } from "prismic-reactjs";
import styles from "../styles/Profile.module.scss";

export async function getServerSideProps() {
  //Page Data
  const document = await Client().getSingle("profile");

  const page = "profile";

  return {
    props: { page, document },
  };
}

const Profile = ({ document }) => {
  console.log("Profile Content", document.data);
  const page_content = document.data;

  return (
    <div className={styles.container}>
      <Head>
        <title>COLLECT NYC Profile</title>
        <meta
          name="description"
          content="COLLECT NYC is a full-spectrum interdisciplinary creative practice centered in direction and development."
        />
        <SharedHead />
      </Head>

      <main className={styles.main}>
        <div className={styles.about}>
          <div className={styles.summary}>
            <h1 className="heading_h1 xtra_bold">COLLECT NYC</h1>
            <RichText render={page_content.summary} />
          </div>

          <div className={styles.clients_collabs}>
            <h3 className="untitled_caps">Clients, Collaborators</h3>
            <ul>
              {page_content
                ? page_content.clients_and_collaborators.map((client, key) => (
                    <li key={key}>
                      <RichText render={client.item} />
                    </li>
                  ))
                : null}
            </ul>
          </div>

          <div className={styles.offerings}>
            <h3 className="untitled_caps">Offerings</h3>

            <ul className={styles.visual}>
              {page_content
                ? page_content.visual_offerings.map((offering, key) => (
                    <li key={key}>
                      <RichText render={offering.item} />
                    </li>
                  ))
                : null}
            </ul>

            <ul className={styles.technical}>
              {page_content
                ? page_content.technical_offerings.map((offering, key) => (
                    <li key={key}>
                      <RichText render={offering.item} />
                    </li>
                  ))
                : null}
            </ul>

            <ul className={styles.leadership}>
              {page_content
                ? page_content.leadership_offerings.map((offering, key) => (
                    <li key={key}>
                      <RichText render={offering.item} />
                    </li>
                  ))
                : null}
            </ul>
          </div>

          <p className={styles.thanks}>Thanks, talk soon.</p>
        </div>
        <aside className={styles.contact_info}>
          <div className={styles.contact_summary}>
            <h3 className="untitled_caps">Contact</h3>

            {page_content ? (
              <RichText render={page_content.instruction} />
            ) : null}
          </div>

          <div className={styles.partner}>
            <span>Andrew J.S.</span>
            <span>{page_content ? page_content.andrew[0].text : null}</span>
          </div>

          <div className={styles.partner}>
            <span>Joshua Tuscan</span>
            <span>{page_content ? page_content.joshua[0].text : null}</span>
          </div>

          <div className={styles.insta_group}>
            <ul className="insta">
              {page_content
                ? page_content.instagrams.map((handle, key) => (
                    <li key={key}>
                      <RichText render={handle.item} />
                    </li>
                  ))
                : null}
            </ul>
          </div>

          <div className={styles.socials_group}>
            <ul className={styles.socials}>
              {page_content
                ? page_content.socials.map((handle, key) => (
                    <li key={key}>
                      <RichText render={handle.item} />
                    </li>
                  ))
                : null}
            </ul>
          </div>

          <div className={styles.contact_details}>
            <div className={styles.phone}>
              <h4>Office</h4>
              <RichText render={page_content.phone} />
            </div>
            <div className={styles.address}>
              <RichText render={page_content.address} />
            </div>
          </div>

          {/*<div className={styles.copyright}>
            &copy;{new Date().getFullYear()} Collect NYC
                </div>*/}
        </aside>
      </main>
    </div>
  );
};

Profile.Layout = MyLayout;
export default Profile;
