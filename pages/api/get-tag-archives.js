import Prismic from "prismic-javascript";
import { Client } from "../../lib/prismic-config";

export default async function handler(req, res) {
  let { name, paginate } = req.body;
  const archives = await Client().query(
    [
      Prismic.Predicates.at("document.type", "archive_item"),
      Prismic.Predicates.at("document.tags", [name]),
    ],
    { pageSize: 20, page: paginate }
  );

  const jsondata = JSON.stringify(archives);
  res.status(200).json(jsondata);
}
