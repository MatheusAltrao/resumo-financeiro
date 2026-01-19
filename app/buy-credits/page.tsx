import { getCustomerId } from "@/actions/user/get-customer-id";
import InstructionsToPayment from "./components/instructions-to-payment";

export default async function BuyCreditsPage() {
  const customerCreated = await getCustomerId();

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <InstructionsToPayment customerId={customerCreated} />
    </div>
  );
}
