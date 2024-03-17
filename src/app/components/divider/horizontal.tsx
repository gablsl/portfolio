import { cn } from '@/app/lib/utils';

type HorizontalDividerProps = {
  className?: string;
};

export function Horizontal({ className }: HorizontalDividerProps) {
  return (
    <div className={cn('w-full my-8 border-b border-b-gray-800', className)} />
  );
}
