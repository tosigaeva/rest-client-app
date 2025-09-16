import { RowType } from '@/type';

export const updateRowInputVariables = (
  index: number,
  field: keyof RowType,
  value: string,
  rows: RowType[],
  setRows: React.Dispatch<React.SetStateAction<RowType[]>>,
) => {
  const newRows = rows.map((row, i) => {
    if (i === index) {
      return { ...row, [field]: value };
    }
    return row;
  });

  setRows(newRows);
};
