// ./deskStructure.js

export const myStructure = (S) =>
  S.list()
    .title("Site Content")
    .items([
      S.listItem()
        .title("Homepage Images")
        .child(S.document().schemaType("images").documentId("images")),
      S.listItem()
        .title("SEO Fields")
        .child(S.document().schemaType("seo").documentId("seo")),
      S.listItem()
        .title("Index Page")
        .child(S.document().schemaType("info").documentId("info")),
      ...S.documentTypeListItems().filter(
        (listItem) => !["images", "seo", "info"].includes(listItem.getId())
      ),
    ]);
