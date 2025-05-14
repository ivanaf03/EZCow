export const checkPasswords = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const checkPasswordLength = (password) => {
  return password.length >= 8;
};

export const checkEmail = (email) => {
  return email.includes("@") && email.includes(".");
};