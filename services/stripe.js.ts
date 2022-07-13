import { loadStripe } from "@stripe/stripe-js";

export async function getStripeJs() {
  const stripeJs = await loadStripe(
    <string>process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
  );
  return stripeJs;
}
