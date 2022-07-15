import { Button, Image, Spinner } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaGithub, FaSignOutAlt } from "react-icons/fa";

export function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Spinner size="sm" alignContent={"center"} />;
  }

  function handleSignIn(event: React.MouseEvent<HTMLButtonElement>) {
    event.currentTarget.disabled = true;
    signIn("github");
  }

  function handleSignOut(event: React.MouseEvent<HTMLButtonElement>) {
    event.currentTarget.disabled = true;
    signOut();
  }

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
      rightIcon={<FaSignOutAlt />}
      colorScheme="yellow"
      variant="outline"
      rounded={"full"}
      onClick={(event) => handleSignOut(event)}
    >
      {session.user?.name}
    </Button>
  ) : (
    <Button
      leftIcon={<FaGithub />}
      colorScheme="yellow"
      variant="outline"
      rounded={"full"}
      onClick={(event) => handleSignIn(event)}
    >
      Login with Github
    </Button>
  );
}
