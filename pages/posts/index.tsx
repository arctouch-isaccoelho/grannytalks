import {
  Container,
  Stack,
  StackDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import { createClient } from "../../services/prismic";
import { ListItem } from "../../src/components/ListItem";
import Head from "next/head";
import type { GetStaticProps } from "next";

type PrismicImage = {
  dimensions: {};
  alt: string;
  copyright: string | null;
  url: string;
};

type Post = {
  id: string;
  title: string;
  heading: [];
  image: PrismicImage;
};

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts — grannytalks</title>
        <meta
          name="description"
          content="Exclusive terror stories coming from the granny 👵, don't waste your time. Subscribe now!"
        />
      </Head>
      <Container maxW={"2xl"} py={"8rem"}>
        <Stack
          spacing={4}
          divider={
            <StackDivider
              borderColor={useColorModeValue("gray.300", "gray.700")}
            />
          }
        >
          {posts.map((post) => (
            <ListItem key={post.id} {...post} />
          ))}
        </Stack>
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient(previewData);

  const postsResult = await client.getByType("post");

  const posts = postsResult.results.map((post) => {
    return {
      id: post.uid,
      title: post.data.title,
      heading: post.data.heading,
      image: post.data.image,
    };
  });

  return {
    props: {
      posts,
    },
  };
};
