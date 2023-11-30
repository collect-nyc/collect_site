// ./deskStructure.js

export const myStructure = (S) =>
  S.list()
    .title("Site Content")
    .items([
      S.listItem()
        .title("Home Page")
        .child(S.document().schemaType("home").documentId("home")),
      ...S.documentTypeListItems().filter(
        (listItem) => !["home"].includes(listItem.getId())
      ),
    ]);
