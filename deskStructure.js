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
      ...S.documentTypeListItems().filter(
        (listItem) => !["home", "services"].includes(listItem.getId())
      ),
    ]);
