import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return [
      { id: 1, text: 'Buy groceries', isComplete: false },
      { id: 2, text: 'Go to the gym', isComplete: false },
      { id: 3, text: 'Read that book', isComplete: false },
      { id: 4, text: 'Get glasses fixed', isComplete: false },
    ];
  },
});
