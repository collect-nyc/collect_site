import Prismic from "prismic-javascript";
import { Client } from "../../lib/prismic-config";

export default async function handler(req, res) {
  let { name } = req.body;
  const archives = await Client().query([
    Prismic.Predicates.at("document.type", "archive_item"),
    Prismic.Predicates.at("document.tags", [name]),
    // { pageSize: 100 },
  ]);

  const jsondata = JSON.stringify(archives);
  res.status(200).json(jsondata);
}

// export default async function handler(req, res) {
//   let { id } = req.body;

//   const data = await fetchAPI(`
//     query {
//       allArchive_items(where : {tags: {tag: "${id}"}}) {
//         edges {
//           node {
//             title
//             description
//             images {
//               image
//               video {
//                 _linkType

//                 ... on _FileLink {
//                   name
//                   url
//                   size
//                 }
//               }
//             }
//             tags {
//               tag {
//                 __typename
//                 _linkType
//                 ... on Archiv{
//                   tag_name
//                 }
//                 ... on _Document{
//                   _meta {
//                     id
//                   }
//                 }
//               }
//             }
//             creation_date
//             password_protected
//             _meta {
//               uid
//             }
//           }
//         }
//       }
//     }
//   `);

//   const jsondata = JSON.stringify(data.allArchive_items.edges);
//   res.status(200).json(jsondata);
// }
