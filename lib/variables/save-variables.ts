import { RowType } from '@/type';

export const saveVariables = (
  rows: RowType[],
  variables: Record<string, string>,
  username: string | undefined,
  setVariables: (user: string, variables: Record<string, string>) => void,
  setVariablesState: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  setRows: React.Dispatch<React.SetStateAction<RowType[]>>,
) => {
  if (!username) return;

  const newVariables = { ...variables };
  const newRows = rows.map((row) => {
    if (row.variable && row.value) {
      newVariables[row.variable] = row.value;
      return { ...row, saved: true };
    }
    return row;
  });

  setVariables(username, newVariables);
  setVariablesState(newVariables);
  setRows(newRows);
};
