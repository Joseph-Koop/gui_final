import { viewDecksDB, viewCardsDB, addCardDB, editCardDB, deleteCardDB, selectDeckDB, addDeckDB, deleteDeckDB } from "../models/cardModel.js";

export const viewDecks = async (req, res) => {
    try{
        const decks = await viewDecksDB();
        res.render('decks', {
            decks
        });
    }catch(error){
        console.error(error);
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
        console.error(error);
        res.status(500).send("An error occured while fetching cards.")
    }
};

export const addDeck = async (req, res) => {
    const { name } = req.body;
    if(!name || name.length > 100){
        return res.status(400).json({ err: "Name must be between 1 and 100 characters long." });
    }

    try{
        const result = await addDeckDB(name);

        res.status(200).json({ deck: result, res: "Deck added successfully." });
    }catch(error){
        console.error(error);
        res.status(500).json({ err: "An error occured while adding deck." });
    }
}

export const deleteDeck = async (req, res) => {
    const { id } = req.body;
    if(!id || isNaN(id)){
        return res.status(400).json({ err: "Deck not found." });
    }

    try{
        const result = await deleteDeckDB(id);
        res.json({ deck: result, res: "Deck deleted successfully." });
    }catch(error){
        console.error(error);
        res.status(500).json({ err: "An error occured while deleting deck." });
    }
}

export const addCard = async (req, res) => {
    const { question, answer, deckId } = req.body;
    if(!question || question.length > 100){
        return res.status(400).json({ err: "Question must be between 1 and 100 characters long." });
    }

    if(!answer || answer.length > 100){
        return res.status(400).json({ err: "Answer must be between 1 and 100 characters long." });
    }

    try{
        const result = await addCardDB(question, answer, deckId);

        res.status(200).json({ card: result, res: "Card added successfully." });
    }catch(error){
        console.error(error);
        res.status(500).json({ err: "An error occured while adding card." });
    }
}

export const editCard = async (req, res) => {
    const { id, question, answer } = req.body;
    if(!id || isNaN(id)){
        return res.status(400).json({ err: "Card not found." });
    }
    
    if(!question || question.length > 100){
        return res.status(400).json({ err: "Question must be between 1 and 100 characters long." });
    }

    if(!answer || answer.length > 100){
        return res.status(400).json({ err: "Answer must be between 1 and 100 characters long." });
    }

    try{
        const result = await editCardDB(id, question, answer);

        res.status(200).json({ card: result, res: "Card updated successfully." });
    }catch(error){
        console.error(error);
        res.status(500).json({ err: "An error occured while updating card." });
    }
}

export const deleteCard = async (req, res) => {
    const { id } = req.body;
    if(!id || isNaN(id)){
        return res.status(400).json({ err: "Card not found." });
    }
    try{
        const result = await deleteCardDB(id);
        res.json({ card: result, res: "Card deleted successfully." });
    }catch(error){
        console.error(error);
        res.status(500).json({ err: "An error occured while deleting card." });
    }
}

export const quiz = async (req, res) => {
    const id = req.params.id;
    try{
        const cards = await viewCardsDB(id);
        const deck = await selectDeckDB(id);
        res.render('quiz', {
            cards,
            deck
        });
    }catch(error){
        console.error(error);
        res.status(500).send("An error occured while fetching cards.")
    }
};