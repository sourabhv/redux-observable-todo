export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_TODOS = "GET_TODOS";
export const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
export const ADD_TODO = "ADD_TODO";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const COMPLETE_TODO = "COMPLETE_TODO";
export const COMPLETE_TODO_SUCCESS = "COMPLETE_TODO_SUCCESS";

export const getUser = () => ({ type: GET_USER });
export const getUserSuccess = user => ({
  type: GET_USER_SUCCESS,
  payload: user
});
export const getTodos = () => ({ type: GET_TODOS });
export const getTodosSuccess = todos => ({
  type: GET_TODOS_SUCCESS,
  payload: todos
});
export const addTodo = text => ({ type: ADD_TODO, payload: text });
export const addTodoSuccess = todo => ({
  type: ADD_TODO_SUCCESS,
  payload: todo
});
export const completeTodo = id => ({ type: COMPLETE_TODO, payload: id });
export const completeTodoSuccess = todo => ({
  type: COMPLETE_TODO_SUCCESS,
  payload: todo
});
