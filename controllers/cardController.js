import { viewDecksDB, viewCardsDB, selectDeckDB } from "../models/cardModel.js";

export const viewDecks = async (req, res) => {
    try{
        const decks = await viewDecksDB();
        res.render('decks', {
            decks
        });
    }catch(error){
        res.status(500).send("An error occured while fetching decks.")
    }
};

export const viewCards = async (req, res) => {
    const id = req.params.id;
    try{
        const cards = await viewCardsDB(id);
        const deck = await selectDeckDB(id);
        const decks = await viewDecksDB();
        res.render('cards', {
            cards,
            deck,
            decks
        });
    }catch(error){
        res.status(500).send("An error occured while fetching cards.")
    }
};

export const easyQuiz = async (req, res) => {
    const id = req.params.id;
    try{
        const cards = await viewCardsDB(id);
        const deck = await selectDeckDB(id);
        res.render('easyquiz', {
            cards,
            deck
        });
    }catch(error){
        res.status(500).send("An error occured while fetching cards.")
    }
};

export const hardQuiz = async (req, res) => {
    const id = req.params.id;
    try{
        const cards = await viewCardsDB(id);
        const deck = await selectDeckDB(id);
        res.render('hardquiz', {
            cards,
            deck
        });
    }catch(error){
        res.status(500).send("An error occured while fetching cards.")
    }
};