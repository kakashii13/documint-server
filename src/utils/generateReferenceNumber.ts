import { nanoid } from "nanoid";

export const generateReferenceNumber = (): string => {
  const prefix = "REF-";
  const uniquePart = nanoid(10);
  return `${prefix}${uniquePart}`;
};
