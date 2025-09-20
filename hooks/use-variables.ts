import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { addRow } from '@/lib/variables/add-row-variables';
import { deleteRowVariables } from '@/lib/variables/delete-row-variables';
import { initializeVariables } from '@/lib/variables/initialize-variables';
import { saveVariables } from '@/lib/variables/save-variables';
import { updateRowInputVariables } from '@/lib/variables/update-row-input-variables';
import { RowType, ServerUser } from '@/type';

export const useVariables = (
  user: ServerUser,
  getVariables: (user: string) => Record<string, string>,
  setVariables: (user: string, variables: Record<string, string>) => void,
) => {
  const [rows, setRows] = useState<RowType[]>([{ saved: false, value: '', variable: '' }]);
  const [variables, setVariablesState] = useState<Record<string, string>>({});
  const username = user?.uid || 'Guest';
  const t = useTranslations('variablesBlock');

  useEffect(() => {
    initializeVariables(username, getVariables, setRows, setVariablesState);
  }, [username, getVariables]);

  const handleSave = () => {
    const result = saveVariables(
      rows,
      variables,
      username,
      setVariables,
      setVariablesState,
      setRows,
      t,
    );
    if (!result.success) {
      toast.error(result.message || t('messageErrorUnknown'));
      return;
    }
    toast.success(t('messageSuccessful'));
  };

  const handleInputChange = (index: number, field: keyof RowType, value: string) => {
    updateRowInputVariables(index, field, value, rows, setRows);
  };

  const handleDelete = (index: number) => {
    deleteRowVariables(index, rows, variables, username, setVariables, setVariablesState, setRows);
  };

  const handleAddRow = () => {
    addRow(rows, setRows);
  };

  return {
    handleAddRow,
    handleDelete,
    handleInputChange,
    handleSave,
    rows,
    variables,
  };
};
