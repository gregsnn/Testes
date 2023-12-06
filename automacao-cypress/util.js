export const normalizeUsername = (username) => {
  const newUsername = username.replaceAll(/[^a-z]/g, '').toLowerCase();
  return newUsername;
}