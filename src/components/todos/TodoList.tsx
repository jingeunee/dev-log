import List from '@mui/material/List';
import { useSelector } from 'react-redux';
import { IStoreState } from 'store';
import styled from 'styled-components';
import TodoListRow from './TodoListRow';

const TodoList = () => {
  const todoList = useSelector((store: IStoreState) =>
    store.TodosReducer.get('todoList').filter((o) => !o.get('isChecked')),
  );

  return (
    <StyledList sx={{ bgcolor: 'background.paper' }} dense={true}>
      {todoList.map((o) => {
        const id = o.get('id');
        const isChecked = o.get('isChecked');
        const text = o.get('text');

        return (
          <TodoListRow
            key={`row-${id}`}
            id={id}
            isChecked={isChecked}
            text={text}
          />
        );
      })}
    </StyledList>
  );
};

const StyledList = styled(List)`
  display: flex;
  flex-flow: column nowrap;
  max-width: 400px;
  width: 100%;
`;

export default TodoList;
