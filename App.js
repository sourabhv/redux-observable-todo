import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import Header from "./src/components/Header";
import TodoList from "./src/components/TodoList";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Header />
        <TodoList style={styles.todoList} />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch"
  },
  todoList: {
    flex: 1
  }
});
