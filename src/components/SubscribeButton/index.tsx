import { Button, Spinner } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "../../../services/api";
import { getStripeJs } from "../../../services/stripe.js";

type SubscribeButtonProps = {
  price: number;
};

export function SubscribeButton({ price }: SubscribeButtonProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    if (session.activeSubscription) {
      router.push("/posts");
      return;
    }

    try {
      const response = await api.post("/subscribe");
      const { sessionId } = response.data;

      const stripe = await getStripeJs();
      stripe?.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err);
    }
  }

  return (
    <Button
      colorScheme={"yellow"}
      rounded={"full"}
      w="100%"
      h="3rem"
      fontSize={22}
      transition={"all .2s ease"}
      _hover={{
        transform: "scale(1.05)",
      }}
      onClick={() => {
        setLoading(true);
        handleSubscribe();
      }}
    >
      Get exclusive access for just {price}
      {loading ? <Spinner size="sm" alignContent={"center"} ml={2} /> : <></>}
    </Button>
  );
}
