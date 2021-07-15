import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllArchives } from "../lib/api";
import styles from "../styles/Nav.module.scss";

const SiteNav = () => {
  // do some stuff

  return (
    <nav className={styles.navigation}>
      <Link href="/profile">
        <a className={styles.link_box}>
          <span>COLLECT Archive</span>
          <div className={styles.info}>
            <span className={styles.latest}>Latest</span>
            <span>(927)</span>
          </div>
        </a>
      </Link>
    </nav>
  );
};

export default SiteNav;
