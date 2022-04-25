import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import TodoList from 'components/todos/TodoList';
import TodoInput from 'components/todos/TodoInput';
import { useFetchTodoList } from 'hooks/todos/useFetchTodoList';
import CompletedTodoList from 'components/todos/CompletedTodoList';

const Todos = () => {
  useFetchTodoList();

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Todos
        </Typography>

        <DndProvider backend={HTML5Backend}>
          <TodoInput />
          <TodoList />
          <CompletedTodoList />
        </DndProvider>
      </Box>
    </Container>
  );
};

export default Todos;
