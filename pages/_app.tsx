import { ChakraProvider, extendTheme, StyleProps } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { mode } from "@chakra-ui/theme-tools";
import { PrismicProvider } from "@prismicio/react";
import Header from "../src/components/Header";
import { Footer } from "../src/components/Footer";
import { SessionProvider } from "next-auth/react";

const theme = extendTheme({
  styles: {
    global: (props: StyleProps) => ({
      "html, body": {
        background: mode("gray.50", "gray.800")(props),
      },
    }),
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <PrismicProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </PrismicProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
