import { ABACATE_PAY_URL } from "@/consts/abacate-pay-config";

interface OptionsProps {
  method: string;
  headers: {
    Authorization: string;
    "Content-Type": string;
  };
  body: string;
}

export async function createCustomer(options: OptionsProps) {
  fetch(`${ABACATE_PAY_URL}/v1/customer/create`, options)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}
