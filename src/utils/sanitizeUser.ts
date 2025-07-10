const sanitizeUser = (user: any) => {
  const { hash_password, ...sanitizedUser } = user;
  return sanitizedUser;
};
export default sanitizeUser;
