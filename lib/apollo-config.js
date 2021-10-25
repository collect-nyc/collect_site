import { PrismicLink } from "apollo-link-prismic";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
const accessToken = process.env.PRISMIC_API_TOKEN;
const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME;
const REF_API_URL = `https://${REPOSITORY}.prismic.io/graphql`;
import fragmentTypes from "./fragmentTypes.json";

//NOTE: You can test GraphQL queries at https://collectnyc.prismic.io/graphql

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: fragmentTypes,
});

export const apolloClient = new ApolloClient({
  link: PrismicLink({
    uri: REF_API_URL,
    accessToken: accessToken,
  }),
  cache: new InMemoryCache({ fragmentMatcher }),
});
