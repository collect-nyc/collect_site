import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = ({ page, count, latest, tags, case_study }) => {
  // console.log("siteNav: ", page);
  return (
    <footer className={styles.footer}>
      <div className={styles.contact}>
        <span className={styles.company}>Collect OFFICE</span>
        <span className={styles.address}>
          100A Broadway #377
          <br /> Brooklyn, NY 11249
        </span>

        <div className={styles.reachout}>
          <span className={styles.phone}>
            <b>E</b>
            <a href="mailto:info@collect.nyc">info@collect.nyc</a>
          </span>
          <span className={styles.phone}>
            <b>T</b>+1 718 902 4911
          </span>
        </div>

        <div className={styles.social}>
          <a
            href="https://www.instagram.com/collect.nyc/"
            target="_blank"
            rel="noreferrer"
            className={styles.insta}
          >
            @collect.nyc
          </a>
          <a
            href="https://www.instagram.com/shop.editions/"
            target="_blank"
            rel="noreferrer"
            className={styles.insta}
          >
            @shop.editions
          </a>
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.extra}>
          <Link href="/info/privacy">Privacy</Link>
          <Link href="/info/impressum">Impressum</Link>
        </div>

        <span className={styles.copyright}>
          ©{new Date().getFullYear()} Collect NEW YORK
        </span>
      </div>
    </footer>
  );
};

export default Footer;
