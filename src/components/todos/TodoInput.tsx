import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import { IStoreState } from 'store';
import { ActionCtor } from 'store/modules/todos';

import CircleProgress from 'components/CircleProgress';

const TodoInput = () => {
  const [newTodo, setNewTodo] = useState('');
  const isCreatingTodo = useSelector((store: IStoreState) =>
    store.TodosReducer.get('isCreatingTodo'),
  );

  const dispatch = useDispatch();
  const onCreateTodo = (e: FormEvent) => {
    e.preventDefault();
    if (!newTodo) {
      toast.warn('할일을 입력하세요.');
      return;
    }
    dispatch(ActionCtor.createTodo(newTodo));
    setNewTodo('');
  };

  return (
    <StyledBox component="form" onSubmit={onCreateTodo}>
      <StyledTextField
        variant="outlined"
        size="small"
        value={newTodo}
        onChange={(e) => setNewTodo(e.currentTarget.value)}
      />
      <StyledButton
        type="submit"
        variant="contained"
        size="small"
        disabled={isCreatingTodo}
      >
        {isCreatingTodo ? <CircleProgress /> : '추가'}
      </StyledButton>
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  display: flex;
  max-width: 400px;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: solid 1px #eee;
`;
const StyledTextField = styled(TextField)`
  flex: 1 1 auto;
`;
const StyledButton = styled(Button)`
  flex: 0 0 auto;
  margin-left: 5px;
`;

export default TodoInput;
