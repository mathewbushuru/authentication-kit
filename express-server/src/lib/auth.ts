import bcrypt from "bcrypt";
import { getUserById } from "../database/utils.js";

const SALT_ROUNDS = 10;

export async function hashPassword(plainPassword: string) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  return hashedPassword;
}

export async function checkUserPassword(
  plainPassword: string,
  hashedPassword: string
) {
  const matchResult = await bcrypt.compare(plainPassword, hashedPassword);
  return matchResult;
}