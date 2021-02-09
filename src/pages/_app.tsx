import { Fragment } from "react";

import GlobalStyles from "../styles/global-style";

export default function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <GlobalStyles />
      <Component {...pageProps} />
    </Fragment>
  );
}
