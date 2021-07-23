import React from "react";

const SharedHead = () => {
  return (
    <React.Fragment>
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
      <meta name="msapplication-TileColor" content="#fafafa" />
      <meta name="theme-color" content="#fafafa" />
    </React.Fragment>
  );
};

export default SharedHead;
