export interface BillingResponseProps {
  data: {
    allowCoupons: boolean;
    amount: number;
    coupons: string[];
    couponsUsed: string[];
    createdAt: string;
    customer: CustomerProps;
    devMode: boolean;
    frequency: "ONE_TIME";
    id: string;
    methods: string[];
    paidAmount: number;
    products: { externalId: string; id: string; quantity: number }[];
    status: "PENDING" | "PAID" | "CANCELED";
    updatedAt: string;
    url: string;
  };
  error: null | string;
  success: boolean;
}

export interface CustomerProps {
  id: string;
  metadata: {
    name: string;
    cellphone: string;
    taxId: string;
    email: string;
    zipCode: string;
  };
}

export interface CustomerResponseProps {
  success: boolean;
  data: CustomerProps;
  error: null | string;
}
