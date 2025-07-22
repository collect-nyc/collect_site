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
            15 Maiden Lane
            <br /> Ste. 1003
            <br /> New York, NY 10038
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
            <span className={styles.insta}>
              <a
                href="https://www.instagram.com/appliedpoetics.ltd"
                target="_blank"
                rel="noreferrer"
              >
                @collect.nyc
              </a>
            </span>
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
