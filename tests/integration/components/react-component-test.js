/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'react-component',
  'Integration: ReactComponentComponent',
  {
    integration: true
  },
  function() {
    // it('renders', function() {
    //   // Set any properties with this.set('myProperty', 'value');
    //   // Handle any actions with this.on('myAction', function(val) { ... });
    //   // Template block usage:
    //   // this.render(hbs`
    //   //   {{#react-component}}
    //   //     template content
    //   //   {{/react-component}}
    //   // `);

    //   this.render(hbs`{{react-component}}`);
    //   expect(this.$()).to.have.length(1);
    // });
  }
);
