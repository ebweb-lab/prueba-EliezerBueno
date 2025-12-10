import type { Card } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const cardAPI = {
    async getAllCards(): Promise<Card[]> {
        const response = await fetch(`${API_URL}/cards`);
        if (!response.ok) {
            throw new Error('Error al obtener las tarjetas');
        }
        return response.json();
    },

    async getCardById(id: string): Promise<Card> {
        const response = await fetch(`${API_URL}/cards/${id}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Tarjeta no encontrada');
            }
            throw new Error('Error al obtener la tarjeta');
        }
        return response.json();
    },

    async createCard(card: Omit<Card, 'id'>): Promise<Card> {
        const response = await fetch(`${API_URL}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(card),
        });

        if (!response.ok) {
            if (response.status === 400) {
                const error = await response.json();
                throw new Error(error.error || 'Datos inválidos');
            }
            throw new Error('Error al crear la tarjeta');
        }
        return response.json();
    },

    async updateCard(id: string, card: Partial<Card>): Promise<Card> {
        const response = await fetch(`${API_URL}/cards/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(card),
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Tarjeta no encontrada');
            }
            throw new Error('Error al actualizar la tarjeta');
        }
        return response.json();
    },

    async deleteCard(id: string): Promise<void> {
        const response = await fetch(`${API_URL}/cards/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Tarjeta no encontrada');
            }
            throw new Error('Error al eliminar la tarjeta');
        }
    },
};
