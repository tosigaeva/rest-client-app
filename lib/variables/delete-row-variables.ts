import { Dispatch, SetStateAction } from 'react';

import { RowType } from '@/type';

export const deleteRowVariables = (
  index: number,
  rows: RowType[],
  variables: Record<string, string>,
  username: string | undefined,
  setVariables: (user: string, variables: Record<string, string>) => void,
  setVariablesState: Dispatch<SetStateAction<Record<string, string>>>,
  setRows: Dispatch<SetStateAction<RowType[]>>,
) => {
  const row = rows[index];
  if (row.saved && username) {
    const newVariables = { ...variables };
    delete newVariables[row.variable];
    setVariables(username, newVariables);
    setVariablesState(newVariables);
  }

  const newRows = [...rows];
  newRows.splice(index, 1);
  setRows(newRows);
};
