import { useContext, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import MemoryContext from "./MemoryContext";
import styles from "../styles/Nav.module.scss";
import animateScrollTo from "animated-scroll-to";
import LeftArrow from "../svg/left-arrow.svg";

const CaseStudyNav = () => {
  const {
    navTextColor,
    archiveView,
    setArchiveView,
    caseStudyView,
    currentTag,
    runCSFade,
    setRunCSFade,
  } = useContext(MemoryContext);

  // State
  const [logoHover, setLogoHover] = useState(false);

  const ArchiveViewToggle = () => {
    setArchiveView(!archiveView);
  };

  return (
    <>
      {!archiveView && caseStudyView ? (
        <motion.nav
          className={`${styles.navigation} ${styles.casestudy}`}
          style={navTextColor ? { color: navTextColor } : null}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1] }}
          transition={{
            duration: 1,
            delay: 1.4,
            ease: "easeOut",
          }}
        >
          <style global jsx>{`
            .color_link {
              color: ${navTextColor};
            }
            .color_svg path {
              fill: ${navTextColor};
            }

            .nav_color_svg path {
              fill: #fafafa;
            }
          `}</style>
          <div className={styles.top_left}>
            <div className={styles.link_box}>
              <Link href={"/"}>
                <a
                  className="color_link"
                  onMouseEnter={() => {
                    setLogoHover(true);
                  }}
                  onMouseLeave={() => {
                    setLogoHover(false);
                  }}
                >
                  {logoHover ? "COLLECT Home" : "COLLECT New York City"}
                </a>
              </Link>
            </div>
            <div className={styles.mobile_back}>
              <Link
                href={
                  currentTag && currentTag !== "All Work"
                    ? `/archive?tag=${currentTag}`
                    : "/archive"
                }
              >
                <a className="color_link">
                  <LeftArrow className="nav_color_svg" /> Archive
                </a>
              </Link>
            </div>
          </div>
          <div className={styles.top_right}>
            <button className="color_link" onClick={() => ArchiveViewToggle()}>
              Archive View
            </button>
            <button
              className="color_link"
              onClick={() => {
                animateScrollTo(document.querySelector("#itemFooter"), {
                  // elementToScroll: window.document.querySelector("body"),
                  easing: (t) => {
                    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                  },
                  maxDuration: 1500,
                  minDuration: 800,
                  speed: 1000,
                  verticalOffset: 0,
                });
              }}
            >
              Project Info
            </button>
          </div>
        </motion.nav>
      ) : null}
    </>
  );
};

export default CaseStudyNav;
