import { atom } from 'jotai';
import { PopoverPosition, PopoverProps, PopoverAlign } from 'react-tiny-popover';

export const paddingAtom = atom<number | undefined>(10);
export const isOpenAtom = atom(true);
export const alignAtom = atom<PopoverAlign>('center');
export const positionAtom = atom<PopoverPosition>('top');

export const positionsAtom = atom<PopoverPosition[]>(get => {
  const position = get(positionAtom);
  if (position === 'top') {
    return ['top', 'right', 'bottom', 'left'];
  }
  if (position === 'bottom') {
    return ['bottom', 'left', 'top', 'right'];
  }

  if (position === 'left') {
    return ['left', 'top', 'right', 'bottom'];
  }

  return ['right', 'bottom', 'left', 'top'];
});

export const boundaryInsetAtom = atom<number | undefined>(0);
export const repositionAtom = atom(true);
export const containerClassNameAtom = atom('react-tiny-popover-container');

export const fixedLocationAtom = atom(false);
export const contentLocationAtom = atom<PopoverProps['contentLocation']>({
  left: 20,
  top: 20,
});

export const popoverWidthAtom = atom<number | undefined>(100);
export const popoverHeightAtom = atom<number | undefined>(100);

export const arrowSizeAtom = atom<number | undefined>(0);
