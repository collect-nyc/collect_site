import { Client } from "../../lib/prismic-config";
import { client } from "../../sanity.config";

export default async function handler(req, res) {
  const data = [];
  let lastResult = [];
  let mediaCount = 0;
  let totalCount;

  const resp = await Client().getAllByType("archive_item");

  lastResult = resp;

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
  let projectcount = 0;
  let projectimages = 0;
  let selectedclients = 0;
  let servicesoffered = 0;
  let aboutdata = 0;

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
  const gcNew = await client.fetch(`*[_type == "global"]{
    title,
    description,
    services,
  }`);
  const gcdata = gcNew[0];

  const home = await client
    .fetch(
      `*[_type == "home"]{
    title,
    metadesc,
    statement,
    "projects": projects[]->{
      images[] {
        "url": asset->url,
        "type": asset->mimeType,
        "alt": alt,
      },
    }
  }`
    )
    .then((res) => {
      projectcount = res[0].projects ? res[0].projects.length : 0;

      res[0].projects.forEach((item) => {
        const images = item.images ? item.images.length : 0;
        projectimages = projectimages + images;
      });

      // console.log("home", res, res[0].projects.length, projectimages);
    });

  const services = await client
    .fetch(
      `*[_type == "services"]{
      "offerings": offering[]->{
        title,
        description,
        slug,
        examples,
        images[] {
          "url": asset->url,
          "alt": alt,
        },
      },
    }`
    )
    .then((res) => {
      servicesoffered = res[0].offerings ? res[0].offerings.length : 0;
      // console.log("services", res, res[0].offerings.length);
    });

  const about = await client
    .fetch(
      `*[_type == "about"]{
      newbusiness,
      hiring,
      founders,
      ourpractice,
      "nycimage": nycimage.asset->url,
      "hvimage": hvimage.asset->url,
      instagram,
      sociallinks,
      editions,
      selectedclients,
      clients
    }`
    )
    .then((res) => {
      aboutdata = res[0] ? Object.keys(res[0]).length : 0;
      selectedclients = res[0].clients ? res[0].clients.length : 0;
      // console.log("about", res, typeof res, aboutdata, selectedclients);
    });

  // NEW TAGS PULL
  const tags = await fetch("https://collectnyc.cdn.prismic.io/api/tags").then(
    (res) => res.json()
  );

  // const tags = everything.tags;

  totalCount =
    data.length +
    mediaCount +
    cs_count +
    cs_images +
    projectcount +
    projectimages +
    servicesoffered +
    aboutdata +
    selectedclients;

  // console.log("Total Count", totalCount);

  res.status(200).json({
    count: totalCount,
    media: totalCount,
    tags: tags,
    profile: document.data?.latest,
    globalContent: gcdata ? gcdata : null,
  });
}
