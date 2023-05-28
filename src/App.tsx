import { animated, useSpring } from '@react-spring/web';
import { useCallback, useRef, useState } from 'react';
import { Popover, PopoverState } from 'react-tiny-popover';
import { classed } from '@tw-classed/react';
import { useBox } from './useBox';
import { useBoxContainer } from './useBoxContainer';
import { Fields } from './Fields';
import { useAtom, useAtomValue } from 'jotai';
import { useDebounce } from 'use-debounce';
import {
  alignAtom,
  boundaryInsetAtom,
  containerClassNameAtom,
  contentLocationLeftAtom,
  contentLocationTopAtom,
  fixedLocationAtom,
  isOpenAtom,
  paddingAtom,
  popoverHeightAtom,
  popoverWidthAtom,
  positionsAtom,
  repositionAtom,
} from './atoms';

const LabelContainer = classed.div('flex flex-1 items-center gap-1 ml-1 p-1');
const Label = classed.label('opacity-50');
const Value = classed.div('');

export const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const [isOpenDebounced] = useDebounce(isOpen, 200);
  const padding = useAtomValue(paddingAtom);
  const positions = useAtomValue(positionsAtom);
  const align = useAtomValue(alignAtom);
  const boundaryInset = useAtomValue(boundaryInsetAtom);
  const popoverWidth = useAtomValue(popoverWidthAtom) ?? 0;
  const popoverHeight = useAtomValue(popoverHeightAtom) ?? 0;
  const shouldReposition = useAtomValue(repositionAtom);
  const containerClassName = useAtomValue(containerClassNameAtom);

  const isFixedLocation = useAtomValue(fixedLocationAtom);
  const fixedTop = useAtomValue(contentLocationTopAtom);
  const fixedLeft = useAtomValue(contentLocationLeftAtom);

  const { isBoxDragging, isBoxHovering, boxProps } = useBox({
    onClickWithoutDrag: useCallback(() => setIsOpen(prev => !prev), [setIsOpen]),
  });

  const { containerProps } = useBoxContainer({ enabled: !isBoxDragging && !isBoxHovering });
  const [isAnimating, setIsAnimating] = useState(false);

  const [{ popoverOpacity }] = useSpring(
    () => ({
      popoverOpacity: isOpen ? 1 : 0,
      onStart: () => setIsAnimating(true),
      onRest: () => setIsAnimating(false),
    }),
    [isOpen],
  );

  const handleContent = useCallback(
    ({ position, align, padding, nudgedLeft, nudgedTop }: PopoverState) => (
      <animated.div
        style={{ opacity: popoverOpacity, minWidth: popoverWidth, minHeight: popoverHeight }}
        className='flex h-48 w-48 flex-col rounded-md bg-blue-400/40'
      >
        <LabelContainer>
          <Label>position:</Label>
          <Value>{position}</Value>
        </LabelContainer>

        <LabelContainer>
          <Label>align:</Label>
          <Value>{align}</Value>
        </LabelContainer>

        <LabelContainer>
          <Label>padding:</Label>
          <Value>{padding}</Value>
        </LabelContainer>

        <LabelContainer>
          <Label>nudgedLeft:</Label>
          <Value>{nudgedLeft.toFixed(2)}</Value>
        </LabelContainer>

        <LabelContainer>
          <Label>nudgedTop:</Label>
          <Value>{nudgedTop.toFixed(2)}</Value>
        </LabelContainer>
      </animated.div>
    ),
    [popoverHeight, popoverOpacity, popoverWidth],
  );

  return (
    <div className='relative flex-1'>
      <Fields className='absolute left-4 right-4 top-4 mx-1 [&>*]:z-20' />
      <animated.div
        className='absolute cursor-pointer touch-none rounded-md border-4 border-blue-400/50'
        {...containerProps}
        ref={containerRef}
      >
        <Popover
          isOpen={isOpen || isOpenDebounced || isAnimating}
          content={handleContent}
          boundaryElement={containerRef.current ?? undefined}
          parentElement={containerRef.current ?? undefined}
          containerClassName={containerClassName}
          padding={padding}
          positions={positions}
          align={align}
          boundaryInset={boundaryInset}
          reposition={shouldReposition}
          contentLocation={
            isFixedLocation ? { left: fixedLeft ?? 0, top: fixedTop ?? 0 } : undefined
          }
        >
          <animated.div
            className='fixed h-32 w-32 cursor-pointer touch-none rounded-md border-2 border-white will-change-transform'
            {...boxProps}
          >
            <span className='absolute bottom-1 left-1 select-none text-xs text-white/50'>
              click or drag me!
            </span>
          </animated.div>
        </Popover>
        <div className='absolute bottom-1 left-1 select-none text-xs text-white/50'>drag me!</div>
      </animated.div>
    </div>
  );
};
