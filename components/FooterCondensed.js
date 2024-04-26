import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.second_row}>
        <div className={styles.contact}>
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
              href="https://www.instagram.com/editions.mag/"
              target="_blank"
              rel="noreferrer"
              className={styles.insta}
            >
              @editions.mag
            </a>
          </div>

          <div className={styles.extra}>
            <Link href="/info/privacy">Privacy</Link>
            <br />
            <Link href="/info/impressum">Impressum</Link>
          </div>
        </div>
        <div className={styles.links}>
          <span className={styles.copyright}>
            ©{new Date().getFullYear()} Collect NEW YORK
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
