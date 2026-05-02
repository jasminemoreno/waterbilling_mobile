export type Bill = {
    id: number;
    month?: string;   // ✅ FIX (optional)
    billing_date?: string;
    total: number;
    status: string;
  };