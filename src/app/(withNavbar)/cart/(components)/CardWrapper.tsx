import { ReactNode } from 'react';

export const CardWrapper = ({ children }: { children: ReactNode }) => {
  return <div className=' bg-neutral-100 px-6 py-4 shadow-md'>{children}</div>;
};
