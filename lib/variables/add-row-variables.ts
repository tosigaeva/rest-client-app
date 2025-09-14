import { Dispatch, SetStateAction } from 'react';

import { RowType } from '@/type';

export const addRow = (rows: RowType[], setRows: Dispatch<SetStateAction<RowType[]>>) => {
  setRows([...rows, { saved: false, value: '', variable: '' }]);
};
