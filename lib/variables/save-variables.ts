import { RowType } from '@/type';

export const saveVariables = (
  rows: RowType[],
  variables: Record<string, string>,
  username: string | undefined,
  setVariables: (user: string, variables: Record<string, string>) => void,
  setVariablesState: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  setRows: React.Dispatch<React.SetStateAction<RowType[]>>,
  t: (key: string) => string,
): { message?: string; success: boolean } => {
  if (!username) {
    return { success: false };
  }

  const emptyFields: { value?: boolean; variable?: boolean }[] = rows.map((row) => ({
    value: !row.value.trim(),
    variable: !row.variable.trim(),
  }));

  const hasEmptyFields = emptyFields.some((field) => field.variable || field.value);

  if (hasEmptyFields) {
    const emptyVariables = emptyFields.filter((field) => field.variable).length;
    const emptyValues = emptyFields.filter((field) => field.value).length;

    let message = t('messageError');
    const messages: string[] = [];

    if (emptyVariables > 0) {
      messages.push(`${t('messageErrorVariables')}`);
    }
    if (emptyValues > 0) {
      messages.push(`${t('messageErrorValue')}`);
    }

    message += messages.join(t('and'));
    return { message, success: false };
  }

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

  return { success: true };
};
