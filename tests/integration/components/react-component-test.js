/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import {
  describe
} from 'mocha';
import Ember from 'ember';
import React from 'npm:react';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

const { run } = Ember;

describeComponent(
  'react-component',
  'Integration: ReactComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      this.render(hbs`{{react-component "say-hi"}}`);
      expect(this.$()).to.have.length(1);
    });

    it.skip('throws error when no component found', function() {
      expect(() => {
        this.render(hbs`{{react-component "missing-component"}}`);
      }).to.throw(/Could not find react component/);
    });

    it('passes state', function() {
      this.render(hbs`{{react-component "say-hi" name="Alex"}}`);
      expect(this.$().text()).to.equal("Hello Alex");
    });

    it('supports props.children', function() {
      this.set('name', 'Noctis');

      this.render(hbs`
        {{#react-component "the-wrapper"}}
          {{~react-component "say-hi" name=name ~}}
        {{/react-component}}
      `);

      expect(this.$().text().trim()).to.match(/^Content: Hello Noctis$/);
    });

    it('supports props.children and rerender', function() {
      this.set('name', 'Noctis');

      this.render(hbs`
        {{#react-component "the-wrapper"}}
          {{~react-component "say-hi" name=name ~}}
        {{/react-component}}
      `);

      this.set('name', 'Gladiolus');

      expect(this.$().text().trim()).to.match(/^Content: Hello Gladiolus$/);
    });

    it('supports wrapping Ember components', function() {
      this.set('name', 'Ignis');

      this.render(hbs`
        {{#react-component "the-wrapper"}}
          {{~ember-say-hi name=name ~}}
        {{/react-component}}
      `);

      expect(this.$().text().trim()).to.match(/^Content: Hello Ignis$/);
    });

    it('supports wrapping Ember components and rerender', function() {
      this.set('name', 'Ignis');

      this.render(hbs`
        {{#react-component "the-wrapper"}}
          {{~ember-say-hi name=name ~}}
        {{/react-component}}
      `);

      this.set('name', 'Prompto');

      expect(this.$().text().trim()).to.match(/^Content: Hello Prompto$/);
    });

    it('supports wrapping text node', function() {
      this.set('value', 'Ancient');

      this.render(hbs`
        {{#react-component "the-wrapper"}}
          {{~value~}}
        {{/react-component}}
      `);

      expect(this.$().text().trim()).to.match(/^Content: Ancient$/);
    });

    it('supports wrapping text node and rerender', function() {
      this.set('value', 'Ancient');

      this.render(hbs`
        {{#react-component "the-wrapper"}}
          {{~value~}}
        {{/react-component}}
      `);

      this.set('value', 'Modern');

      expect(this.$().text().trim()).to.match(/^Content: Modern$/);
    });

    it('supports interleaving React and Ember components', function() {
      this.set('name', 'Luna');

      this.render(hbs`
        {{#ember-box}}
          {{#react-component "the-wrapper"}}
            {{~ember-say-hi name=name ~}}
          {{/react-component}}
        {{/ember-box}}
      `);

      expect(this.$().text().trim()).to.match(/^!Content: Hello Luna!$/);
    });

    it('supports interleaving React and Ember components, and it rerenders when update', function() {
      this.set('name', 'Luna');

      this.render(hbs`
        {{#ember-box}}
          {{#react-component "the-wrapper"}}
            {{~ember-say-hi name=name ~}}
          {{/react-component}}
        {{/ember-box}}
      `);

      this.set('name', 'Iris');

      expect(this.$().text().trim()).to.match(/^!Content: Hello Iris!$/);
    });

    it('supports Function as Child Component', function () {
      this.set('renderChildren', text => React.createElement('span', null, `FACC is ${text}!!!`))

      this.render(hbs`
        {{react-component "facc-wrapper" children=(action renderChildren)}}
      `);

      expect(this.$().text().trim()).to.match(/^Warning: FACC is supported but anti-pattern!!!$/);
    });

    it('rerenders on state change', function() {
      this.render(hbs`{{react-component "say-hi" name=name}}`);
      this.set('name', 'Owen');
      expect(this.$().text()).to.equal('Hello Owen');
    });

    it('rerenders when mutable state changes', function(done) {
      this.render(hbs`
        {{input value=name}}

        {{react-component "say-hi" name=name}}
      `);

      this.$('input').val('Noah').trigger('change');
      run.next(() => {
        expect(this.$().text()).to.contain("Hello Noah");
        done();
      });
    });

    it('can use actions from action helper', function() {
      const clickActionHandler = sinon.stub();
      this.on('didClickButton', clickActionHandler);

      this.render(hbs`{{react-component "fancy-button"
        onClick=(action "didClickButton")
      }}`);

      this.$('button').click();

      expect(clickActionHandler.called).to.be.true;
    });

    it('supports dynamically defined react component name', function() {
      this.set('reactComponentName', 'say-hi');
      this.render(hbs`{{react-component reactComponentName}}`);
      expect(this.$('.SayHi')).to.have.length(1);
      this.set('reactComponentName', 'fancy-button');
      expect(this.$('.FancyButton')).to.have.length(1);
    });

    describe('with ember-cli-react resolver', function() {
      it('can render react components directly', function() {
        this.render(hbs`
          {{say-hi name="Morgan"}}
        `);

        expect(this.$().text()).to.contain('Hello Morgan');
      });

      it('can render react component using ember component helper', function() {
        this.render(hbs`
          {{component "say-hi" name="Morgan"}}
        `);

        expect(this.$().text()).to.contain('Hello Morgan');
      });
    });
  }
);
