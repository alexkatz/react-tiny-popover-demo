import { useDrag, useHover } from '@use-gesture/react';
import { type SpringProps, useSpringValue, useSpring } from '@react-spring/web';
import { useState } from 'react';

const BOX_COLOR = {
  dragging: '#6a6a6a',
  idle: '#000000',
  hovering: '#3a3a3a',
};

const springProps: SpringProps = {
  config: {
    tension: 300,
    friction: 10,
    mass: 0.5,
  },
};

type Props = {
  onClickWithoutDrag?(): void;
};

export const useBox = ({ onClickWithoutDrag }: Props = {}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const translateX = useSpringValue(400, springProps);
  const translateY = useSpringValue(400, springProps);

  const [{ boxColor }] = useSpring(
    () => ({
      boxColor: isDragging ? BOX_COLOR.dragging : isHovering ? BOX_COLOR.hovering : BOX_COLOR.idle,
    }),
    [isDragging, isHovering],
  );

  const bindHover = useHover(({ active }) => {
    setIsHovering(active);
  });

  const bindDrag = useDrag<MouseEvent | TouchEvent>(
    ({ active, offset: [ox, oy], memo, first }) => {
      setIsDragging(active);
      translateX.start(ox);
      translateY.start(oy);

      if (!active && memo.ox === ox && memo.oy === oy) {
        onClickWithoutDrag?.();
      }

      return first ? { ox, oy } : memo;
    },
    {
      from: [translateX.get(), translateY.get()],
    },
  );

  return {
    isBoxDragging: isDragging,
    boxProps: {
      ...bindDrag(),
      ...bindHover(),
      style: {
        x: translateX,
        y: translateY,
        backgroundColor: boxColor,
      },
    },
  } as const;
};
