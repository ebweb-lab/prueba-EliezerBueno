import { Request, Response } from 'express';
import { db } from '../config/firebase';
import { Card, CardInput } from '../types/card';

const validateCardNumber = (cardNumber: string): string | null => {
    if (!cardNumber) return 'El número de tarjeta es requerido';
    if (!/^\d+$/.test(cardNumber)) return 'El número de tarjeta debe contener solo dígitos';
    if (cardNumber.length !== 16) return 'El número de tarjeta debe contener 16 dígitos';
    return null;
};

const validateExpirationDate = (expirationDate: string): string | null => {
    if (!expirationDate) return 'La fecha de vencimiento es requerida';

    const regex = /^(\d{2})\/(\d{2})$/;
    const match = expirationDate.match(regex);

    if (!match) return 'Formato inválido. Use MM/YY';

    const month = parseInt(match[1], 10);
    const year = parseInt(match[2], 10);

    if (month < 1 || month > 12) return 'Mes inválido (01-12)';

    const currentYear = new Date().getFullYear() % 100;
    const maxYear = currentYear + 5;

    if (year < 22 || year > maxYear) return `Año inválido (22-${maxYear})`;

    return null;
};

const validateCardholderName = (name: string): string | null => {
    if (!name) return 'El nombre del titular es requerido';
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) return 'El nombre solo puede contener letras';
    if (name.length > 20) return 'El nombre no puede exceder 20 caracteres';
    return null;
};

const validateCVV = (cvv: string): string | null => {
    if (!cvv) return 'El CVV es requerido';
    if (!/^\d+$/.test(cvv)) return 'El CVV debe contener solo dígitos';
    if (cvv.length < 3 || cvv.length > 4) return 'El CVV debe tener 3 o 4 dígitos';
    return null;
};

export const getAllCards = async (req: Request, res: Response): Promise<void> => {
    try {
        const cardsSnapshot = await db.collection('cards').get();
        const cards: Card[] = [];

        cardsSnapshot.forEach(doc => {
            cards.push({
                id: doc.id,
                ...doc.data() as Omit<Card, 'id'>
            });
        });

        res.status(200).json(cards);
    } catch (error) {
        console.error('Error getting cards:', error);
        res.status(500).json({ error: 'Error al obtener las tarjetas' });
    }
};

export const getCardById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const cardDoc = await db.collection('cards').doc(id).get();

        if (!cardDoc.exists) {
            res.status(404).json({ error: 'Tarjeta no encontrada' });
            return;
        }

        res.status(200).json({
            id: cardDoc.id,
            ...cardDoc.data() as Omit<Card, 'id'>
        });
    } catch (error) {
        console.error('Error getting card:', error);
        res.status(500).json({ error: 'Error al obtener la tarjeta' });
    }
};

export const createCard = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cardNumber, expirationDate, cardholderName, cvv }: CardInput = req.body;

        if (!cardNumber || !expirationDate || !cardholderName || !cvv) {
            res.status(400).json({
                error: 'Todos los campos son requeridos',
                required: ['cardNumber', 'expirationDate', 'cardholderName', 'cvv']
            });
            return;
        }

        const cardNumberError = validateCardNumber(cardNumber);
        if (cardNumberError) {
            res.status(400).json({ error: cardNumberError });
            return;
        }

        const expirationDateError = validateExpirationDate(expirationDate);
        if (expirationDateError) {
            res.status(400).json({ error: expirationDateError });
            return;
        }

        const cardholderNameError = validateCardholderName(cardholderName);
        if (cardholderNameError) {
            res.status(400).json({ error: cardholderNameError });
            return;
        }

        const cvvError = validateCVV(cvv);
        if (cvvError) {
            res.status(400).json({ error: cvvError });
            return;
        }

        const newCard: Omit<Card, 'id'> = {
            cardNumber,
            expirationDate,
            cardholderName,
            cvv,
            createdAt: new Date().toISOString()
        };

        const docRef = await db.collection('cards').add(newCard);

        res.status(201).json({
            id: docRef.id,
            ...newCard
        });
    } catch (error) {
        console.error('Error creating card:', error);
        res.status(500).json({ error: 'Error al crear la tarjeta' });
    }
};

export const updateCard = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { cardNumber, expirationDate, cardholderName, cvv } = req.body;

        const cardRef = db.collection('cards').doc(id);
        const cardDoc = await cardRef.get();

        if (!cardDoc.exists) {
            res.status(404).json({ error: 'Tarjeta no encontrada' });
            return;
        }

        const updateData: Partial<Card> = {};
        if (cardNumber) updateData.cardNumber = cardNumber;
        if (expirationDate) updateData.expirationDate = expirationDate;
        if (cardholderName) updateData.cardholderName = cardholderName;
        if (cvv) updateData.cvv = cvv;
        updateData.updatedAt = new Date().toISOString();

        await cardRef.update(updateData);

        const updatedDoc = await cardRef.get();
        res.status(200).json({
            id: updatedDoc.id,
            ...updatedDoc.data() as Omit<Card, 'id'>
        });
    } catch (error) {
        console.error('Error updating card:', error);
        res.status(500).json({ error: 'Error al actualizar la tarjeta' });
    }
};

export const deleteCard = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const cardRef = db.collection('cards').doc(id);
        const cardDoc = await cardRef.get();

        if (!cardDoc.exists) {
            res.status(404).json({ error: 'Tarjeta no encontrada' });
            return;
        }

        await cardRef.delete();

        res.status(200).json({
            message: 'Tarjeta eliminada exitosamente',
            id
        });
    } catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).json({ error: 'Error al eliminar la tarjeta' });
    }
};
