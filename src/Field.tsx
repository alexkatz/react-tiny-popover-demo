import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  label: string;
  className?: string;
}>;

export const Field = ({ label, className, children }: Props) => (
  <div className={clsx('flex flex-col', className)}>
    <label className='flex text-sm opacity-60'>{label}</label>
    {children}
  </div>
);
