import { Flex, Heading, Image, Box, useColorModeValue } from "@chakra-ui/react";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";

type PrismicImage = {
  dimensions: {};
  alt: string;
  copyright: string | null;
  url: string;
};

interface ItemProps {
  id: string;
  title: string;
  image: PrismicImage;
  heading: [];
}

export function ListItem(item: ItemProps) {
  return (
    <Flex
      direction="row"
      align={"center"}
      transition={"transform 0.2s ease"}
      _hover={{ transform: "scale(1.05)" }}
      role="group"
      cursor={"pointer"}
    >
      <Image
        borderRadius="full"
        boxSize="100px"
        src={item.image.url}
        fit={"cover"}
        alt={item.image.alt}
        mr={4}
      />
      <Box style={{ flex: 12 }}>
        <Flex direction={"column"}>
          <Heading
            as="h1"
            fontFamily={"Nanum Pen Script, cursive"}
            transition={"color 0.1s ease"}
            _groupHover={{
              color: useColorModeValue("yellow.400", "yellow.700"),
              textShadow: "1px 1px black",
            }}
          >
            <Link href={`/posts/preview/${item.id}`}>{item.title}</Link>
          </Heading>
          <PrismicRichText field={item.heading} />
        </Flex>
      </Box>
    </Flex>
  );
}
