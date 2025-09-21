import { Button } from '@/components/ui/button';
import { Header } from '@/type';

export const HeaderItem = ({
  header,
  onDelete,
}: {
  header: Header;
  onDelete: (header: Header) => void;
}) => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-neutral-200 bg-white p-3 shadow-sm dark:bg-neutral-800">
      <div className="flex gap-2 text-sm text-neutral-700 dark:text-neutral-200">
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
