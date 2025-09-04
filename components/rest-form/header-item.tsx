import { Header } from '@/type';

import { Button } from '../ui/button';

export const HeaderItem = ({
  header,
  onDelete,
}: {
  header: Header;
  onDelete: (header: Header) => void;
}) => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border p-2 shadow-sm">
      <div className="flex gap-2">
        <span className="font-semibold">{header.headerKey}</span>
        <span>:</span>
        <span>{header.value}</span>
      </div>
      <Button onClick={() => onDelete(header)} size="sm" variant="destructive">
        x
      </Button>
    </div>
  );
};
