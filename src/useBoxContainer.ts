import { useDrag } from '@use-gesture/react';
import { useSpringValue } from '@react-spring/web';

type DragDirection = 'up' | 'down' | 'left' | 'right';
type DragSide = 'top' | 'bottom' | 'left' | 'right';

type ContainerDragMemo = {
  dragDirection?: DragDirection;
  dragSide?: DragSide;
  measureCount: number;
  initialInset: number;
};

const MEASURE_THRESHOLD = 30;

const getDragDirection = (dx: number, dy: number): DragDirection => {
  if (Math.abs(dx) < Math.abs(dy)) return dy > 0 ? 'down' : 'up';
  return dx > 0 ? 'right' : 'left';
};

type GetDragSideParams = {
  containerX: number;
  containerY: number;
  clientWidth: number;
  clientHeight: number;
  dragDirection: DragDirection;
};

const getDragSide = ({
  containerX,
  containerY,
  clientWidth,
  clientHeight,
  dragDirection,
}: GetDragSideParams): DragSide => {
  const isTopHalf = containerY < clientHeight / 2;
  const isLeftHalf = containerX < clientWidth / 2;
  if (isTopHalf && (dragDirection === 'up' || dragDirection === 'down')) return 'top';
  if (!isTopHalf && (dragDirection === 'up' || dragDirection === 'down')) return 'bottom';
  if (isLeftHalf && (dragDirection === 'left' || dragDirection === 'right')) return 'left';
  return 'right';
};

type GetAddedOffsetParams = {
  dragDirection: DragDirection;
  dragSide: DragSide;
  dx: number;
  dy: number;
};

const getAddedOffset = ({ dragDirection, dragSide, dx, dy }: GetAddedOffsetParams) => {
  if (dragSide === 'top' && (dragDirection === 'up' || dragDirection === 'down')) return dy;
  if (dragSide === 'bottom' && (dragDirection === 'up' || dragDirection === 'down')) return -dy;
  if (dragSide === 'left' && (dragDirection === 'left' || dragDirection === 'right')) return dx;
  if (dragSide === 'right' && (dragDirection === 'left' || dragDirection === 'right')) return -dx;

  return 0;
};
type Props = {
  enabled: boolean;
};

export const useBoxContainer = ({ enabled }: Props) => {
  const containerInset = useSpringValue(100);
  const bindContainerDrag = useDrag(
    ({ xy: [x, y], movement: [dx, dy], currentTarget, memo: m }) => {
      const memo = m as ContainerDragMemo;
      const target = currentTarget as HTMLElement;

      const dragDirection = memo?.dragDirection ?? getDragDirection(dx, dy);
      const dragSide =
        memo?.dragSide ??
        getDragSide({
          dragDirection: dragDirection,
          containerX: x - target.offsetLeft,
          containerY: y - target.offsetTop,
          clientWidth: target.clientWidth,
          clientHeight: target.clientHeight,
        });

      const addedOffset = getAddedOffset({
        dragDirection,
        dragSide,
        dx,
        dy,
      });

      const initialInset = memo?.initialInset ?? containerInset.get();
      containerInset.start(initialInset + addedOffset);

      const measureCount = memo?.measureCount ?? 0;

      return {
        dragDirection:
          measureCount > MEASURE_THRESHOLD ? memo?.dragDirection ?? dragDirection : undefined,
        dragSide: measureCount > MEASURE_THRESHOLD ? memo?.dragSide ?? dragSide : undefined,
        measureCount: measureCount + 1,
        initialInset,
      } as ContainerDragMemo;
    },
    { enabled },
  );

  return {
    containerProps: {
      ...bindContainerDrag(),
      style: {
        inset: containerInset,
      },
    },
  } as const;
};
