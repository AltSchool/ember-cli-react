import React from 'npm:react';
import TodoItem from './todo-item';

export default function(props) {
  return (
    <ul>
      {props.todos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} onToggle={props.onToggle} />;
      })}
    </ul>
  );
}
