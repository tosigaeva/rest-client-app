'use client';

import { GrSave, GrTrash } from 'react-icons/gr';
import { useTranslations } from 'use-intl';

import { Button } from '../ui';
import { Input } from '../ui/input';
import { getVariables, setVariables } from './storage/storage';
import { useVariables } from './ui-handles/ui-handles';

export const VariablesBlock = () => {
  const t = useTranslations('variablesBlock');
  const { handleDelete, handleInputChange, handleSave, rows } = useVariables(
    getVariables,
    setVariables,
  );

  return (
    <section className="mt-35 flex flex-col items-center justify-center gap-10 p-4">
      <div className="flex w-full justify-between">
        <h3 className="mb-4 text-5xl font-semibold">{t('variables')}</h3>
        <Button
          className="cursol-pointer flex justify-between self-end"
          onClick={handleSave}
          title={`Click To SAVE Variables`}
        >
          {t('btnSave')} <GrSave />
        </Button>
      </div>
      <div className="w-full">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-left">{t('variables')}</th>
              <th className="border p-2 text-left">{t('value')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border p-2">
                  <Input
                    className="w-full rounded border p-1"
                    onChange={(e) => handleInputChange(index, 'variable', e.target.value)}
                    type="text"
                    value={row.variable}
                  />
                </td>
                <td className="border p-2">
                  <div className="flex justify-between gap-2">
                    <Input
                      className="w-full rounded border p-1"
                      onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                      type="text"
                      value={row.value}
                    />
                    <Button onClick={() => handleDelete(index)} title={`Click To DELETE Variable`}>
                      <GrTrash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
