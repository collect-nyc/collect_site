import * as prismic from "@prismicio/client";
import { Client } from "../../lib/prismic-config";

export default async function handler(req, res) {
  // const newarchives = await Client().query(
  //   Prismic.Predicates.at("document.type", "archive_item"),
  //   { pageSize: 100, page: 1 }
  // );

  const data = [];
  let pageNum = 1;
  let lastResult = [];
  let mediaCount = 0;
  let totalCount;

  // Loop through pages of results and add those results to a storage array
  do {
    const resp = await Client().query(
      prismic.Predicates.at("document.type", "archive_item"),
      { pageSize: 100, page: pageNum }
    );

    lastResult = resp;

    data.push(...resp.results);

    pageNum++;
    // console.log("Page Num", pageNum);
  } while (lastResult.next_page !== null);

  data.forEach((item) => {
    const images = item.data.images ? item.data.images.length : 0;
    mediaCount = mediaCount + images;
    // console.log(mediaCount);
  });

  //Page Data
  const document = await Client().getSingle("profile");
  let cs_count = 0;
  let cs_images = 0;
  const cstudies = await Client()
    .getSingle("home_page", {
      fetchLinks: [
        // "archive_item.background_color",
        // "archive_item.item_type",
        // "archive_item.title",
        // "archive_item.description",
        "archive_item.images",
      ],
    })
    .then((res) => {
      console.log("CASE STUDIES", res.data.body1.length);
      cs_count = res.data.body1.length;

      res.data.body1.forEach((item) => {
        const images = item.primary.case_study_link.data.images
          ? item.primary.case_study_link.data.images.length
          : 0;
        cs_images = cs_images + images;
        // console.log("CS IMage Count", cs_images);
      });
    });

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

  console.log("Total Count", totalCount);

  res.status(200).json({
    // data: data,
    count: data.length,
    media: totalCount,
    tags: tags,
    profile: document.data?.latest,
  });
}
