import Prismic from "prismic-javascript";
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
      Prismic.Predicates.at("document.type", "archive_item"),
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

  // OLD TAGS PULL
  // const everything = await fetch(
  //   "https://collectnyc.cdn.prismic.io/api/v2"
  // ).then((res) => res.json());

  // NEW TAGS PULL
  const tags = await fetch("https://collectnyc.cdn.prismic.io/api/tags").then(
    (res) => res.json()
  );

  // const tags = everything.tags;

  totalCount = data.length + mediaCount;

  // console.log("Total Count", totalCount);

  // const jsondata = JSON.stringify(newarchives);
  const jsondata = JSON.stringify({
    data: data,
    count: data.length,
    media: totalCount,
    tags: tags,
    profile: document.data?.latest,
  });
  res.status(200).json(jsondata);
}
