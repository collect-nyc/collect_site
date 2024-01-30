import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = ({ essential }) => {
  return (
    <footer className={`${styles.footer} ${essential && styles.essential}`}>
      <div className={styles.first_row}>
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
      </div>
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
              href="https://www.instagram.com/shop.editions/"
              target="_blank"
              rel="noreferrer"
              className={styles.insta}
            >
              @shop.editions
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
