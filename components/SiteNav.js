import HomeNav from "../components/HomeNav";
import ArchiveNav from "../components/ArchiveNav";

const SiteNav = ({ page, count, latest, tags }) => {
  return (
    <div>
      {
        {
          index: <HomeNav count={count} />,
          archive_index: (
            <ArchiveNav count={count} latest={latest} tags={tags} />
          ),
        }[page]
      }
    </div>
  );
};

export default SiteNav;
