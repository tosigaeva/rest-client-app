'use client';

import { VariablesHeader } from '@components';
import { GrTrash } from 'react-icons/gr';
import { useTranslations } from 'use-intl';

import { STYLE_BUTTON } from '@/constants';
import { useVariables } from '@/hooks/use-variables';
import { cn } from '@/lib/utils';
import { AppProps } from '@/type';
import { getVariables, setVariables } from '@/utils/storage-variables';

import { Button } from '../ui';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

export const VariablesBlock = ({ user }: AppProps) => {
  const t = useTranslations('variablesBlock');
  const { handleAddRow, handleDelete, handleInputChange, handleSave, rows } = useVariables(
    user!,
    getVariables,
    setVariables,
  );

  return (
    <section className="mt-10 flex flex-col items-center justify-center gap-10 p-4">
      <VariablesHeader onAddRow={handleAddRow} onSave={handleSave} user={user!} />
      <div
        className={cn(
          'w-full rounded-2xl border border-neutral-200',
          'bg-fuchsia-50 p-4 shadow dark:bg-neutral-900',
        )}
      >
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead className="font-caprasimo h-16 w-1/2 border p-2 text-left text-2xl">
                {t('variables')}
              </TableHead>
              <TableHead className="font-caprasimo h-16 w-1/2 border p-2 text-left text-2xl">
                {t('value')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="min-h-16">
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="border p-2">
                  <div className="flex items-center justify-between gap-2 bg-white">
                    <Input
                      checked={row.saved}
                      className={cn(
                        'h-5 w-5 accent-green-500',
                        'disabled:cursor-default disabled:accent-green-500 disabled:opacity-100',
                      )}
                      readOnly
                      type="checkbox"
                    ></Input>
                    <Input
                      className="w-full rounded border p-1"
                      disabled={row.saved}
                      onChange={(e) => handleInputChange(index, 'variable', e.target.value)}
                      type="text"
                      value={row.variable}
                    />
                  </div>
                </TableCell>
                <TableCell className="border p-2">
                  <div className="flex justify-between gap-2 bg-white">
                    <Input
                      className="w-full rounded border p-1"
                      onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                      type="text"
                      value={row.value}
                    />
                    <Button
                      className={STYLE_BUTTON}
                      onClick={() => handleDelete(index)}
                      title={t('hintDelBtn')}
                    >
                      <GrTrash />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
