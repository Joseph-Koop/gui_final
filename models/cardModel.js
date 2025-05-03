import { query } from "../config/db.js";

export const viewDecksDB = async () => {
    const result = await query("SELECT * FROM decks");
    return result.rows;
};

export const addDeckDB = async (name) => {
    const result = await query("INSERT INTO decks(name) VALUES ($1) RETURNING *", [name]);
    return result.rows[0];
};

export const deleteDeckDB = async (id) => {
    const result = await query("DELETE FROM decks WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};

export const addCardDB = async (question, answer, deckId) => {
    const find = await query("SELECT * FROM decks WHERE id = $1", [deckId]);
    if(find.rows.length == 0){
        throw new Error("Matching deck not found.");
    }
    
    const result = await query("INSERT INTO cards(question, answer, deck_id) VALUES ($1, $2, $3) RETURNING *", [question, answer, deckId]);
    return result.rows[0];
};

export const editCardDB = async (id, question, answer) => {
    const result = await query("UPDATE cards SET question = $1, answer = $2 WHERE id = $3 RETURNING *", [question, answer, id]);
    return result.rows[0];
};

export const deleteCardDB = async (id) => {
    const result = await query("DELETE FROM cards WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};

export const selectDeckDB = async (id) => {
    const result = await query("SELECT * FROM decks WHERE id = $1", [id]);
    return result.rows[0];
};

export const viewCardsDB = async (id) => {
    const result = await query("SELECT * FROM cards WHERE deck_id = $1", [id]);
    return result.rows;
};