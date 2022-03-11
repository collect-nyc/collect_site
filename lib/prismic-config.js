import * as prismic from "@prismicio/client";

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME;
const REF_API_URL = `https://${REPOSITORY}.cdn.prismic.io/api/v2`;

export const apiEndpoint = REF_API_URL;
export const accessToken = process.env.PRISMIC_API_TOKEN;

// Client method to query documents from the Prismic repo
export const Client = (req = null) =>
  prismic.createClient(apiEndpoint, createClientOptions(req, accessToken));

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
