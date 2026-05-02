export type Bill = {
    id: number;
    meter_no?: string;
    consumption?: number;
    total: number;
    billing_date?: string;
    due_date?: string;
    month?: string; // computed for PayBills
    status: string;
  };