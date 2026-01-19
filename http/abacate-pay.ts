import { ABACATE_PAY_URL, WEBHOOK_API_SECRET } from "@/consts/abacate-pay-config";

interface UserDataProps {
  name: string;
  cellphone: string;
  email: string;
  taxId: string;
}

export default function createClient(user: UserDataProps) {
  const fakeUser = {
    name: "Matheus Altrão",
    cellphone: "67999271900",
    email: "matheus@gmail.com",
    taxId: "46888270831",
  };

  const options = {
    method: "POST",
    headers: { Authorization: `Bearer ${WEBHOOK_API_SECRET}`, "Content-Type": "application/json" },
    body: JSON.stringify(fakeUser),
  };

  fetch(`${ABACATE_PAY_URL}/v1/customer/create`, options)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}
