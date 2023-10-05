export interface Invoice {
  id: number;
  createdBy: string;
  createdDate: Date;
  lastModifiedBy: string;
  lastModifiedDate: Date;
  invoiceId: string;
  merchantUsername: string;
  merchantName: string;
  customerUsername: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  status: number;
  amount: number;
  serviceFee: number;
  totalAmount: number;
  narration: string;
}
