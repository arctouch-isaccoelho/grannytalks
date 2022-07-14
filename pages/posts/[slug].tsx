import { Container, Image, Heading } from "@chakra-ui/react";
import { PrismicRichText } from "@prismicio/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { createClient } from "../../services/prismic";

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
  return (
    <>
      <Head>
        <title>{item.title.toString()} — grannytalks</title>
        <meta name="description" content="Test" />
      </Head>
      <Container maxW={"4xl"} py={"2rem"} flex={1}>
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
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });

  const { slug } = params as any;

  const client = createClient(req);

  const postResult = await client.getByUID("post", slug);

  const post = {
    id: postResult.uid,
    title: postResult.data.title,
    heading: postResult.data.heading,
    body: postResult.data.body,
    image: postResult.data.image,
  };

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: `/posts/preview/${post.id}`,
        permanent: false,
      },
    };
  }

  return {
    props: post,
  };
};
