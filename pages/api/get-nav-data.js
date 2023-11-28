import { Client } from "../../lib/prismic-config";

export default async function handler(req, res) {
  const data = [];
  // let pageNum = 1;
  let lastResult = [];
  let mediaCount = 0;
  let totalCount;

  const resp = await Client().getAllByType("archive_item");

  lastResult = resp;

  console.log("Archive Items", lastResult.length);

  data.push(...resp);

  // pageNum++;

  data.forEach((item) => {
    const images = item.data.images ? item.data.images.length : 0;
    mediaCount = mediaCount + images;
    // console.log(mediaCount);
  });

  //Profile Data
  const document = await Client().getSingle("profile");

  // Set up variables for case studies counting
  let cs_count = 0;
  let cs_images = 0;

  // pull case study data from homepage
  const cstudies = await Client()
    .getSingle("home_page", {
      fetchLinks: ["archive_item.images"],
    })
    .then((res) => {
      // console.log("CASE STUDIES", res.data.body1.length);
      cs_count = res.data.body1.length;

      // iterate through case studies and count images
      res.data.body1.forEach((item) => {
        const images = item.primary.case_study_link.data.images
          ? item.primary.case_study_link.data.images.length
          : 0;
        cs_images = cs_images + images;
        // console.log("CS IMage Count", cs_images);
      });
    });

  // pull services data from Global Content
  const globalContent = await Client().getSingle("global_content");

  // OLD TAGS PULL
  // const everything = await fetch(
  //   "https://collectnyc.cdn.prismic.io/api/v2"
  // ).then((res) => res.json());

  // NEW TAGS PULL
  const tags = await fetch("https://collectnyc.cdn.prismic.io/api/tags").then(
    (res) => res.json()
  );

  // const tags = everything.tags;

  totalCount = data.length + mediaCount + cs_count + cs_images;

  // console.log("Total Count", totalCount);

  res.status(200).json({
    // data: data,
    count: data.length,
    media: totalCount,
    tags: tags,
    profile: document.data?.latest,
    globalContent: globalContent.data ? globalContent.data : null,
  });
}
