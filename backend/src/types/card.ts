export interface Card {
    id?: string;
    cardNumber: string;
    expirationDate: string;
    cardholderName: string;
    cvv: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CardInput {
    cardNumber: string;
    expirationDate: string;
    cardholderName: string;
    cvv: string;
}
