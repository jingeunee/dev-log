import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { ActionCtor } from 'store/modules/todos';
import CircleProgress from 'components/CircleProgress';

// interface DragItem {
//   index: number;
//   id: string;
//   type: string;
// }

interface IProps {
  index: number;
  id: number;
  isChecked: boolean;
  text: string;
  moveTodo?: any;
}
const CompletedTodoListRow = ({
  index,
  id,
  isChecked,
  text,
  moveTodo,
}: IProps) => {
  const dispatch = useDispatch();
  const [isChecking, setChecking] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

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

  return (
    <StyledListItem>
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

export default CompletedTodoListRow;
