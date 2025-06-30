import bcrytp from "bcrypt";
import { HttpException } from "../services/httpException";

const saltRounds = 10;
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcrytp.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new HttpException(500, `Error hashing password: ${error}`);
  }
};
