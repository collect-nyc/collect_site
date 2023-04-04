import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import MemoryContext from "../MemoryContext";
import NavContent from "./NavContent";
import styles from "./Nav.module.scss";

const DefaultNav = ({ page, newCount, count, globalContent }) => {
  const { currentTag } = useContext(MemoryContext);

  // display new item from array every 1.5 second looping
  const [currentItem, setCurrentItem] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (globalContent && globalContent.services) {
  //       setCurrentItem((currentItem + 1) % globalContent.services.length);
  //     }
  //   }, 1500);

  //   return () => clearInterval(interval);
  // }, [currentItem, globalContent]);

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
        />
      </nav>
    </>
  );
};

export default DefaultNav;
