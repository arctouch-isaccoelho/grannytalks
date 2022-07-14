import {
  Container,
  Image,
  Heading,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { PrismicRichText } from "@prismicio/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { createClient } from "../../../services/prismic";

type PrismicImage = {
  dimensions: {};
  alt: string;
  copyright: string | null;
  url: string;
};

type PostProps = {
  id: string;
  title: string;
  heading: [];
  body: [];
  image: PrismicImage;
};

export default function Post(item: PostProps) {
  const color = useColorModeValue("black", "white");
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${item.id}`);
    }
  }, [session, router, item.id]);

  return (
    <>
      <Head>
        <title>{item.title.toString()} — grannytalks</title>
        <meta name="description" content="Test" />
      </Head>
      <Container
        maxW={"4xl"}
        py={"2rem"}
        background={`linear-gradient(${color}, transparent)`}
        backgroundClip={"text"}
        flex={1}
      >
        <Heading
          as="h1"
          fontFamily={"Nanum Pen Script, cursive"}
          fontSize={"6xl"}
        >
          {item.title}
        </Heading>
        <Image
          src={item.image.url}
          fit={"cover"}
          alt={item.image.alt}
          h={200}
          w={"100%"}
          mb={6}
        />
        <PrismicRichText field={item.body} />
        <Button
          w={"full"}
          padding={6}
          colorScheme={"yellow"}
          mt={6}
          variant="outline"
          rounded={"full"}
          fontSize={"xl"}
        >
          You need to be subscribed to view the rest of this content 😔
        </Button>
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as any;

  const client = createClient();

  const postResult = await client.getByUID("post", slug);

  const post = {
    id: postResult.uid,
    title: postResult.data.title,
    heading: postResult.data.heading,
    body: postResult.data.body.splice(0, 2),
    image: postResult.data.image,
  };

  return {
    props: post,
    revalidate: 60 * 30,
  };
};
