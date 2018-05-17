import React from 'npm:react';

export default class TodoItem extends React.Component {
  render() {
    let todo = this.props.todo;

    return (
      <li>
        <input
          type="checkbox"
          checked={todo.isComplete}
          onChange={this.props.onToggle.bind(null, todo.id)}
        />
        <span>{todo.text}</span>
      </li>
    );
  }
}
