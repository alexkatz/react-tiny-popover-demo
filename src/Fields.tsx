import { twMerge } from 'tailwind-merge';
import { Field } from './Field';
import { useAtom } from 'jotai';
import {
  alignAtom,
  isOpenAtom,
  paddingAtom,
  positionAtom,
  boundaryInsetAtom,
  popoverWidthAtom,
  popoverHeightAtom,
  repositionAtom,
  containerClassNameAtom,
  fixedLocationAtom,
} from './atoms';
import { classed } from '@tw-classed/react';
import { PopoverAlign, PopoverPosition } from 'react-tiny-popover';
import { ComponentProps, useCallback, useMemo } from 'react';

const POSITIONS: readonly PopoverPosition[] = ['top', 'right', 'left', 'bottom'];
const ALIGNS: readonly PopoverAlign[] = ['start', 'center', 'end'];

const Input = classed.input(
  'rounded-md border-[1px] border-white/60 bg-black p-1 focus:border-white/100 focus:outline-none',
);

const Button = classed.button(
  'bg-gray-700 p-1 rounded-md focus:border-white/100 focus:outline-none',
);

const useNumericInputProps = (setter: (value: number | undefined) => void) =>
  useMemo<ComponentProps<typeof Input>>(
    () => ({
      onChange(e) {
        setter(e.target.value.length > 0 ? Number(e.target.value) : undefined);
      },
      onBlur(e) {
        if (e.target.value.length === 0) {
          setter(0);
        }
      },
    }),
    [setter],
  );

const useToggleHandler = <T extends any>(
  currentValue: T,
  setter: (value: T) => void,
  values: readonly T[],
) =>
  useCallback(() => {
    const index = values.indexOf(currentValue);
    setter(values[(index + 1) % values.length]);
  }, [currentValue, setter, values]);

type Props = {
  className?: string;
};

export const Fields = ({ className }: Props) => {
  const [padding, setPadding] = useAtom(paddingAtom);
  const [position, setPosition] = useAtom(positionAtom);
  const [align, setAlign] = useAtom(alignAtom);
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const [boundaryInset, setBoundaryInset] = useAtom(boundaryInsetAtom);
  const [popoverWidth, setPopoverWidth] = useAtom(popoverWidthAtom);
  const [popoverHeight, setPopoverHeight] = useAtom(popoverHeightAtom);
  const [shouldReposition, setShouldReposition] = useAtom(repositionAtom);
  const [containerClassName, setContainerClassName] = useAtom(containerClassNameAtom);
  const [isFixedLocation, setIsFixedLocation] = useAtom(fixedLocationAtom);

  const handleOpenClick = useCallback(() => setIsOpen(prev => !prev), [setIsOpen]);
  const handlePositionClick = useToggleHandler(position, setPosition, POSITIONS);
  const handleAlignClick = useToggleHandler(align, setAlign, ALIGNS);
  const paddingInputProps = useNumericInputProps(setPadding);
  const boundaryInsetInputProps = useNumericInputProps(setBoundaryInset);
  const popoverWidthInputProps = useNumericInputProps(setPopoverWidth);
  const popoverheightInputProps = useNumericInputProps(setPopoverHeight);

  return (
    <div className={twMerge('flex flex-wrap gap-2', className)}>
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

      <Field label='Repositioning'>
        <Button className='w-[4.5rem]' onClick={() => setShouldReposition(prev => !prev)}>
          {shouldReposition ? 'On' : 'Off'}
        </Button>
      </Field>

      <Field label='Fixed Location'>
        <Button className='w-[4.5rem]' onClick={() => setIsFixedLocation(prev => !prev)}>
          {isFixedLocation ? 'On' : 'Off'}
        </Button>
      </Field>

      <Field label='Padding'>
        <Input className='w-[4.5rem]' type='number' value={padding ?? ''} {...paddingInputProps} />
      </Field>

      <Field label='Boundary Inset'>
        <Input
          className='w-[4.5rem]'
          type='number'
          value={boundaryInset ?? ''}
          {...boundaryInsetInputProps}
        />
      </Field>

      <Field label='Popover Min Width'>
        <Input
          className='w-[4.5rem]'
          type='number'
          value={popoverWidth ?? ''}
          {...popoverWidthInputProps}
        />
      </Field>

      <Field label='Popover Min Height'>
        <Input
          className='w-[4.5rem]'
          type='number'
          value={popoverHeight ?? ''}
          {...popoverheightInputProps}
        />
      </Field>

      <Field label='Container Class Name'>
        <Input
          className='w-[15rem]'
          type='text'
          value={containerClassName}
          onChange={e => setContainerClassName(e.target.value)}
        />
      </Field>
    </div>
  );
};
