'use client';

import { useState } from 'react';
type RowType = {
  value: string;
  variable: string;
};

export const VariablesBlock = () => {
  const [rows, setRows] = useState<RowType[]>([{ value: '', variable: '' }]);
  const handleInputChange = (index: number, field: keyof RowType, value: string) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
    if (index === rows.length - 1 && value !== '') {
      setRows([...newRows, { value: '', variable: '' }]);
    }
  };
  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-4">
      <h3 className="mb-4 text-lg font-semibold">Variables</h3>
      <div className="w-full max-w-md">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-left">Variable</th>
              <th className="border p-2 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border p-2">
                  <input
                    className="w-full rounded border p-1"
                    onChange={(e) => handleInputChange(index, 'variable', e.target.value)}
                    type="text"
                    value={row.variable}
                  />
                </td>
                <td className="border p-2">
                  <input
                    className="w-full rounded border p-1"
                    onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                    type="text"
                    value={row.value}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
