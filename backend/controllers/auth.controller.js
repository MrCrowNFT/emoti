import bcrypt from "bcrypt";
import db from "../db/db";

//todo maybe add email to db
export const signup = async (req, res) => {
  try {
    const { username, profile_pic, password } = req.body;

    if (!username?.trim() || !password?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Missing username or password",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //id is primary key, no need to add it manually
    const insert = db.prepare(
      `
        INSERT INTO users (username, profile_pic, password_hash)
        VALUES (?,?,?)
        `
    );
    const result = insert.run(username, profile_pic || null, hashedPassword);
    return res
      .status(201)
      .json({ success: true, userId: result.lastInsertRowid });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT") {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
  } catch (error) {}
};

export const refreshAccessToken = async (req, res) => {
  try {
  } catch (error) {}
};

export const logout = async (req, res) => {
  try {
  } catch (error) {}
};
