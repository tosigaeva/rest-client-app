export const PASSWORD_MIN_LENGTH = 8;

export const hasUppercase = (value: string) => /[A-ZА-Я]/.test(value);
export const hasLowercase = (value: string) => /[a-zа-я]/.test(value);
export const hasNumber = (value: string) => /[0-9]/.test(value);
export const hasSpecialChar = (value: string) => /[^A-Za-z0-9]/.test(value);
export const hasMinLength = (value: string, length = PASSWORD_MIN_LENGTH) => value.length >= length;
