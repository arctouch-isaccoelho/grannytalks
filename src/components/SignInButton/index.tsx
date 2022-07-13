import { Button, Image, Spinner } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaGithub, FaSignOutAlt } from "react-icons/fa";

export function SignInButton() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof session !== "undefined") setLoading(false);
  }, [session]);

  return session ? (
    <Button
      leftIcon={
        <Image
          borderRadius="full"
          boxSize="25px"
          src={session.user?.image || ""}
          fit={"cover"}
          alt={"avatar image"}
        />
      }
      rightIcon={<FaSignOutAlt onClick={() => signOut()} />}
      colorScheme="yellow"
      variant="outline"
      rounded={"full"}
    >
      {session.user?.name}
    </Button>
  ) : (
    <Button
      leftIcon={<FaGithub />}
      colorScheme="yellow"
      variant="outline"
      rounded={"full"}
      onClick={() => {
        setLoading(true);
        signIn("github");
      }}
      rightIcon={
        loading ? <Spinner size="xs" alignContent={"center"} ml={1} /> : <></>
      }
    >
      Login with Github
    </Button>
  );
}
