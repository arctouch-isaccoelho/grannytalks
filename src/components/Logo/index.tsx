import { Flex, Heading, Image } from "@chakra-ui/react";

export function Logo() {
  return (
    <Flex alignItems={"center"}>
      <Image
        src="/images/icon.svg"
        width={30}
        height={30}
        alt={"logo for the granny"}
        mr={2}
      />
      <Heading fontFamily={"Nanum Pen Script, cursive"}>grannytalks</Heading>
    </Flex>
  );
}
