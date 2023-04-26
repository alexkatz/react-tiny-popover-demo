import { animated } from '@react-spring/web';
import { useRef } from 'react';
import { Popover } from 'react-tiny-popover';
import { useBoxDrag } from './useBoxDrag';
import { useBindContainerDrag } from './useContainerDrag';

export const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { isBoxDragging, boxProps } = useBoxDrag();
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
          content={<div className='h-52 w-52 bg-blue-400/50'>test</div>}
          boundaryElement={containerRef.current ?? undefined}
          parentElement={containerRef.current ?? undefined}
          padding={8}
        >
          <animated.div
            className='fixed h-32 w-32 cursor-pointer touch-none border-2 border-white will-change-transform'
            {...boxProps}
          />
        </Popover>
      </animated.div>
    </div>
  );
};
