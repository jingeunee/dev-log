import axios from 'axios';
import Cookie from 'js-cookie';
import { List, Record } from 'immutable';
import { AnyAction } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { IStoreState } from 'store';

const prefix = 'toods';
const url =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL || ''
    : 'http://localhost:8080';

export const ActionTypes = {
  TRY_FETCH_TODO_LIST: `${prefix}/TRY_FETCH_TODO_LIST`,
  REQUEST_FETCH_TODO_LIST: `${prefix}/REQUEST_FETCH_TODO_LIST`,
  SUCCESS_FETCH_TODO_LIST: `${prefix}/SUCCESS_FETCH_TODO_LIST`,
  FAILURE_FETCH_TODO_LIST: `${prefix}/FAILURE_FETCH_TODO_LIST`,

  TRY_CHECK_TODO: `${prefix}/TRY_CHECK_TODO`,
  REQUEST_CHECK_TODO: `${prefix}/REQUEST_CHECK_TODO`,
  SUCCESS_CHECK_TODO: `${prefix}/SUCCESS_CHECK_TODO`,
  FAILURE_CHECK_TODO: `${prefix}/FAILURE_CHECK_TODO`,

  TRY_CREATE_TODO: `${prefix}/TRY_CREATE_TODO`,
  REQUEST_CREATE_TODO: `${prefix}/REQUEST_CREATE_TODO`,
  SUCCESS_CREATE_TODO: `${prefix}/SUCCESS_CREATE_TODO`,
  FAILURE_CREATE_TODO: `${prefix}/FAILURE_CREATE_TODO`,

  TRY_DELETE_TODO: `${prefix}/TRY_DELETE_TODO`,
  REQUEST_DELETE_TODO: `${prefix}/REQUEST_DELETE_TODO`,
  SUCCESS_DELETE_TODO: `${prefix}/SUCCESS_DELETE_TODO`,
  FAILURE_DELETE_TODO: `${prefix}/FAILURE_DELETE_TODO`,
};

export const ActionCtor = {
  fetchTodoList: createAction(ActionTypes.TRY_FETCH_TODO_LIST),
  checkTodo: createAction<number>(ActionTypes.TRY_CHECK_TODO),
  createTodo: createAction<string>(ActionTypes.TRY_CREATE_TODO),
  deleteTodo: createAction(ActionTypes.TRY_DELETE_TODO),
};

export function* TodosSaga() {
  yield takeLatest(ActionTypes.TRY_FETCH_TODO_LIST, FetchTodoList);
  yield takeLatest(ActionTypes.TRY_CHECK_TODO, CheckTodo);
  yield takeLatest(ActionTypes.TRY_CREATE_TODO, CreateTodo);
  yield takeLatest(ActionTypes.TRY_DELETE_TODO, DeleteTodo);
}
function* FetchTodoList(): Generator<any, any, any> {
  try {
    yield put({ type: ActionTypes.REQUEST_FETCH_TODO_LIST });

    const response = yield call(() =>
      axios
        .get(`${url}/todos`, {
          headers: {
            Authorization: `Bearer ${Cookie.get('token') || ''}`,
          },
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            return res;
          }
          throw res;
        })
        .then((res) => res.data)
        .catch((err) => err),
    );

    const results = {
      rows: List(response.map((o: any) => new TodoState(o))),
      count: response.length,
    };

    yield put({ type: ActionTypes.SUCCESS_FETCH_TODO_LIST, payload: results });
  } catch (error) {
    yield put({ type: ActionTypes.FAILURE_FETCH_TODO_LIST });
  }
}
function* CheckTodo(action: AnyAction) {
  try {
    yield put({ type: ActionTypes.REQUEST_CHECK_TODO });

    yield call(() =>
      axios
        .put(
          `${url}/todos/check/${action.payload}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${Cookie.get('token') || ''}`,
            },
          },
        )
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            return res;
          }
          throw res;
        })
        .catch((err) => Promise.reject(err)),
    );

    const state: IStoreState = yield select();
    const todoList = state.TodosReducer.get('todoList');
    const findInx = todoList.findIndex((o) => o.get('id') === action.payload);

    yield put({
      type: ActionTypes.SUCCESS_CHECK_TODO,
      payload: { index: findInx },
    });
  } catch (error) {
    yield put({ type: ActionTypes.FAILURE_CHECK_TODO });
  }
}
function* CreateTodo(action: AnyAction) {
  try {
    yield put({ type: ActionTypes.REQUEST_CREATE_TODO });

    yield call(() =>
      axios
        .post(
          `${url}/todos`,
          {
            text: action.payload,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookie.get('token') || ''}`,
            },
          },
        )
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            return res;
          }
          throw res;
        })
        .catch((err) => Promise.reject(err)),
    );

    yield put({ type: ActionTypes.SUCCESS_CREATE_TODO });
  } catch (error) {
    yield put({ type: ActionTypes.FAILURE_CREATE_TODO });
  }
}
function* DeleteTodo(action: AnyAction) {
  try {
    yield put({ type: ActionTypes.REQUEST_DELETE_TODO });

    yield call(() =>
      axios
        .delete(`${url}/todos/${action.payload}`, {
          headers: {
            Authorization: `Bearer ${Cookie.get('token') || ''}`,
          },
        })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            return res;
          }
          throw res;
        })
        .catch((err) => Promise.reject(err)),
    );

    yield put({ type: ActionTypes.SUCCESS_DELETE_TODO });
  } catch (error) {
    yield put({ type: ActionTypes.FAILURE_DELETE_TODO });
  }
}

interface ITodo {
  id: number;
  text: string;
  isChecked: boolean;
  createdAt: Date | number;
  lastModifiedAt: Date | number;
}
const TodoRecord = Record<ITodo>({
  id: 0,
  text: '',
  isChecked: false,
  createdAt: 0,
  lastModifiedAt: 0,
});
export class TodoState extends TodoRecord {
  constructor(props?: ITodo) {
    if (props) {
      props.isChecked = (props?.isChecked || ('' as string)) === 'T';
    }
    super(props);
  }
}

interface ITodosState {
  fetchTodoListActionType: string;
  isFetchingTodoList: boolean;
  todoList: List<TodoState>;
  todoListCount: number;

  checkTodoActionType: string;
  isCheckingTodo: boolean;
  isCheckedTodo: boolean;

  createTodoActionType: string;
  isCreatingTodo: boolean;
  isCreatedTodo: boolean;

  deleteTodoActionType: string;
  isDeletingTodo: boolean;
  isDeletedTodo: boolean;
}
const TodosStateRecord = Record<ITodosState>({
  fetchTodoListActionType: '',
  isFetchingTodoList: false,
  todoList: List(),
  todoListCount: 0,

  checkTodoActionType: '',
  isCheckingTodo: false,
  isCheckedTodo: false,

  createTodoActionType: '',
  isCreatingTodo: false,
  isCreatedTodo: false,

  deleteTodoActionType: '',
  isDeletingTodo: false,
  isDeletedTodo: false,
});
export class TodosState extends TodosStateRecord {}

const initState = new TodosState();
const TodosReducer = handleActions<TodosState, AnyAction>(
  {
    [ActionTypes.REQUEST_FETCH_TODO_LIST]: (state, action) => {
      return state
        .set('fetchTodoListActionType', action.type)
        .set('isFetchingTodoList', true);
    },
    [ActionTypes.SUCCESS_FETCH_TODO_LIST]: (state, action) => {
      return state
        .set('fetchTodoListActionType', action.type)
        .set('isFetchingTodoList', false)
        .set('todoList', action.payload.rows)
        .set('todoListCount', action.payload.count);
    },
    [ActionTypes.FAILURE_FETCH_TODO_LIST]: (state, action) => {
      return state
        .set('fetchTodoListActionType', action.type)
        .set('isFetchingTodoList', false);
    },

    [ActionTypes.REQUEST_CHECK_TODO]: (state, action) => {
      return state
        .set('checkTodoActionType', action.type)
        .set('isCheckingTodo', true)
        .set('isCheckedTodo', false);
    },
    [ActionTypes.SUCCESS_CHECK_TODO]: (state, action) => {
      return state
        .set('checkTodoActionType', action.type)
        .set('isCheckingTodo', false)
        .set('isCheckedTodo', true)
        .updateIn(
          ['todoList', action.payload.index, 'isChecked'],
          (isChecked) => !isChecked,
        );
    },
    [ActionTypes.FAILURE_CHECK_TODO]: (state, action) => {
      return state
        .set('checkTodoActionType', action.type)
        .set('isCheckingTodo', false)
        .set('isCheckedTodo', false);
    },

    [ActionTypes.REQUEST_CREATE_TODO]: (state, action) => {
      return state
        .set('createTodoActionType', action.type)
        .set('isCreatingTodo', true)
        .set('isCreatedTodo', false);
    },
    [ActionTypes.SUCCESS_CREATE_TODO]: (state, action) => {
      return state
        .set('createTodoActionType', action.type)
        .set('isCreatingTodo', false)
        .set('isCreatedTodo', true);
    },
    [ActionTypes.FAILURE_CREATE_TODO]: (state, action) => {
      return state
        .set('createTodoActionType', action.type)
        .set('isCreatingTodo', false)
        .set('isCreatedTodo', false);
    },

    [ActionTypes.REQUEST_DELETE_TODO]: (state, action) => {
      return state
        .set('deleteTodoActionType', action.type)
        .set('isDeletingTodo', true)
        .set('isDeletedTodo', false);
    },
    [ActionTypes.SUCCESS_DELETE_TODO]: (state, action) => {
      return state
        .set('deleteTodoActionType', action.type)
        .set('isDeletingTodo', false)
        .set('isDeletedTodo', true);
    },
    [ActionTypes.FAILURE_DELETE_TODO]: (state, action) => {
      return state
        .set('deleteTodoActionType', action.type)
        .set('isDeletingTodo', false)
        .set('isDeletedTodo', false);
    },
  },
  initState,
);

export default TodosReducer;
