import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { IStoreState } from 'store';
import { ActionCtor } from 'store/modules/todos';

export const useFetchTodoList = () => {
  const dispatch = useDispatch();
  const isCheckedTodo = useSelector((store: IStoreState) =>
    store.TodosReducer.get('isCheckedTodo'),
  );
  const isCreatedTodo = useSelector((store: IStoreState) =>
    store.TodosReducer.get('isCreatedTodo'),
  );
  const isDeletedTodo = useSelector((store: IStoreState) =>
    store.TodosReducer.get('isDeletedTodo'),
  );

  useEffect(() => {
    dispatch(ActionCtor.fetchTodoList());
  }, [dispatch]);

  useEffect(() => {
    if (isCheckedTodo) {
      dispatch(ActionCtor.fetchTodoList());
      return;
    }
  }, [dispatch, isCheckedTodo]);

  useEffect(() => {
    if (isCreatedTodo) {
      dispatch(ActionCtor.fetchTodoList());
      return;
    }
  }, [dispatch, isCreatedTodo]);

  useEffect(() => {
    if (isDeletedTodo) {
      dispatch(ActionCtor.fetchTodoList());
      return;
    }
  }, [dispatch, isDeletedTodo]);

  return null;
};
