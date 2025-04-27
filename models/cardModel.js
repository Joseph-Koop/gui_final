import { query } from "../config/db.js";

export const viewDecksDB = async () => {
    const result = await query("SELECT * FROM decks");
    return result.rows;
};

export const selectDeckDB = async (id) => {
    const result = await query("SELECT * FROM decks WHERE id = $1", [id]);
    return result.rows[0];
};

export const viewCardsDB = async (id) => {
    const result = await query("SELECT * FROM cards WHERE deck_id = $1", [id]);
    return result.rows;
};