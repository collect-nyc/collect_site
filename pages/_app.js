import React from "react";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;

  return (
    <Layout page={pageProps.page}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
