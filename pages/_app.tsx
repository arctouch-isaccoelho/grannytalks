import {
  ChakraProvider,
  Container,
  extendTheme,
  StyleProps,
} from "@chakra-ui/react";
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
  useSystemColorMode: false,
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <PrismicProvider>
        <Container
          display={"flex"}
          flexDirection={"column"}
          minH={"100vh"}
          minW={"100%"}
          p={0}
        >
          <SessionProvider session={session}>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </SessionProvider>
        </Container>
      </PrismicProvider>
    </ChakraProvider>
  );
}

export default MyApp;
