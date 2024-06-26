import Link from "next/link";
import Collect from "../svg/big_collect.svg";
import styles from "./HomeFooter.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.top_border} />
      <div className={styles.contact}>
        <div className={styles.col}>
          <span className={styles.address}>
            100A Broadway #377
            <br /> Brooklyn, NY 11249
          </span>
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
        </div>

        <div className={styles.col}>
          <div className={styles.reachout}>
            <span className={styles.phone}>
              <a href="mailto:info@collect.nyc">info@collect.nyc</a>
            </span>
            <span className={styles.phone}>+1 718 902 4911</span>
          </div>
          <div className={styles.extra}>
            <Link href="/info/privacy">Privacy</Link>
            <Link href="/info/impressum">Impressum</Link>
          </div>
        </div>
      </div>
      <figure className={styles.collect}>
        <Collect />
      </figure>
    </footer>
  );
};

export default Footer;
