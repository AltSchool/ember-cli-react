import Ember from 'ember';
import Resolver from 'ember-resolver';

import ReactComponent from 'ember-cli-react/components/react-component';

const { get } = Ember;

export default Resolver.extend({
  resolveComponent(parsedName) {
    const result = this.resolveOther(parsedName);

    if (!result) {
      return;
    }

    if (get(result, 'isComponentFactory')) {
      return result;
    } else {
      return ReactComponent.extend({
        reactComponent: result,
      });
    }
  },

  resolveReactComponent(parsedName) {
    parsedName.type = 'component';
    const result = this.resolveOther(parsedName);
    parsedName.type = 'react-component';
    return result;
  },
});
