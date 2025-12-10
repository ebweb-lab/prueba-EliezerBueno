export interface Card {
    id: string;
    cardNumber: string;
    expirationDate: string;
    cardholderName: string;
    cvv: string;
}

export interface FormErrors {
    cardNumber?: string;
    expirationDate?: string;
    cardholderName?: string;
    cvv?: string;
}

export interface FormData {
    cardNumber: string;
    expirationDate: string;
    cardholderName: string;
    cvv: string;
}
