export const getVariables = (user: string) => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(`variables-${user}`);
    return saved ? JSON.parse(saved) : {};
  }
  return {};
};

export const setVariables = (user: string, variables: Record<string, string>) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`variables-${user}`, JSON.stringify(variables));
  }
};
