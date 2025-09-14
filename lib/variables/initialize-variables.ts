import { RowType } from '@/type';

export const initializeVariables = (
  username: string | undefined,
  getVariables: (user: string) => Record<string, string>,
  setRows: React.Dispatch<React.SetStateAction<RowType[]>>,
  setVariablesState: React.Dispatch<React.SetStateAction<Record<string, string>>>,
) => {
  if (!username) return;

  const savedVariables = getVariables(username);
  setVariablesState(savedVariables);

  const initialRows = Object.entries(savedVariables).map(([variable, value]) => ({
    saved: true,
    value,
    variable,
  }));

  if (initialRows.length === 0) {
    initialRows.push({ saved: false, value: '', variable: '' });
  }

  setRows(initialRows);
};
