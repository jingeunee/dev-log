import List from '@mui/material/List';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { IStoreState } from 'store';
import TodoListRow from './TodoListRow';

const TodoList = () => {
  const todoList = useSelector((store: IStoreState) =>
    store.TodosReducer.get('todoList').filter((o) => !o.get('isChecked')),
  );

  const moveTodo = (dragIndex: number, hoverIndex: number) => {
    console.log(dragIndex, hoverIndex);
  };

  return (
    <StyledList sx={{ bgcolor: 'background.paper' }} dense={true}>
      {todoList.map((o, i) => {
        const id = o.get('id');
        const isChecked = o.get('isChecked');
        const text = o.get('text');

        return (
          <TodoListRow
            key={`row-${id}`}
            index={i}
            id={id}
            isChecked={isChecked}
            text={text}
            moveTodo={moveTodo}
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
