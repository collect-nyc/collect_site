// ./deskStructure.js

export const myStructure = (S) =>
  S.list()
    .title("Site Content")
    .items([
      S.listItem()
        .title("Global Content")
        .child(S.document().schemaType("global").documentId("global")),
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
        (listItem) =>
          !["global", "home", "services", "about"].includes(listItem.getId())
      ),
    ]);
