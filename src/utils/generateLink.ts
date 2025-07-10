import dotenv from "dotenv";
dotenv.config();

export const generateLink = (slug: string) => {
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  return `${baseUrl}/form/${slug}`;
};
