import Ember from 'ember';

export default Ember.Controller.extend({
  completedTodos: Ember.computed.filterBy('model', 'isComplete'),

  value: 'Noctis',

  onToggle(todoId) {
    let todos = this.get('model').map((todo) => {
      if (todo.id === todoId) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });

    this.set('model', todos);
  },

  actions: {
    onClick() {
      this.set('value', 'blahd');
    }
  }
});
