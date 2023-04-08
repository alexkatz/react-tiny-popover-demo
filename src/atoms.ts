import { atom } from 'jotai';
import { PopoverProps } from 'react-tiny-popover';

export const paddingAdom = atom(10);
export const isOpenAtom = atom(false);
export const alignAtom = atom<PopoverProps['align']>('center');
export const positionsAtom = atom<PopoverProps['positions']>(['top', 'left', 'bottom', 'right']);
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
