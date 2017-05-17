__This is ALPHA Software__

This was built as a prototype to evaluate using react inside of our Ember apps. We are not yet using it in production. PRs and constructive questions and comments via [GitHub issues](https://github.com/AltSchool/ember-cli-react/issues/new) are highly encouraged.

# ember-cli-react
[![Circle CI](https://circleci.com/gh/AltSchool/ember-cli-react.svg?style=shield)](https://circleci.com/gh/AltSchool/ember-cli-react)

Use React component hierarchies inside your Ember app.

## Overview

Install the addon in your app:

```
ember install ember-cli-react
```

Write your first JSX React component:

```javascript
// app/components/say-hi.jsx
import React from 'npm:react';

export default function(props) {
  return <span>Hello {props.name}</span>
}
```

Then render your component in a handlebars template:

```handlebars
{{say-hi name="Alex"}}
```

## Mini Todo List Example

A more complete example which demonstrates how to handle actions from within
React components and how to share state. To see it working run `ember server` in
this repo.


#### app/templates/application.hbs

```handlebars
{{todo-list
  onToggle=(action onToggle)
  todos=model
}}

Completed {{completedTodos.length}} todos
```

#### app/routes/application.js

```javascript
export default Ember.Route.extend({
  model() {
    return [
      { id: 1, text: 'Buy groceries', isComplete: false },
      { id: 2, text: 'Go to the gym', isComplete: false },
      { id: 3, text: 'Read that book', isComplete: false },
      { id: 4, text: 'Get glasses fixed', isComplete: false }
    ];
  }
});
```

#### app/controllers/application.js

```javascript
export default Ember.Controller.extend({
  completedTodos: Ember.computed.filterBy('model', 'isComplete'),

  onToggle(todoId) {
    let todos = this.get('model').map((todo) => {
      if (todo.id === todoId) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });

    this.set('model', todos);
  }
});
```

#### app/components/todo-list.jsx

```jsx
import React from 'npm:react';
import TodoItem from './todo-item';

export default function(props) {
  return (
    <ul>
      {props.todos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} onToggle={props.onToggle} />
      })}
    </ul>
  );
}
```

#### app/components/todo-item.jsx

```jsx
import React from 'npm:react';
import ReactDOM from 'npm:react-dom';

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
```



## What's Missing

There is no React `link-to` equivalent for linking to Ember routes inside of your React code. Instead pass action handlers that call `transitionTo` from an Ember route or component.

In order to create minified production builds of React you must set `NODE_ENV=production`.

