import { useDrag } from '@use-gesture/react';
import { animated, useSpringValue, SpringProps } from '@react-spring/web';

const BOX_COLOR = {
  dragging: '#1a1a1a',
  idle: '#000000',
};

const springProps: SpringProps = {
  config: {
    tension: 300,
    friction: 10,
    mass: 0.5,
  },
};

export const App = () => {
  const translateX = useSpringValue(0, springProps);
  const translateY = useSpringValue(0, springProps);
  const boxColor = useSpringValue(BOX_COLOR.idle);

  const bindBoxDrag = useDrag(({ active, offset: [x, y] }) => {
    translateX.start(x);
    translateY.start(y);
    boxColor.start(active ? BOX_COLOR.dragging : BOX_COLOR.idle);
  });

  return (
    <div className='relative flex-1'>
      <animated.div
        className='absolute h-32 w-32 cursor-pointer touch-none border-2 border-white'
        {...bindBoxDrag()}
        style={{
          x: translateX,
          y: translateY,
          backgroundColor: boxColor,
        }}
      />
    </div>
  );
};
