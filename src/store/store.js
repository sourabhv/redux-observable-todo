import { createStore, combineReducers, applyMiddleware } from "redux";
import { ofType, combineEpics, createEpicMiddleware } from "redux-observable";
import { map, flatMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_TODOS,
  GET_TODOS_SUCCESS,
  ADD_TODO,
  ADD_TODO_SUCCESS,
  COMPLETE_TODO,
  COMPLETE_TODO_SUCCESS,
  getUserSuccess,
  getTodosSuccess,
  addTodoSuccess,
  completeTodoSuccess
} from "./actions";

import * as Api from "../api";

function user(state = {}, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case GET_TODOS_SUCCESS:
      return action.payload;
    case ADD_TODO_SUCCESS:
      return [...state, action.payload];
    case COMPLETE_TODO_SUCCESS:
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: true };
        }
        return todo;
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({ user, todos });

const userEpic = action$ =>
  action$.pipe(
    ofType(GET_USER),
    flatMap(() => Api.getUser()),
    map(user => getUserSuccess(user))
  );

const getTodosEpic = action$ =>
  action$.pipe(
    ofType(GET_TODOS),
    flatMap(() => Api.getTodos()),
    map(({ todos }) => getTodosSuccess(todos))
  );

const addTodoEpic = action$ =>
  action$.pipe(
    ofType(ADD_TODO),
    flatMap(action => Api.addTodo(action.payload)),
    map(todo => addTodoSuccess(todo))
  );

const completeTodoEpic = action$ =>
  action$.pipe(
    ofType(COMPLETE_TODO),
    flatMap(action => Api.completeTodo(action.payload)),
    map(todo => completeTodoSuccess(todo))
  );

const rootEpic = combineEpics(
  userEpic,
  getTodosEpic,
  addTodoEpic,
  completeTodoEpic
);

const epicMiddleware = createEpicMiddleware();
export const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);
