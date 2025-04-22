import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../config/constants";

/**
 * Validates that all required environment variables exist
 * @param {string[]} requiredVars - Array of required environment variable names
 * @throws {Error} If any required variable is missing
 */
const validateEnvironmentVars = (requiredVars) => {
  const missing = requiredVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
};

/**
 * Generate an access token for a user
 * @param {Object} user - User object containing id and username
 * @returns {string} JWT access token
 * @throws {Error} If required environment variables are missing
 */
export const generateAccessToken = (user) => {
  validateEnvironmentVars(["JWT_ACCESS_SECRET"]);

  if (!user || !user.id || !user.username) {
    throw new Error("Invalid user object provided");
  }

  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
};

/**
 * Generate a refresh token for a user
 * @param {Object} user - User object containing id and username
 * @returns {string} JWT refresh token
 * @throws {Error} If required environment variables are missing
 */
export const generateRefreshToken = (user) => {
  validateEnvironmentVars(["JWT_REFRESH_SECRET"]);

  if (!user || !user.id || !user.username) {
    throw new Error("Invalid user object provided");
  }
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
};

/**
 * Generate both access and refresh tokens for a user
 * @param {Object} user - User object containing id and username
 * @returns {Object} Object containing accessToken and refreshToken
 * @throws {Error} If required environment variables are missing
 */
export const generateTokens = (user) => {
  validateEnvironmentVars(["JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET"]);

  if (!user || !user.id || !user.username) {
    throw new Error("Invalid user object provided");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { accessToken, refreshToken };
};
