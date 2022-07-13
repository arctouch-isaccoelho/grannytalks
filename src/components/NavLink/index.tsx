import React, { useEffect, useState } from "react";
import {
  Link as ChakraLink,
  LinkProps,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/react";

interface NavLinkProps extends LinkProps {
  children?: string | React.ReactNode;
  to: string;
  activeProps?: LinkProps;
  _hover?: LinkProps;
}

export function NavLink({
  to,
  activeProps,
  children,
  _hover,
  ...props
}: NavLinkProps) {
  const router = useRouter();
  const isActive = router.pathname === to;
  const color = useColorModeValue("black", "selected");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    if (isActive) setLoading("");
  }, [isActive]);

  if (isActive) {
    return (
      <Link href={to}>
        <ChakraLink
          fontWeight="bold"
          {...props}
          {...activeProps}
          _hover={{ color: "selected" }}
          color={color}
          transform={"scale(1.1)"}
        >
          {children}
        </ChakraLink>
      </Link>
    );
  }

  return (
    <Link href={to}>
      <ChakraLink
        {...props}
        _hover={{ color: "selected", textDecoration: "underline" }}
        onClick={() => setLoading(to)}
      >
        {children}
        {loading === to ? (
          <Spinner size="xs" alignContent={"center"} ml={1} />
        ) : (
          ""
        )}
      </ChakraLink>
    </Link>
  );
}
