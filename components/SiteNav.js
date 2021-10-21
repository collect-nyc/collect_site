import HomeNav from "../components/HomeNav";
import ArchiveNav from "../components/ArchiveNav";
import ProfileNav from "../components/ProfileNav";

const SiteNav = ({ page, count, latest, tags }) => {
  return (
    <div>
      {
        {
          index: <HomeNav count={count} />,
          archive_index: (
            <ArchiveNav count={count} latest={latest} tags={tags} />
          ),
          profile: <ProfileNav count={count} />,
        }[page]
      }
    </div>
  );
};

export default SiteNav;
