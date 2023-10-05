export interface order {
  id: 0;
  createdBy: string;
  createdDate: Date;
  lastModifiedBy: string;
  lastModifiedDate: Date;
  orderId: string;
  invoiceId: string;
  merchantUsername: string;
  merchantName: string;
  customerUsername: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  amount: number;
  serviceFee: number;
  totalAmount: number;
  narration: string;
  complaintId: string;
  status: number;
  stages: {
    id: number;
    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
    orderId: number;
    status: number;
    stage: string;
  };
}

export interface stage {
  id: number;
  createdBy: string;
  createdDate: Date;
  lastModifiedBy: string;
  lastModifiedDate: Date;
  orderId: number;
  status: number;
  stage: string;
}
export interface orderDetails {
  orderId: string;
  invoiceId: string;
  merchantUsername: string;
  merchantName: string;
  customerUsername: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  amount: number;
  serviceFee: number;
  totalAmount: number;
  narration: string;
  complaintId: string;
  status: number;
  id: number;
  createdBy: Date;
  createdDate: Date;
  lastModifiedBy: Date;
  lastModifiedDate: Date;
  stages: stage[];
}
