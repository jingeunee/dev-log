import List from '@mui/material/List';
import { useSelector } from 'react-redux';
import { IStoreState } from 'store';
import styled from 'styled-components';
import CompletedTodoListRow from './CompletedTodoListRow';

const CompletedTodoList = () => {
  const todoList = useSelector((store: IStoreState) =>
    store.TodosReducer.get('todoList').filter((o) => o.get('isChecked')),
  );

  if (todoList.size === 0) {
    return null;
  }

  return (
    <StyledList sx={{ bgcolor: 'background.paper' }} dense={true}>
      완료된 리스트
      {todoList.map((o, i) => {
        const id = o.get('id');
        const isChecked = o.get('isChecked');
        const text = o.get('text');

        return (
          <CompletedTodoListRow
            key={`completed-row-${id}`}
            index={i}
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

  margin-top: 20px;
`;

export default CompletedTodoList;
