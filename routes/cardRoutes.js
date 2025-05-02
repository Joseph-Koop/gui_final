//taskRoutes.js

import express, { Router } from 'express';
import { viewDecks, addDeck, deleteDeck, viewCards, easyQuiz, hardQuiz } from '../controllers/cardController.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.get('/', viewDecks);
router.get('/add', addDeck);
router.get('/delete', deleteDeck);
router.get('/decks/:id', viewCards);
router.get('/decks/:id/easyquiz', easyQuiz);
router.get('/decks/:id/hardquiz', hardQuiz);

export default router;