import {
  Center,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { stripe } from "../services/stripe";
import { SubscribeButton } from "../src/components/SubscribeButton";

type HomeProps = {
  product: {
    priceId: string;
    amount: number;
  };
};

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home — grannytalks</title>
        <meta
          name="description"
          content="Grannytalks is one of the best terror stories blog on the Internet"
        />
      </Head>
      <Center maxW={"5xl"} flex={1} alignSelf={"center"}>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={10}
          alignItems={"center"}
        >
          <Stack spacing={4}>
            <Text
              textTransform={"uppercase"}
              color={"yellow.500"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("yellow.100", "yellow.900")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              SUBSCRIBE
            </Text>
            <Heading>Granny 👵 knows what you did last summer!</Heading>
            <Text color={"gray.500"} fontSize={"xl"}>
              Get access to exclusive terror stories 😱 coming from granny, do
              not miss this promotion, just {product.amount} or new knitting
              needles.
            </Text>
            <SubscribeButton price={product.amount} />
          </Stack>
          <Flex>
            <Image
              rounded={"md"}
              alt={"granny on computer"}
              src={"images/granny.png"}
              objectFit={"cover"}
            />
          </Flex>
        </SimpleGrid>
      </Center>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1LKTTBGyCdddsfGFANMEkAxZ");

  const productAmount: number = price.unit_amount ?? 1000;

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(productAmount / 100),
  };

  return {
    props: { product },
    revalidate: 60 * 60 * 2, // each 120 minutes
  };
};
