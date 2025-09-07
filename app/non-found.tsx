import Image from 'next/image';
import { GrFormPreviousLink } from 'react-icons/gr';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const NonFound = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <Image alt={'non-found'} height={700} src="/non-found.png" width={700} />
      <Button
        className={cn(
          'cursor-pointer',
          'border border-gray-200 bg-white text-black',
          'shadow-md transition-all duration-300 hover:text-white hover:shadow-lg',
        )}
      >
        <GrFormPreviousLink />
        Back to the Beginning
      </Button>
    </div>
  );
};
