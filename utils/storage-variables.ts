export const getVariables = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('variables');
    return saved ? JSON.parse(saved) : {};
  }
  return {};
};

export const setVariables = (variables: Record<string, string>) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('variables', JSON.stringify(variables));
  }
};
