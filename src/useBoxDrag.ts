import { useDrag } from '@use-gesture/react';
import { type SpringProps, useSpringValue } from '@react-spring/web';
import { useState } from 'react';

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

export const useBoxDrag = () => {
  const [isBoxDragging, setIsBoxDragging] = useState(false);
  const translateX = useSpringValue(50, springProps);
  const translateY = useSpringValue(50, springProps);
  const boxColor = useSpringValue(BOX_COLOR.idle);

  const bindBoxDrag = useDrag<MouseEvent | TouchEvent>(
    ({ active, delta: [dx, dy], movement: [mx, my], initial: [ix, iy], offset: [ox, oy] }) => {
      console.log('delta', dx, dy);
      console.log('movement', mx, my);
      console.log('offset', ox, oy);
      console.log('initial', ix, iy);

      setIsBoxDragging(active);
      translateX.start(mx);
      translateY.start(my);
      boxColor.start(active ? BOX_COLOR.dragging : BOX_COLOR.idle);
    },
    {
      from: [translateX.get(), translateY.get()],
    },
  );

  return {
    isBoxDragging,
    boxProps: {
      ...bindBoxDrag(),
      style: {
        x: translateX,
        y: translateY,
        backgroundColor: boxColor,
      },
    },
  } as const;
};
