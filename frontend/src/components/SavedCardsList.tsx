import type { Card } from '../types';
import './SavedCardsList.css';

interface SavedCardsListProps {
    cards: Card[];
}

export default function SavedCardsList({ cards }: SavedCardsListProps) {
    const maskCardNumber = (cardNumber: string): string => {
        if (cardNumber.length !== 16) return cardNumber;
        const first4 = cardNumber.slice(0, 4);
        const last4 = cardNumber.slice(-4);
        return `${first4}${'*'.repeat(8)}${last4}`;
    };

    if (cards.length === 0) {
        return null;
    }

    return (
        <div className="saved-cards-list">
            <h2>Tarjetas Guardadas</h2>
            <div className="cards-container">
                {cards.map((card) => (
                    <div key={card.id} className="saved-card-item">
                        <div className="card-icon">
                            <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                                <rect width="32" height="24" rx="4" fill="#5b4cfa" fillOpacity="0.1" />
                                <rect x="2" y="8" width="28" height="3" fill="#5b4cfa" fillOpacity="0.3" />
                                <rect x="2" y="14" width="12" height="2" rx="1" fill="#5b4cfa" fillOpacity="0.5" />
                            </svg>
                        </div>
                        <div className="card-details">
                            <div className="card-number-masked">{maskCardNumber(card.cardNumber)}</div>
                            <div className="card-meta">
                                <span className="card-holder-name">{card.cardholderName}</span>
                                <span className="card-expiry">{card.expirationDate}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
