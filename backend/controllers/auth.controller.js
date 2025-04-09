import bcrypt from "bcrypt";
import db from "../db/db";
import { generateTokens } from "../helpers/auth.helper";

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
    const { username, password } = req.body;

    if (!username?.trim() || !password?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Missing username or password",
      });
    }

    const select = db.prepare(
      `
        SELECT id, username, profile_pic, password_hash FROM users
        WHERE username = ?;
        `
    );
    const user = select.get(username);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res
        .status(403)
        .json({ success: false, message: "Wrong password" });
    }

    const userForToken = {
      id: user.id,
      username: user.username,
    };

    const { accessToken, refreshToken } = generateTokens(userForToken);

    //todo need to create a refresh token table
    //todo store the refresh token into the new table
    //todo error handle if failed to store the refresh token

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      data: {
        id: user.id,
        username: user.username,
        profile_pic: user.profile_pic,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
  } catch (error) {}
};

export const logout = async (req, res) => {
  try {
  } catch (error) {}
};
