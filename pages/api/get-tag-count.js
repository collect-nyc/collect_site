import * as prismic from "@prismicio/client";
import { Client } from "../../lib/prismic-config";

export default async function handler(req, res) {
  let { name } = req.query;

  let archives;

  if (name === "All Work") {
    archives = await Client().query(
      [prismic.Predicates.at("document.type", "archive_item")],
      { pageSize: 100, page: 1 }
    );
  } else {
    archives = await Client().query(
      [
        prismic.Predicates.at("document.type", "archive_item"),
        prismic.Predicates.at("document.tags", [name]),
      ],
      { pageSize: 100, page: 1 }
    );
  }

  const jsondata = JSON.stringify(archives.results_size);
  res.status(200).json(jsondata);
}
