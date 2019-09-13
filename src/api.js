import { pipe, map } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

const BASE_URL =
  "https://us-central1-redux-observable-todos.cloudfunctions.net/api";

export const getUser = () => ajax.getJSON(`${BASE_URL}/user`);
export const getTodos = () => ajax.getJSON(`${BASE_URL}/todo`);
export const addTodo = text =>
  ajax({
    url: `${BASE_URL}/todo`,
    method: "POST",
    body: { text }
  }).pipe(map(data => data.response));

export const completeTodo = id =>
  ajax({
    url: `${BASE_URL}/todo/${id}/complete`,
    method: "POST"
  }).pipe(map(data => data.response));
