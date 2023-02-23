import HomeNav from "../components/HomeNav";
import ArchiveNav from "./ArchiveNav";
import ArchiveItemNav from "../components/ArchiveItemNav";
import CaseStudyNav from "../components/CaseStudyNav";
import ProfileNav from "../components/ProfileNav";
import EssentialTextNav from "./EssentialTextNav";
import EssentialText from "../pages/info/[slug]";

const SiteNav = ({
  page,
  count,
  latest,
  tags,
  case_study,
  project_title,
  globalContent,
}) => {
  return (
    <>
      {
        {
          index: <HomeNav count={count} globalContent={globalContent} />,
          archive_index: (
            <ArchiveNav count={count} latest={latest} tags={tags} />
          ),
          archive_item: (
            <ArchiveItemNav
              count={count}
              latest={latest}
              tags={tags}
              case_study={case_study}
              project_title={project_title}
            />
          ),
          case_study: (
            <ProfileNav count={count} globalContent={globalContent} />
          ),
          project: <CaseStudyNav />,
          profile: <ProfileNav count={count} globalContent={globalContent} />,
          essential_text: <EssentialTextNav count={count} />,
        }[page]
      }
    </>
  );
};

export default SiteNav;
