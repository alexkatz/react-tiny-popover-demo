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
  applyTransformAtom,
  transformLeftAtom,
  transformTopAtom,
  transformModeAtom,
} from './atoms';
import { classed } from '@tw-classed/react';
import { PopoverAlign, PopoverPosition } from 'react-tiny-popover';
import { ComponentProps, useCallback, useMemo } from 'react';

const POSITIONS: readonly PopoverPosition[] = ['top', 'right', 'left', 'bottom'];
const ALIGNS: readonly PopoverAlign[] = ['start', 'center', 'end'];

const Input = classed.input(
  'rounded-md border-[1px] border-white/80 bg-black p-1 focus:border-white/100 focus:outline-none',
);

const Button = classed.button(
  'bg-blue-400 p-1 rounded-md focus:border-white/100 focus:outline-none disabled:opacity-50',
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

const useToggleHandler = <T,>(currentValue: T, setter: (value: T) => void, values: readonly T[]) =>
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
  const [reposition, setReposition] = useAtom(repositionAtom);
  const [containerClassName, setContainerClassName] = useAtom(containerClassNameAtom);
  const [applyTransform, setApplyTransform] = useAtom(applyTransformAtom);
  const [transformMode, setTransformMode] = useAtom(transformModeAtom);
  const [transformLeft, setTransformLeft] = useAtom(transformLeftAtom);
  const [transformTop, setTransformTop] = useAtom(transformTopAtom);

  const handleOpenClick = useCallback(() => setIsOpen(prev => !prev), [setIsOpen]);
  const handlePositionClick = useToggleHandler(position, setPosition, POSITIONS);
  const handleAlignClick = useToggleHandler(align, setAlign, ALIGNS);
  const paddingInputProps = useNumericInputProps(setPadding);
  const boundaryInsetInputProps = useNumericInputProps(setBoundaryInset);
  const popoverWidthInputProps = useNumericInputProps(setPopoverWidth);
  const popoverheightInputProps = useNumericInputProps(setPopoverHeight);
  const transformLeftInputProps = useNumericInputProps(setTransformLeft);
  const transformTopInputProps = useNumericInputProps(setTransformTop);

  return (
    <div className={twMerge('flex flex-wrap gap-6', className)}>
      <div className='flex gap-1 rounded-md border border-white/50 p-1'>
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
          <Input
            className='w-[4.5rem]'
            type='number'
            value={padding ?? ''}
            {...paddingInputProps}
          />
        </Field>

        <Field label='Min Width'>
          <Input
            className='w-[4.5rem]'
            type='number'
            value={popoverWidth ?? ''}
            {...popoverWidthInputProps}
          />
        </Field>

        <Field label='Min Height'>
          <Input
            className='w-[4.5rem]'
            type='number'
            value={popoverHeight ?? ''}
            {...popoverheightInputProps}
          />
        </Field>
      </div>

      <div className='flex gap-1 rounded-md border border-white/50 p-1'>
        <Field label='Repositioning'>
          <Button
            className='w-[4.5rem]'
            onClick={() =>
              setReposition(prev => {
                if (prev === 'Parent') return 'Window';
                if (prev === 'Window') return 'Off';
                return 'Parent';
              })
            }
          >
            {reposition}
          </Button>
        </Field>

        <Field label='Boundary Inset'>
          <Input
            className='w-[4.5rem] disabled:opacity-50'
            disabled={reposition === 'Off'}
            type='number'
            value={boundaryInset ?? ''}
            {...boundaryInsetInputProps}
          />
        </Field>
      </div>

      <div className='flex gap-1 rounded-md border border-white/50 p-1'>
        <Field label='Transform'>
          <Button className='w-[4.5rem]' onClick={() => setApplyTransform(prev => !prev)}>
            {applyTransform ? 'On' : 'Off'}
          </Button>
        </Field>

        <Field label='Transform Mode'>
          <Button
            className='w-[4.5rem]'
            disabled={!applyTransform}
            onClick={() =>
              setTransformMode(prev => (prev === 'relative' ? 'absolute' : 'relative'))
            }
          >
            {transformMode === 'relative' ? 'Relative' : 'Absolute'}
          </Button>
        </Field>

        <Field label='Transform Left'>
          <Input
            className='w-[4.5rem] disabled:opacity-50'
            disabled={!applyTransform}
            type='number'
            value={transformLeft ?? ''}
            {...transformLeftInputProps}
          />
        </Field>

        <Field label='Transform Top'>
          <Input
            className='w-[4.5rem] disabled:opacity-50'
            disabled={!applyTransform}
            type='number'
            value={transformTop ?? ''}
            {...transformTopInputProps}
          />
        </Field>
      </div>

      <div className='flex gap-1 rounded-md border border-white/50 p-1'>
        <Field label='Container Class Name'>
          <Input
            className='w-[15rem]'
            type='text'
            value={containerClassName}
            onChange={e => setContainerClassName(e.target.value)}
          />
        </Field>
      </div>
    </div>
  );
};
