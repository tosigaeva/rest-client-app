'use client';
import { GrAdd, GrSave } from 'react-icons/gr';
import { useTranslations } from 'use-intl';

import { Button } from '@/components/ui';

type VariablesHeaderProps = {
  onAddRow: () => void;
  onSave: () => void;
};

export const VariablesHeader = ({ onAddRow, onSave }: VariablesHeaderProps) => {
  const t = useTranslations('variablesBlock');

  return (
    <div className="flex w-full justify-between">
      <h3 className="mb-4 text-5xl font-semibold">{t('variables')}</h3>
      <div className="flex gap-4">
        <Button
          className="flex cursor-pointer justify-between self-end"
          onClick={onAddRow}
          title="Click to Add a Row to write Variables"
        >
          <GrAdd />
          Add Row
        </Button>
        <Button
          className="flex cursor-pointer justify-between self-end"
          onClick={onSave}
          title="Click To SAVE Variables"
        >
          {t('btnSave')} <GrSave />
        </Button>
      </div>
    </div>
  );
};
