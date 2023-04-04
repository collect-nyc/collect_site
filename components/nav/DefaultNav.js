import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import MemoryContext from "../MemoryContext";
import NavContent from "./NavContent";
import styles from "./Nav.module.scss";

const DefaultNav = ({ page, newCount, count, globalContent, showNav }) => {
  return (
    <>
      <nav
        className={`${styles.navigation} ${
          page === "archive_index" && styles.archive
        }`}
      >
        <NavContent
          page={page}
          newCount={newCount}
          count={count}
          globalContent={globalContent}
          showNav={showNav}
        />
      </nav>
    </>
  );
};

export default DefaultNav;
