import HomeNav from "../components/HomeNav";
import ArchiveNav from "../components/ArchiveNav";
import CaseStudyNav from "../components/CaseStudyNav";
import ProfileNav from "../components/ProfileNav";
import EssentialTextNav from "./EssentialTextNav";
import EssentialText from "../pages/info/[slug]";

const SiteNav = ({ page, count, latest, tags, case_study }) => {
  console.log("siteNav: ", page);
  return (
    <>
      {
        {
          index: <HomeNav count={count} />,
          archive_index: (
            <ArchiveNav
              count={count}
              latest={latest}
              tags={tags}
              case_study={case_study}
            />
          ),
          project: <CaseStudyNav />,
          profile: <ProfileNav count={count} />,
          essential_text: <EssentialTextNav />,
        }[page]
      }
    </>
  );
};

export default SiteNav;
