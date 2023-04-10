import { useDrag } from '@use-gesture/react';
import { SpringProps, useSpringValue } from '@react-spring/web';
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
  const translateX = useSpringValue(0, springProps);
  const translateY = useSpringValue(0, springProps);
  const boxColor = useSpringValue(BOX_COLOR.idle);

  const bindBoxDrag = useDrag(({ active, offset: [x, y], first }) => {
    // TODO: return a memo that stores the initial box position and use that throughout the drag
    setIsBoxDragging(active);
    translateX.start(first ? translateX.get() + x : x);
    translateY.start(first ? translateY.get() + y : y);
    boxColor.start(active ? BOX_COLOR.dragging : BOX_COLOR.idle);
  });

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
