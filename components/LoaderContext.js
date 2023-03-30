import React, { createContext } from "react";

const LoaderContext = createContext({
  loaderDidRun: false,
  setLoaderDidRun: () => {},
  animationDidRun: false,
  setAnimationDidRun: () => {},
});

export default LoaderContext;
