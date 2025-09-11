'use client';
import { GrSave } from 'react-icons/gr';
import { useTranslations } from 'use-intl';

import { Button } from '@/components/ui';

export const VariablesHeader = ({ onSave }: { onSave: () => void }) => {
  const t = useTranslations('variablesBlock');

  return (
    <div className="flex w-full justify-between">
      <h3 className="mb-4 text-5xl font-semibold">{t('variables')}</h3>
      <Button
        className="flex cursor-pointer justify-between self-end"
        onClick={onSave}
        title="Click To SAVE Variables"
      >
        {t('btnSave')} <GrSave />
      </Button>
    </div>
  );
};
