import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import { MoralisDappProvider } from "../src/providers/MoralisDappProvider/MoralisDappProvider";

const APP_ID = "exW1tdLP6HIC7SFX7WTySWgkHziZVShwA0DZxNlg";
const SERVER_URL = "https://govdtsjcruxd.usemoralis.com:2053/server";

function Hackfs({ Component, pageProps }: AppProps) {
  const isServerInfo = APP_ID && SERVER_URL ? true : false;
  //validate
  if (!APP_ID || !SERVER_URL) throw new Error("Missing Moralis Credentials");
  if (isServerInfo)
    return (
      <MoralisProvider
        appId={APP_ID}
        serverUrl={SERVER_URL}
        initializeOnMount={true}
      >
        <MoralisDappProvider>
          <Component {...pageProps} />
        </MoralisDappProvider>
      </MoralisProvider>
    );
}

export default Hackfs;
