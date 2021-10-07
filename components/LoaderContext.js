import React, { createContext } from "react";

const LoaderContext = createContext({
  loaderDidRun: false,
  setLoaderDidRun: () => {},
});

export default LoaderContext;
