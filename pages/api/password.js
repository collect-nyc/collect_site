import Prismic from "prismic-javascript";
import { Client } from "../../lib/prismic-config";

// export default async function handler(req, res) {
//     const newarchives = await Client().query(
//         Prismic.Predicates.at("document.type", "archive_item"),
//         { pageSize: 100 }
//     );

//     const jsondata = JSON.stringify(newarchives);
//     res.status(200).json(jsondata);
// }

export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/json");

    try {
        const { slug, passwordField } = JSON.parse(req.body);

        if (passwordField == "") {
            throw { message: "Please enter a password." };
        }

        const query = await Client().query(
            Prismic.Predicates.at("my.archive_item.uid", slug)
        );

        const secret = query.results[0].data.password;

        if (secret !== passwordField) {
            throw { message: "Password is not correct." };
        }

        res.statusCode = 200;
        res.json({ success: true });
    } catch (error) {
        res.statusCode = 403;
        res.json({ message: error.message });
    } finally {
        res.statusCode = 500;
    }
}
