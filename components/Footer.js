import Link from "next/link";
import styles from "../styles/Footer.module.scss";

const Footer = ({ page, count, latest, tags, case_study }) => {
  // console.log("siteNav: ", page);
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        ©{new Date().getFullYear()} Collect NYC, All Rights Reserved
      </div>
      <div className={styles.links}>
        <Link href="/info/privacy">Privacy</Link>
        <Link href="/info/impressum">Impressum</Link>
      </div>
    </footer>
  );
};

export default Footer;
