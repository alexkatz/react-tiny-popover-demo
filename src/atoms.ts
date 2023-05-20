import { atom } from 'jotai';
import { PopoverPosition, PopoverProps, PopoverAlign } from 'react-tiny-popover';

export const paddingAtom = atom<number | undefined>(10);
export const isOpenAtom = atom(false);
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

export const boundaryInsetAtom = atom(0);
export const repositionAtom = atom(true);
export const containerClassNameAtom = atom('react-tiny-popover-container');
export const contentLocationAtom = atom<PopoverProps['contentLocation']>({
  left: 20,
  top: 20,
});

export const popoverSizeAtom = atom({
  width: 100,
  height: 100,
});

export const arrowSizeAtom = atom(0);
