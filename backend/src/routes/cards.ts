import { Router } from 'express';
import {
    getAllCards,
    getCardById,
    createCard,
    updateCard,
    deleteCard
} from '../controllers/cardController';

const router = Router();

router.get('/', getAllCards);
router.get('/:id', getCardById);
router.post('/', createCard);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);

export default router;
