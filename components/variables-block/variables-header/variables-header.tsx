'use client';
import { GrAdd, GrSave } from 'react-icons/gr';
import { useTranslations } from 'use-intl';

import { Button } from '@/components/ui';
import { STYLE_BUTTON } from '@/constants';
import { ServerUser } from '@/type';
import { cn } from '@/lib/utils';

type VariablesHeaderProps = {
  onAddRow: () => void;
  onSave: () => void;
  user: ServerUser;
};

export const VariablesHeader = ({ onAddRow, onSave, user }: VariablesHeaderProps) => {
  const t = useTranslations('variablesBlock');
  const username = user?.displayName || 'Guest';

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between rounded-2xl',
        'border border-neutral-200 bg-fuchsia-50',
        'p-4 shadow dark:bg-neutral-900',
      )}
    >
      <h2 className="font-caprasimo text-5xl font-semibold">{`${t('variablesHeader')} ${username}`}</h2>
      <div className="flex gap-4">
        <Button
          className={STYLE_BUTTON}
          onClick={onAddRow}
          title="Click to Add a Row to write Variables"
        >
          <GrAdd />
          {t('btnAdd')}
        </Button>
        <Button className={STYLE_BUTTON} onClick={onSave} title={t('hintSaveBtn')}>
          {t('btnSave')} <GrSave />
        </Button>
      </div>
    </div>
  );
};
