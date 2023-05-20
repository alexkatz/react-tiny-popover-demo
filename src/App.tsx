import { animated } from '@react-spring/web';
import { useCallback, useRef } from 'react';
import { Popover, PopoverState } from 'react-tiny-popover';
import { classed } from '@tw-classed/react';
import { useBox } from './useBox';
import { useBoxContainer } from './useBoxContainer';
import { Fields } from './Fields';
import { useAtomValue } from 'jotai';
import { alignAtom, paddingAtom, positionsAtom } from './atoms';

const LabelContainer = classed.div('flex flex-1 items-center gap-1 ml-1 p-1');
const Label = classed.label('opacity-50');
const Value = classed.div('');

export const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const padding = useAtomValue(paddingAtom);
  const positions = useAtomValue(positionsAtom);
  const align = useAtomValue(alignAtom);

  const { isBoxDragging, boxProps } = useBox();
  const { containerProps } = useBoxContainer({ enabled: !isBoxDragging });

  const handleContent = useCallback(
    ({ position, align, padding, nudgedLeft, nudgedTop }: PopoverState) => (
      <div className='flex h-48 w-48 flex-col rounded-md bg-blue-400/50'>
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
      </div>
    ),
    [],
  );

  return (
    <div className='relative flex-1'>
      <Fields className='absolute left-0 right-0 top-0 mx-1' />
      <animated.div
        className='absolute touch-none rounded-md border-2 border-blue-800'
        {...containerProps}
        ref={containerRef}
      >
        <Popover
          isOpen
          content={handleContent}
          boundaryElement={containerRef.current ?? undefined}
          parentElement={containerRef.current ?? undefined}
          padding={padding}
          positions={positions}
          align={align}
        >
          <animated.div
            className='fixed h-32 w-32 cursor-pointer touch-none rounded-md border-2 border-white will-change-transform'
            {...boxProps}
          />
        </Popover>
      </animated.div>
    </div>
  );
};
