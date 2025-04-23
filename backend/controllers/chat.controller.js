import db from "../db/db";

//save message on db
export const saveMessage = async ({ chatId, senderId, content }) => {
  try {
    const stmt = db.prepare(`
            INSERT INTO messages (chat_id, sender_id, content)
            CALUES (?,?,?)
            `);
    const info = stmt.run(chatId, senderId, content);

    // Return the saved message with its ID
    const savedMessage = db
      .prepare(
        `
        SELECT m.*, u.username as sender_name
        FROM messages m
        JOIN users u ON m.sender_id = u.id
        WHERE m.id = ?
      `
      )
      .get(info.lastInsertRowid);

    return savedMessage;
  } catch (error) {
    console.error("Error saving message:", error);
    throw error;
  }
};

//get messages in chat

//create new chat between two users

//
