import { useEffect, useState, useContext, useRef } from "react";
import Link from "next/link";
import MemoryContext from "./MemoryContext";
import styles from "../styles/Nav.module.scss";
import Carot from "../svg/carot.svg";
import { useRouter } from "next/router";

const HomeNav = ({ page, count, latest, tags }) => {
  const router = useRouter();
  const { navTextColor } = useContext(MemoryContext);

  // State
  // const [filterOpen, setFilterOpen] = useState(false);

  return (
    // <nav
    //   className={`${styles.navigation} ${styles.casestudy}`}
    //   style={navTextColor ? { color: navTextColor } : null}
    // >
    //   <div className={styles.top_left}>
    //     <div className={styles.link_box}>
    //       <Link href={"/archive"}>
    //         <a>COLLECT New York City</a>
    //       </Link>
    //     </div>
    //   </div>
    //   <div className={styles.top_right}>
    //     <button>Archive View</button>
    //     <button>Project Info</button>
    //   </div>
    // </nav>
    null
  );
};

export default HomeNav;
