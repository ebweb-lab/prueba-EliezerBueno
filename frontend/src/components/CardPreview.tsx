import './CardPreview.css';

interface CardPreviewProps {
    cardNumber: string;
    cardholderName: string;
    expirationDate: string;
}

export default function CardPreview({ cardNumber, cardholderName, expirationDate }: CardPreviewProps) {
    const formatCardNumber = (number: string) => {
        if (!number) return '#### #### #### ####';
        const padded = number.padEnd(16, '#');
        return padded.match(/.{1,4}/g)?.join(' ') || '#### #### #### ####';
    };

    return (
        <div className="card-preview">
            <div className="card-header">
                <div className="card-brand">
                    <span className="brand-name">monobank</span>
                    <span className="bank-name">Universal Bank</span>
                </div>
                <div className="contactless-icon">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M8 15C8 11.134 11.134 8 15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M11 15C11 13.343 12.343 12 14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M5 15C5 9.477 9.477 5 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
            </div>

            <div className="card-chip">
                <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
                    <rect width="40" height="32" rx="4" fill="#E5C77E" />
                    <rect x="4" y="4" width="8" height="8" rx="1" fill="#D4AF37" />
                    <rect x="14" y="4" width="8" height="8" rx="1" fill="#D4AF37" />
                    <rect x="24" y="4" width="8" height="8" rx="1" fill="#D4AF37" />
                    <rect x="4" y="14" width="8" height="8" rx="1" fill="#D4AF37" />
                    <rect x="14" y="14" width="8" height="8" rx="1" fill="#D4AF37" />
                    <rect x="24" y="14" width="8" height="8" rx="1" fill="#D4AF37" />
                </svg>
            </div>

            <div className="card-number">
                {formatCardNumber(cardNumber)}
            </div>

            <div className="card-footer">
                <div className="card-holder">
                    <div className="card-label">VALID<br />THRU</div>
                    <div className="card-info">
                        <div className="cardholder-name">
                            {cardholderName || 'NOMBRE TITULAR'}
                        </div>
                        <div className="expiration-date">
                            {expirationDate || '##/##'}
                        </div>
                    </div>
                </div>
                <div className="card-logos">
                    <div className="card-type">world</div>
                    <div className="mastercard-logo">
                        <div className="circle red"></div>
                        <div className="circle yellow"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
