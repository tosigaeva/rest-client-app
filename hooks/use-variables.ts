import { useEffect, useState } from 'react';

export type RowType = {
  saved: boolean;
  value: string;
  variable: string;
};

export const useVariables = (
  getVariables: () => Record<string, string>,
  setVariables: (variables: Record<string, string>) => void,
) => {
  const [rows, setRows] = useState<RowType[]>([{ saved: false, value: '', variable: '' }]);
  const [variables, setVariablesState] = useState<Record<string, string>>({});

  useEffect(() => {
    setVariablesState(getVariables());
  }, [getVariables]);

  const handleSave = () => {
    const newVariables = { ...variables };
    const newRows = rows.map((row) => {
      if (row.variable && row.value) {
        newVariables[row.variable] = row.value;
        return { ...row, saved: true };
      }
      return row;
    });

    setVariables(newVariables);
    setVariablesState(newVariables);
    setRows(newRows);
  };

  const handleInputChange = (index: number, field: keyof RowType, value: string) => {
    const newRows = rows.map((row, i) => {
      if (i === index) {
        return { ...row, [field]: value };
      }
      return row;
    });

    setRows(newRows);
    if (index === rows.length - 1 && value !== '') {
      setRows([...newRows, { saved: false, value: '', variable: '' }]);
    }
  };

  const handleDelete = (index: number) => {
    const row = rows[index];
    if (row.saved) {
      const newVariables = { ...variables };
      delete newVariables[row.variable];
      setVariables(newVariables);
      setVariablesState(newVariables);
    }

    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  return {
    handleDelete,
    handleInputChange,
    handleSave,
    rows,
    variables,
  };
};
