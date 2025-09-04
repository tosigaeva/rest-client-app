import { cn } from 'clsx-for-tailwind';

import { flexRow } from '@/constants/css-constants';

export const RestResponce = () => {
  return (
    <div className={cn('body-section')}>
      <div className={cn('body-section', flexRow)}>
        <h3>Status: </h3>
        202
      </div>
      <div className={cn('body-section', flexRow)}>
        <h3>Body: </h3>
        23456789876543
      </div>
    </div>
  );
};
