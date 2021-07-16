import { ClickProvider } from "../context/state";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <ClickProvider>
      <Component {...pageProps} />
    </ClickProvider>
  );
}

export default MyApp;
