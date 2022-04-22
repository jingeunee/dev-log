import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Identifier, XYCoord } from 'dnd-core';
import { useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { ActionCtor } from 'store/modules/todos';
import CircleProgress from 'components/CircleProgress';

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface IProps {
  index: number;
  id: number;
  isChecked: boolean;
  text: string;
  moveTodo: (dragIndex: number, hoverIndex: number) => void;
}
const TodoListRow = ({ index, id, isChecked, text, moveTodo }: IProps) => {
  const dispatch = useDispatch();
  const [isChecking, setChecking] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const ref = useRef<HTMLLIElement | null>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item: DragItem, monitor) => {
      if (!ref.current) {
        return;
      }
      if (!moveTodo) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveTodo(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const onCheck = () => {
    setChecking(true);
    dispatch(ActionCtor.checkTodo(id));
  };
  const onDelete = () => {
    setDeleting(true);
    dispatch(ActionCtor.deleteTodo(id));
  };

  useEffect(
    () => () => {
      setChecking(false);
      setDeleting(false);
    },
    [],
  );

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <StyledListItem
      data-handler-id={handlerId}
      ref={ref}
      style={{
        border: '1px dashed gray',
        padding: '0.5rem 1rem',
        marginBottom: '.5rem',
        backgroundColor: 'white',
        cursor: 'move',
        opacity,
      }}
    >
      {isChecked ? (
        <CheckedListItemText>{text}</CheckedListItemText>
      ) : (
        <ListItemText>{text}</ListItemText>
      )}
      <IconButton size="small" disabled={isChecking} onClick={onCheck}>
        {isChecking ? (
          <CircleProgress />
        ) : isChecked ? (
          <CheckIcon />
        ) : (
          <CheckBoxOutlineBlankIcon />
        )}
      </IconButton>
      <IconButton size="small" onClick={onDelete}>
        {isDeleting ? <CircleProgress /> : <DeleteIcon />}
      </IconButton>
    </StyledListItem>
  );
};

const StyledListItem = styled(ListItem)`
  border-bottom: solid 1px #eee;
`;
const CheckedListItemText = styled(ListItemText)`
  text-decoration: line-through;
  color: #ccc;
`;

export default TodoListRow;
