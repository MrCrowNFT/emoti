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
export const getChat = async (user1Id, user1Id) => {
  try {
    const chat = db
      .prepare(
        `
            SELECT * FROM chats
            WHERE (user1_id = ? AND user2_id =?) OR (user1_id = ? AND user2_id = ?)
            `
      )
      .get(user1Id, user2Id, user2Id, user1Id);

    return chat;
  } catch (error) {
    console.error("Error getting chat:", error);
    throw error;
  }
};

//create new chat between two users
export const createChat = async (user1Id, user2Id) => {
  try {
    const info = db
      .prepare(
        `
        INSERT INTO chats (user1_id, user2_id)
        VALUES (?, ?)
      `
      )
      .run(user1Id, user2Id);

    const chat = db
      .prepare("SELECT * FROM chats WHERE id = ?")
      .get(info.lastInsertRowid);
    return chat;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};

//
