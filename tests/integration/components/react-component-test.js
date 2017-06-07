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
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

const { run } = Ember;

describeComponent(
  'react-component',
  'Integration: ReactComponentComponent',
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
      this.render(hbs`
        {{#react-component "the-wrapper"}}
          {{react-component "say-hi" name="Noctis"}}
        {{/react-component}}
      `);

      expect(this.$().text().trim()).to.match(/^Content:\s+Hello Noctis$/);
    });

    it('supports wrapping Ember components', function() {
      this.render(hbs`
        {{#react-component "the-wrapper"}}
          {{ember-say-hi name="Ignis"}}
        {{/react-component}}
      `);

      expect(this.$().text().trim()).to.match(/^Content:\s+Hello Ignis$/);
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
