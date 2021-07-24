import Prismic from "@prismicio/client";

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME;
const REF_API_URL = `https://${REPOSITORY}.cdn.prismic.io/api/v2`;
const TAG_API_URL = `https://${REPOSITORY}.cdn.prismic.io/api/tags`;

export const apiEndpoint = REF_API_URL;
export const apiTagEndpoint = TAG_API_URL;
export const accessToken = process.env.PRISMIC_API_TOKEN;

// Client method to query documents from the Prismic repo
export const Client = (req = null) =>
  Prismic.client(apiEndpoint, createClientOptions(req, accessToken));

const createClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {};
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {};
  return {
    ...reqOption,
    ...accessTokenOption,
  };
};

export const TagClient = (req = null) =>
  Prismic.client(apiTagEndpoint, createTagClientOptions(req, accessToken));

const createTagClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {};
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {};
  return {
    ...reqOption,
    ...accessTokenOption,
  };
};
