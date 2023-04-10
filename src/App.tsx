import { animated } from '@react-spring/web';
import { useBindContainerDrag } from './useContainerDrag';
import { useBoxDrag } from './useBoxDrag';
import { Popover } from 'react-tiny-popover';
import { useRef } from 'react';

export const App = () => {
  const { isBoxDragging, boxProps } = useBoxDrag();
  const containerRef = useRef<HTMLDivElement>(null);
  const { containerProps } = useBindContainerDrag({ enabled: !isBoxDragging });
  return (
    <div className='relative flex-1'>
      <animated.div
        className='absolute touch-none border-2 border-blue-800'
        {...containerProps}
        ref={containerRef}
      >
        <Popover
          isOpen
          content={<div className='h-52 w-52 bg-red-400/50'>test</div>}
          boundaryElement={containerRef.current ?? undefined}
          parentElement={containerRef.current ?? undefined}
          padding={8}
        >
          <animated.div
            className='fixed h-32 w-32 cursor-pointer touch-none border-2 border-white'
            {...boxProps}
          />
        </Popover>
      </animated.div>
    </div>
  );
};
