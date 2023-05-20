import { twMerge } from 'tailwind-merge';
import { Field } from './Field';
import { useAtom } from 'jotai';
import { alignAtom, isOpenAtom, paddingAtom, positionAtom } from './atoms';
import { classed } from '@tw-classed/react';
import { PopoverAlign, PopoverPosition } from 'react-tiny-popover';
import { ComponentProps, useCallback, useMemo } from 'react';

type Props = {
  className?: string;
};

const Input = classed.input(
  'rounded-md border-[1px] border-white/60 bg-black p-1 focus:border-white/100 focus:outline-none',
);

const Button = classed.button(
  'bg-gray-700 p-1 rounded-md focus:border-white/100 focus:outline-none',
);

const POSITIONS: readonly PopoverPosition[] = ['top', 'right', 'left', 'bottom'];
const ALIGNS: readonly PopoverAlign[] = ['start', 'center', 'end'];

export const Fields = ({ className }: Props) => {
  const [padding, setPadding] = useAtom(paddingAtom);
  const [position, setPosition] = useAtom(positionAtom);
  const [align, setAlign] = useAtom(alignAtom);
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);

  const handleOpenClick = useCallback(() => setIsOpen(prev => !prev), [setIsOpen]);

  const handlePositionClick = useCallback(() => {
    const index = POSITIONS.indexOf(position);
    setPosition(POSITIONS[(index + 1) % POSITIONS.length]);
  }, [position, setPosition]);

  const handleAlignClick = useCallback(() => {
    const index = ALIGNS.indexOf(align);
    setAlign(ALIGNS[(index + 1) % ALIGNS.length]);
  }, [align, setAlign]);

  const paddingInputProps = useMemo<ComponentProps<typeof Input>>(
    () => ({
      onChange(e) {
        setPadding(e.target.value.length > 0 ? Number(e.target.value) : undefined);
      },
      onBlur(e) {
        if (e.target.value.length === 0) {
          setPadding(0);
        }
      },
    }),
    [setPadding],
  );

  return (
    <div className={twMerge('flex gap-2', className)}>
      <Field label='Open'>
        <Button className='w-[4.5rem]' onClick={handleOpenClick}>
          {isOpen ? 'Open' : 'Closed'}
        </Button>
      </Field>
      <Field label='position'>
        <Button className='w-[4.5rem]' onClick={handlePositionClick}>
          {position}
        </Button>
      </Field>

      <Field label='Align'>
        <Button className='w-[4.5rem]' onClick={handleAlignClick}>
          {align}
        </Button>
      </Field>

      <Field label='Padding'>
        <Input className='' type='number' value={padding ?? ''} {...paddingInputProps} />
      </Field>
    </div>
  );
};
