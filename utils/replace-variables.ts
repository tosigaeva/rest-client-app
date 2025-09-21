export const replaceVariables = (text: string, variables: Record<string, string>): string => {
  return text.replace(/\{\{([^}]+)\}\}/g, (_, key) => variables[key] || `{{${key}}}`);
};
