import React, { useState } from "react";
import MemoryContext from "../components/MemoryContext";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const [layoutView, setLayoutView] = useState(false);
  const Layout = Component.Layout ? Component.Layout : React.Fragment;

  return (
    <MemoryContext.Provider
      value={{
        layoutView: layoutView,
        setLayoutView: setLayoutView,
      }}
    >
      <Layout page={pageProps.page}>
        <Component {...pageProps} />
      </Layout>
    </MemoryContext.Provider>
  );
}

export default MyApp;
