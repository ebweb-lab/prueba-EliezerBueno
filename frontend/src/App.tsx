import { useState, useEffect } from 'react';
import CardPreview from './components/CardPreview';
import CardForm from './components/CardForm';
import SavedCardsList from './components/SavedCardsList';
import type { Card, FormData } from './types';
import { cardAPI } from './services/api';
import './App.css';

function App() {
  const [formData, setFormData] = useState<FormData>({
    cardNumber: '',
    expirationDate: '',
    cardholderName: '',
    cvv: '',
  });

  const [savedCards, setSavedCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      const cards = await cardAPI.getAllCards();
      setSavedCards(cards);
      setError(null);
    } catch (err) {
      console.error('Error loading cards:', err);
      setError('Error al cargar las tarjetas');
    }
  };

  const handleFormChange = (data: FormData) => {
    setFormData(data);
  };

  const handleSubmit = async () => {
    try {
      const newCard = await cardAPI.createCard({
        cardNumber: formData.cardNumber,
        expirationDate: formData.expirationDate,
        cardholderName: formData.cardholderName,
        cvv: formData.cvv,
      });

      setSavedCards([...savedCards, newCard]);
      setError(null);

      setFormData({
        cardNumber: '',
        expirationDate: '',
        cardholderName: '',
        cvv: '',
      });
    } catch (err) {
      console.error('Error creating card:', err);
      setError(err instanceof Error ? err.message : 'Error al crear la tarjeta');
    }
  };

  const handleCancel = () => {
    setFormData({
      cardNumber: '',
      expirationDate: '',
      cardholderName: '',
      cvv: '',
    });
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Gestión de Tarjetas</h1>

      {error && (
        <div style={{
          padding: '12px 20px',
          backgroundColor: '#fee2e2',
          color: '#dc2626',
          borderRadius: '8px',
          marginBottom: '16px',
          maxWidth: '600px'
        }}>
          {error}
        </div>
      )}

      <div className={`main-layout ${savedCards.length > 0 ? 'has-cards' : ''}`}>
        <div className="card-section">
          <CardPreview
            cardNumber={formData.cardNumber}
            cardholderName={formData.cardholderName}
            expirationDate={formData.expirationDate}
          />

          <div className="form-container">
            <CardForm
              formData={formData}
              onFormChange={handleFormChange}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        </div>

        <div className="sidebar">
          <SavedCardsList cards={savedCards} />
        </div>
      </div>
    </div>
  );
}

export default App;
