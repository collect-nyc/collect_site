import HomeNav from "../components/HomeNav";

const SiteNav = ({ page, count, latest, tags }) => {
  return (
    <div>
      {
        {
          index: <HomeNav count={count} latest={latest} tags={tags} />,
        }[page]
      }
    </div>
  );
};

export default SiteNav;
