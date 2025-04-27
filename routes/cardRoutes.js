//taskRoutes.js

import express, { Router } from 'express';
import { viewDecks, viewCards, easyQuiz, hardQuiz } from '../controllers/cardController.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.get('/', viewDecks);
router.get('/decks/:id', viewCards);
router.get('/decks/:id/easyquiz', easyQuiz);
router.get('/decks/:id/hardquiz', hardQuiz);

export default router;