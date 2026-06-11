export interface User{
    email: string;
    img?: string;
    mobile: string;
    gender: string;
    name: string;
    businessName: string;
    businessType: string;
    address: string;
    zipCode: string;
}

export interface Customer{
    name: string;
    mobile: string;
    address?: string;
    moneyToGive?: {
        [txnId: string]: {
            amount: number;
            date: string;
            note: string;
        };
    };
     moneyToTake?: {
        [txnId: string]: {
            amount: number;
            date: string;
            note: string;
        };
    };
    totalTake: number;
    totalGive: number;
}
export type CustomersWithId ={
    customerId: string
} & Customer