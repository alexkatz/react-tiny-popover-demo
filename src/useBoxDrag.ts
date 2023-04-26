import { useDrag } from '@use-gesture/react';
import { type SpringProps, useSpringValue } from '@react-spring/web';
import { useState } from 'react';

const BOX_COLOR = {
  dragging: '#4a4a4a',
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
  const translateX = useSpringValue(200, springProps);
  const translateY = useSpringValue(200, springProps);
  const boxColor = useSpringValue(BOX_COLOR.idle);

  const bindBoxDrag = useDrag<MouseEvent | TouchEvent>(
    ({ active, offset: [ox, oy] }) => {
      setIsBoxDragging(active);
      translateX.start(ox);
      translateY.start(oy);
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
