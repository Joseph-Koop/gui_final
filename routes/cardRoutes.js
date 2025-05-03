//taskRoutes.js

import express, { Router } from 'express';
import { viewDecks, addDeck, deleteDeck, viewCards, addCard,editCard, deleteCard, quiz } from '../controllers/cardController.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.get('/', viewDecks);
router.post('/add', addDeck);
router.delete('/delete', deleteDeck);

router.get('/decks/:id', viewCards);
router.post('/decks/add', addCard);
router.put('/decks/edit', editCard);
router.delete('/decks/delete', deleteCard);

router.get('/decks/:id/quiz', quiz);

export default router;