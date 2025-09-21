export const PASSWORD_MIN_LENGTH = 8;

export const hasUppercase = (value: string) => /\p{Lu}/u.test(value);
export const hasLowercase = (value: string) => /\p{Ll}/u.test(value);
export const hasNumber = (value: string) => /[0-9]/.test(value);
export const hasSpecialChar = (value: string) => /[^\p{L}\p{N}]/u.test(value);
export const hasMinLength = (value: string, length = PASSWORD_MIN_LENGTH) => value.length >= length;
