import { RootProvider } from "@/context/root";
import "@/lib/styles/index.scss";
import customTheme from "@/lib/styles/theme";
import {
  ChakraProvider,
  createLocalStorageManager,
  CSSReset,
} from "@chakra-ui/react";

import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

const themeMode = createLocalStorageManager("pageTheme");

function MyApp({ Component, pageProps }: AppProps) {
  const [isServer, setIsServer] = useState(true);

  useEffect(() => {
    setIsServer(false);
  }, []);

  if (isServer) return <></>;

  return (
    <ChakraProvider theme={customTheme} colorModeManager={themeMode}>
      <CSSReset />
      <RootProvider>
        <Component {...pageProps} />
      </RootProvider>
    </ChakraProvider>
  );
}

export default MyApp;
