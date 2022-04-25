import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';

import TodoList from 'components/todos/TodoList';
import TodoInput from 'components/todos/TodoInput';
import { useFetchTodoList } from 'hooks/todos/useFetchTodoList';
import CompletedTodoList from 'components/todos/CompletedTodoList';

const Todos = () => {
  useFetchTodoList();

  return (
    <TodosContainer maxWidth={false}>
      <div>
        <Typography variant="h4" component="h1" gutterBottom>
          Todos
        </Typography>
      </div>

      <DndProvider backend={HTML5Backend}>
        <TodoInput />
        <TodoList />
        <CompletedTodoList />
      </DndProvider>
    </TodosContainer>
  );
};

const TodosContainer = styled(Container)`
  flex: 1 1 auto;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  padding: 20px 0;
`;

export default Todos;
