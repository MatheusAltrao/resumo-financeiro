"use server";

interface CreateCustomerActionProps {
  name: string;
  email: string;
}

interface CustomerResponseProps {
  success: boolean;
  data: {
    id: string;
    metadata: {
      name: string;
      cellphone: string;
      taxId: string;
      email: string;
      zipCode: string;
    };
  };
  error: null | string;
}

export async function createCustomerAction(user: CreateCustomerActionProps) {
  const fakeUser = {
    name: user.name,
    cellphone: "",
    email: user.email,
    taxId: "",
  };

  const options = {
    method: "POST",
    headers: { Authorization: "Bearer abc_dev_DnAH4Je1Ljbrky52PG13c3qc", "Content-Type": "application/json" },
    body: JSON.stringify(fakeUser),
  };

  try {
    const response = await fetch("https://api.abacatepay.com/v1/customer/create", options);
    const data: CustomerResponseProps = await response.json();
    const userId = data.data.id;

    return userId;
  } catch (error) {
    console.error("Erro ao criar cliente no Abacate Pay:", error);
  }
}
