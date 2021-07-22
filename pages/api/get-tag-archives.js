import Prismic from "prismic-javascript";

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME;
const REF_API_URL = `https://${REPOSITORY}.cdn.prismic.io/api/v2`;
const GRAPHQL_API_URL = `https://${REPOSITORY}.cdn.prismic.io/graphql`;
// export const API_URL = 'https://your-repo-name.cdn.prismic.io/api/v2'
const API_TOKEN = process.env.PRISMIC_API_TOKEN;
const API_LOCALE = process.env.PRISMIC_REPOSITORY_LOCALE;

const PrismicClient = Prismic.client(REF_API_URL, {
  accessToken: API_TOKEN,
});

async function fetchAPI(query, { previewData, variables } = {}) {
  const prismicAPI = await PrismicClient.getApi();
  const res = await fetch(
    `${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(variables)}`,
    {
      headers: {
        "Prismic-Ref": previewData?.ref || prismicAPI.masterRef.ref,
        "Content-Type": "application/json",
        "Accept-Language": API_LOCALE,
        Authorization: `Token ${API_TOKEN}`,
      },
    }
  );

  if (res.status !== 200) {
    console.log(await res.text());
    throw new Error("Failed to fetch API");
  }

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export default async function handler(req, res) {
  let { id } = req.body;

  const data = await fetchAPI(`
    query {
      allArchive_items(where : {tags: {tag: "${id}"}}) {
        edges {
          node {
            title
            description
            images {
              image
              video {
                _linkType

                ... on _FileLink {
                  name
                  url
                  size
                }
              }
            }
            tags {
              tag {
                __typename
                _linkType
                ... on Archiv{
                  tag_name
                }
                ... on _Document{
                  _meta {
                    id
                  }
                }
              }
            }
            creation_date
            password_protected
            _meta {
              uid
            }
          }
        }
      }
    }
  `);

  const jsondata = JSON.stringify(data.allArchive_items.edges);
  res.status(200).json(jsondata);
}
