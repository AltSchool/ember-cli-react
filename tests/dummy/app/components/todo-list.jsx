import React from 'npm:react';
import TodoItem from './todo-item';

const TodoList = props => {
  return (
    <ul>
      {props.todos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} onToggle={props.onToggle} />;
      })}
    </ul>
  );
};

export default TodoList;
