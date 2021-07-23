import Prismic from "prismic-javascript";

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME;
const REF_API_URL = `https://${REPOSITORY}.cdn.prismic.io/api/v2`;
const GRAPHQL_API_URL = `https://${REPOSITORY}.cdn.prismic.io/graphql`;
// export const API_URL = 'https://your-repo-name.cdn.prismic.io/api/v2'
export const API_TOKEN = process.env.PRISMIC_API_TOKEN;
export const API_LOCALE = process.env.PRISMIC_REPOSITORY_LOCALE;

export const PrismicClient = Prismic.client(REF_API_URL, {
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

export async function getIndexPage() {
  const data = await fetchAPI(`
    query {
      allIndex_pages {
        edges {
          node {
            title
            date_range
            header_image
            footer_graphic
            _linkType
          }
        }
      }
    }
  `);

  return data?.allIndex_pages?.edges;
}

export async function getProfilePage() {
  const data = await fetchAPI(`
    query {
      allProfiles {
        edges {
          node {
            summary
            clients_and_collaborators {
              item
            }
            visual_offerings {
              item
            }
            technical_offerings {
              item
            }
            leadership_offerings {
              item
            }
            instruction
            andrew
            joshua
            instagrams {
              item
            }
            socials {
              item
            }
            phone
            address
            _linkType
          }
        }
      }
    }
  `);

  return data?.allProfiles?.edges;
}

export async function getAllTags() {
  const data = await fetchAPI(`
    query {
      allArchivs {
        edges {
          node {
            tag_name
            _meta {
              id
            }
          }
        }
      }
    }
  `);
  return data?.allArchivs?.edges;
}

export async function getAllArchivesWithSlug() {
  const data = await fetchAPI(`
    query {
      allArchive_items {
        edges {
          node {
            _meta {
              uid
            }
          }
        }
      }
    }
  `);
  return data?.allArchive_items?.edges;
}

export async function getAllArchives() {
  const data = await fetchAPI(`
    query {
      allArchive_items {
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
  return data?.allArchive_items?.edges;
}

export async function getArchiveItem(slug, previewData) {
  const data = await fetchAPI(
    `
    query PostBySlug($slug: String!, $lang: String!) {
      archive_item(uid: $slug, lang: $lang) {
        title
        description
        creation_date
        password_protected
        _meta {
          uid
        }
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
      }
    }
  `,
    {
      previewData,
      variables: {
        slug,
        lang: API_LOCALE,
      },
    }
  );

  return data;
}
