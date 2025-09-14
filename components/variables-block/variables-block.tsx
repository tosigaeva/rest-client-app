'use client';

import { GrTrash } from 'react-icons/gr';
import { useTranslations } from 'use-intl';

import { useVariables } from '@/hooks/use-variables';
import { getVariables, setVariables } from '@/utils/storage-variables';

import { Button } from '../ui';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { VariablesHeader } from './variables-header/variables-header';

export const VariablesBlock = () => {
  const t = useTranslations('variablesBlock');
  const { handleAddRow, handleDelete, handleInputChange, handleSave, rows } = useVariables(
    getVariables,
    setVariables,
  );

  return (
    <section className="mt-35 flex flex-col items-center justify-center gap-10 p-4">
      <VariablesHeader onAddRow={handleAddRow} onSave={handleSave} />
      <div className="w-full">
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead className="border p-2 text-left text-2xl">{t('variables')}</TableHead>
              <TableHead className="border p-2 text-left text-2xl">{t('value')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="border p-2">
                  <Input
                    className="w-full rounded border p-1"
                    onChange={(e) => handleInputChange(index, 'variable', e.target.value)}
                    type="text"
                    value={row.variable}
                  />
                </TableCell>
                <TableCell className="border p-2">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
