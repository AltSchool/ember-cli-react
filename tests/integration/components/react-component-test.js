import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import { describe } from 'mocha';
import Ember from 'ember';
import React from 'react';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

const { run } = Ember;

describeComponent(
  'react-component',
  'Integration: ReactComponent',
  {
    integration: true,
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
      expect(this.$().text()).to.equal('Hello Alex');
    });

    it('supports props.children', function() {
      this.set('name', 'Noctis');

      this.render(hbs`
        {{#react-component "the-wrapper"}}
          {{~react-component "say-hi" name=name ~}}
        {{/react-component}}
      `);

      expect(
        this.$()
          .text()
          .trim()
      ).to.match(/^Content: Hello Noctis$/);
    });

    it('supports props.children and rerender', function() {
      this.set('name', 'Noctis');

      this.render(hbs`
        {{#react-component "the-wrapper"}}
          {{~react-component "say-hi" name=name ~}}
        {{/react-component}}
      `);

      this.set('name', 'Gladiolus');

      expect(
        this.$()
          .text()
          .trim()
      ).to.match(/^Content: Hello Gladiolus$/);
    });

    it('supports wrapping Ember components', function() {
      this.set('name', 'Ignis');

      this.render(hbs`
        {{#react-component "the-wrapper"}}
          {{~ember-say-hi name=name ~}}
        {{/react-component}}
      `);

      expect(
        this.$()
          .text()
          .trim()
      ).to.match(/^Content: Hello Ignis$/);
    });

    it('supports wrapping Ember components and rerender', function() {
      this.set('name', 'Ignis');

      this.render(hbs`
        {{#react-component "the-wrapper"}}
          {{~ember-say-hi name=name ~}}
        {{/react-component}}
      `);

      this.set('name', 'Prompto');

      expect(
        this.$()
          .text()
          .trim()
      ).to.match(/^Content: Hello Prompto$/);
    });

    it('supports wrapping text node', function() {
      this.set('value', 'Ancient');

      this.render(hbs`
        {{#react-component "the-wrapper"}}
          {{~value~}}
        {{/react-component}}
      `);

      expect(
        this.$()
          .text()
          .trim()
      ).to.match(/^Content: Ancient$/);
    });

    it('supports wrapping text node and rerender', function() {
      this.set('value', 'Ancient');

      this.render(hbs`
        {{#react-component "the-wrapper"}}
          {{~value~}}
        {{/react-component}}
      `);

      this.set('value', 'Modern');

      expect(
        this.$()
          .text()
          .trim()
      ).to.match(/^Content: Modern$/);
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

      expect(
        this.$()
          .text()
          .trim()
      ).to.match(/^!Content: Hello Luna!$/);
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

      expect(
        this.$()
          .text()
          .trim()
      ).to.match(/^!Content: Hello Iris!$/);
    });

    it('supports mutating children structure', function() {
      this.set('isComing', true);

      this.render(hbs`
        {{#react-component "the-wrapper" ~}}
          <div>
            {{~#if isComing~}}
              {{~ember-say-hi name="Ignis" ~}}
            {{~else~}}
              See ya!
            {{~/if~}}
          </div>
        {{~/react-component}}
      `);

      this.set('isComing', false);

      expect(
        this.$()
          .text()
          .trim()
      ).to.match(/^Content: See ya!$/);
    });

    it('supports Function as Child Component', function() {
      this.set('renderChildren', text =>
        React.createElement('span', null, `FACC is ${text}!!!`)
      );

      this.render(hbs`
        {{react-component "facc-wrapper" children=(action renderChildren)}}
      `);

      expect(
        this.$()
          .text()
          .trim()
      ).to.match(/^Warning: FACC is supported but anti-pattern!!!$/);
    });

    it('does not create YieldWrapper when there is no child', function() {
      this.render(hbs`{{no-yield-wrapper}}`);

      // If YieldWrapper is created, it will not render correctly.
      expect(
        this.$()
          .text()
          .trim()
      ).to.match(/^Rendered correctly$/);
    });

    it('does not create YieldWrapper when there is no child, but the component has children inside', function() {
      this.render(hbs`{{no-yield-wrapper-with-own-children}}`);

      // If YieldWrapper is created, it will not render correctly.
      const anchors = this.$('a');
      expect(anchors.length).to.equals(2);
      expect(
        anchors
          .eq(0)
          .text()
          .trim()
      ).to.equals('Link 1');
      expect(
        anchors
          .eq(1)
          .text()
          .trim()
      ).to.equals('Link 2');
    });

    it('does not create YieldWrapper when there is no child, even after rerendering', function() {
      this.set('text', 'show me!');
      this.render(hbs`{{no-yield-wrapper-with-props text=text}}`);

      // If YieldWrapper is created, it will not render correctly.
      expect(
        this.$()
          .text()
          .trim()
      ).to.match(/^Rendered correctly with "show me!"$/);

      // This test is needed because on a re-render, there is already a
      // non-comment child node (span) created by React. So simply checking
      // single comment node won't work.
      this.set('text', 'rerender me!');
      expect(
        this.$()
          .text()
          .trim()
      ).to.match(/^Rendered correctly with "rerender me!"$/);
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

      this.$('input')
        .val('Noah')
        .trigger('change');
      run.next(() => {
        expect(this.$().text()).to.contain('Hello Noah');
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

      it('supports React-style component file name', function() {
        this.render(hbs`{{react-component "ReactStyleFileName"}}`);

        expect(
          this.$()
            .text()
            .trim()
        ).to.equal('My file name is ReactStyleFileName');
      });

      it('supports React-style component file name, but render with Ember style name', function() {
        this.render(hbs`{{react-component "react-style-file-name"}}`);

        expect(
          this.$()
            .text()
            .trim()
        ).to.equal('My file name is ReactStyleFileName');
      });

      it('supports React-style component file name even without dash', function() {
        this.render(hbs`{{react-component "card"}}`);

        expect(
          this.$()
            .text()
            .trim()
        ).to.equal('I am a Card component, I have no dash!');
      });

      it('supports React-style component file name when rendering directly', function() {
        this.render(hbs`{{react-style-file-name}}`);

        expect(
          this.$()
            .text()
            .trim()
        ).to.equal('My file name is ReactStyleFileName');
      });

      it('supports React-style component file name with namespace', function() {
        this.render(hbs`{{react-component "namespace/InsideNamespace"}}`);

        expect(
          this.$()
            .text()
            .trim()
        ).to.equal('I am inside a namespace!');
      });

      it('supports React-style component file name when rendering directly with namespace', function() {
        this.render(hbs`{{namespace/inside-namespace}}`);

        expect(
          this.$()
            .text()
            .trim()
        ).to.equal('I am inside a namespace!');
      });

      describe('when both `SameNameJsx.jsx` and `same-name-jsx.jsx` exist', function() {
        it('prioritises React-style file name (SameNameJsx.jsx)', function() {
          this.render(hbs`{{react-component "SameNameJsx"}}`);

          expect(
            this.$()
              .text()
              .trim()
          ).to.equal('My file name is "SameNameJsx.jsx"');
        });

        it('prioritises React-style file name (SameNameJsx.jsx) when render with Ember-style name', function() {
          this.render(hbs`{{react-component "same-name-jsx"}}`);

          expect(
            this.$()
              .text()
              .trim()
          ).to.equal('My file name is "SameNameJsx.jsx"');
        });

        it('prioritises React-style file name (SameNameJsx.jsx) when rendering directly', function() {
          this.render(hbs`{{same-name-jsx}}`);

          expect(
            this.$()
              .text()
              .trim()
          ).to.equal('My file name is "SameNameJsx.jsx"');
        });
      });

      describe('when both `SameNameDifferentCaseMixed.jsx` and `same-name-different-case-mixed.js` (Ember) exist', function() {
        it('prioritises the React component (SameNameDifferentCaseMixed.jsx)', function() {
          this.render(hbs`{{react-component "SameNameDifferentCaseMixed"}}`);

          expect(
            this.$()
              .text()
              .trim()
          ).to.equal('My file name is "SameNameDifferentCaseMixed.jsx"');
        });

        it('prioritises the React component (SameNameDifferentCaseMixed.jsx) when render with Ember-style name', function() {
          this.render(
            hbs`{{react-component "same-name-different-case-mixed"}}`
          );

          expect(
            this.$()
              .text()
              .trim()
          ).to.equal('My file name is "SameNameDifferentCaseMixed.jsx"');
        });

        it('prioritises the React component (SameNameDifferentCaseMixed.jsx) when rendering directly', function() {
          this.render(hbs`{{same-name-different-case-mixed}}`);

          expect(
            this.$()
              .text()
              .trim()
          ).to.equal('My file name is "SameNameDifferentCaseMixed.jsx"');
        });
      });

      // The React file will overwrite Ember file as that's how Broccoli-React works.
      // Skipping this to keep this in mind.
      describe.skip('when both `same-name-same-case-mixed.jsx` and `same-name-same-case-mixed.js` (Ember) exist', function() {
        it('prioritises the React component (same-name-same-case-mixed.js)', function() {
          this.render(hbs`{{react-component "same-name-same-case-mixed"}}`);

          expect(
            this.$()
              .text()
              .trim()
          ).to.equal('My file name is "same-name-same-case-mixed.jsx"');
        });

        it('prioritises the React component (same-name-same-case-mixed.js) when rendering directly', function() {
          this.render(hbs`{{same-name-ember}}`);

          expect(
            this.$()
              .text()
              .trim()
          ).to.equal('My file name is "same-name-same-case-mixed.jsx"');
        });
      });
    });
  }
);
