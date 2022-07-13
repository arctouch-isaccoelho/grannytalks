import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  HStack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Logo } from "../Logo";
import { NavLink } from "../NavLink";
import { SignInButton } from "../SignInButton";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box
        bg={useColorModeValue("yellow.200", "yellow.800")}
        px={4}
        position={"fixed"}
        w={"100%"}
      >
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          maxW={"5xl"}
          margin={"auto"}
        >
          <Flex>
            <Stack direction={"row"} spacing={7} alignItems="center">
              <Logo />
              <NavLink to="/">Home</NavLink>
              <NavLink to="/posts">Posts</NavLink>
            </Stack>
          </Flex>
          <HStack>
            <SignInButton />
            <Button
              onClick={toggleColorMode}
              bgColor={"transparent"}
              transition={"color 0.2s linear"}
              _hover={{
                bgColor: "transparent",
                color: useColorModeValue("yellow.700", "yellow.200"),
              }}
              _active={{ bgColor: "transparent" }}
            >
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}
