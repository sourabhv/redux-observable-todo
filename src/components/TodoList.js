import React from "react";
import { connect } from "react-redux";
import { View, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { TextInput, Button, Checkbox, Colors, Title } from "react-native-paper";
import { getTodos, completeTodo, addTodo } from "../store/actions";
import colors from "../colors";
import { white } from "ansi-colors";

class TodoList extends React.Component {
  state = {
    todo: ""
  };

  componentDidMount() {
    this.props.getTodos();
  }

  renderFormInput() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          label="Add a todo"
          mode="outlined"
          value={this.state.todo}
          onChangeText={todo => this.setState({ todo })}
        />
        <Button
          mode="contained"
          style={{ marginLeft: 16 }}
          onPress={() => {
            if (this.state.todo.trim() === "") return;
            this.props.addTodo(this.state.todo);
            this.setState({ todo: "" });
          }}
        >
          Add
        </Button>
      </View>
    );
  }

  renderTodoItem(todo, index) {
    return (
      <View
        key={todo.id}
        style={[
          styles.listItem,
          { backgroundColor: colors[index % colors.length] }
        ]}
      >
        <Checkbox.Android
          theme={{ colors: { accent: "white" } }}
          uncheckedColor="white"
          status={todo.completed ? "checked" : "unchecked"}
          onPress={() => {
            if (!todo.completed) {
              this.props.completeTodo(todo.id);
            }
          }}
        />
        <Title style={styles.listItemText}>{todo.text}</Title>
      </View>
    );
  }

  render() {
    const { style, todos } = this.props;
    return (
      <View style={style}>
        {this.renderFormInput()}
        <ScrollView style={styles.todoList}>
          <SafeAreaView>
            {todos.map((todo, idx) => this.renderTodoItem(todo, idx))}
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { todos: state.todos };
}

function mapDispatchToProps(dispatch) {
  return {
    getTodos: () => dispatch(getTodos()),
    completeTodo: id => dispatch(completeTodo(id)),
    addTodo: text => dispatch(addTodo(text))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FAFAFA"
  },
  input: {
    flex: 1,
    backgroundColor: "#FAFAFA"
  },
  todoList: {
    flex: 1
  },
  listItem: {
    padding: 16,
    flexDirection: "row"
  },
  listItemText: {
    flex: 1,
    color: "white",
    fontWeight: "300"
  }
});
