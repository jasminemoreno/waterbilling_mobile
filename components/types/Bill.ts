export type Bill = {
    id: number;
    meter_no?: string;
    consumption?: number;
    total: number;
    billing_date?: string;
    due_date?: string;
    created_at?: string;
    month?: string; // computed for PayBills
    status: string;
  };