import Link from "next/link";
import styles from "../styles/Footer.module.scss";

const Footer = ({ page, count, latest, tags, case_study }) => {
  // console.log("siteNav: ", page);
  return (
    <footer className={styles.footer}>
      <div className={styles.contact}>
        <span className={styles.company}>Collect NYC</span>
        <span className={styles.phone}>
          Office
          <br /> +1 206 799 5611
        </span>
        <span className={styles.address}>
          106B Nassau Ave #330 Brooklyn, NY 11222
        </span>
        <a
          href="https://www.instagram.com/collect.nyc/"
          target="_blank"
          rel="noreferrer"
          className={styles.insta}
        >
          @collect.nyc
        </a>
      </div>
      <div className={styles.links}>
        <span className={styles.copyright}>
          ©{new Date().getFullYear()} Collect NYC, All Rights Reserved
        </span>
        <Link href="/info/privacy">Privacy</Link>
        <Link href="/info/impressum">Impressum</Link>
      </div>
    </footer>
  );
};

export default Footer;
