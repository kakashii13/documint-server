import bcrytp from "bcrypt";
import { HttpException } from "../services/httpException";

const saltRounds = 10;
export const hashValue = async (value: string): Promise<string> => {
  try {
    const hashedValue = await bcrytp.hash(value, saltRounds);
    return hashedValue;
  } catch (error) {
    throw new HttpException(500, `Error hashing value: ${error}`);
  }
};
