// ./deskStructure.js

export const myStructure = (S) =>
  S.list()
    .title("Site Content")
    .items([
      S.listItem()
        .title("Home Page")
        .child(S.document().schemaType("home").documentId("home")),
      S.listItem()
        .title("Services Page")
        .child(S.document().schemaType("services").documentId("services")),
      S.listItem()
        .title("About Page")
        .child(S.document().schemaType("about").documentId("about")),
      ...S.documentTypeListItems().filter(
        (listItem) => !["home", "services", "about"].includes(listItem.getId())
      ),
    ]);
