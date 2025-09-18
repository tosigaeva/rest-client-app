'use client';
import { GrAdd, GrSave } from 'react-icons/gr';
import { useTranslations } from 'use-intl';

import { Button } from '@/components/ui';
import { useAuth } from '@/context/auth-context';

type VariablesHeaderProps = {
  onAddRow: () => void;
  onSave: () => void;
};

export const VariablesHeader = ({ onAddRow, onSave }: VariablesHeaderProps) => {
  const t = useTranslations('variablesBlock');
  const { user } = useAuth();
  const username = user?.displayName || 'Guest';

  return (
    <div className="flex w-full justify-between">
      <h3 className="mb-4 text-5xl font-semibold">{`${t('variablesHeader')}_${username}`}</h3>
      <div className="flex gap-4">
        <Button
          className="flex cursor-pointer justify-between self-end"
          onClick={onAddRow}
          title="Click to Add a Row to write Variables"
        >
          <GrAdd />
          {t('btnAdd')}
        </Button>
        <Button
          className="flex cursor-pointer justify-between self-end"
          onClick={onSave}
          title={t('hintSaveBtn')}
        >
          {t('btnSave')} <GrSave />
        </Button>
      </div>
    </div>
  );
};
