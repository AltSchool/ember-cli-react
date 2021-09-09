import { click, fillIn, render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { expect } from 'chai';
import { setupRenderingTest } from 'ember-mocha';
import { describe, it } from 'mocha';
import React from 'react';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

describe('Integration: ReactComponent', function() {
  setupRenderingTest();

  it('renders', async function() {
    await render(hbs`{{react-component "say-hi"}}`);
    expect(this.element).to.exist;
  });

  // it.skip('throws error when no component found', function() {
  //   expect(() => {
  //     await render(hbs`{{react-component "missing-component"}}`);
  //   }).to.throw(/Could not find react component/);
  // });

  it('passes state', async function() {
    await render(hbs`{{react-component "say-hi" name="Alex"}}`);
    expect(this.element.textContent).to.equal('Hello Alex');
  });

  it('supports props.children', async function() {
    this.set('name', 'Noctis');

    await render(hbs`
      {{#react-component "the-wrapper"}}
        {{~react-component "say-hi" name=name ~}}
      {{/react-component}}
    `);

    expect(this.element.textContent.trim()).to.match(/^Content: Hello Noctis$/);
  });

  it('supports props.children and rerender', async function() {
    this.set('name', 'Noctis');

    await render(hbs`
      {{#react-component "the-wrapper"}}
        {{~react-component "say-hi" name=name ~}}
      {{/react-component}}
    `);

    this.set('name', 'Gladiolus');

    expect(this.element.textContent.trim()).to.match(
      /^Content: Hello Gladiolus$/
    );
  });

  it('supports wrapping Ember components', async function() {
    this.set('name', 'Ignis');

    await render(hbs`
      {{#react-component "the-wrapper"}}
        {{~ember-say-hi name=name ~}}
      {{/react-component}}
    `);

    expect(this.element.textContent.trim()).to.match(/^Content: Hello Ignis$/);
  });

  it('supports wrapping Ember components and rerender', async function() {
    this.set('name', 'Ignis');

    await render(hbs`
      {{#react-component "the-wrapper"}}
        {{~ember-say-hi name=name ~}}
      {{/react-component}}
    `);

    this.set('name', 'Prompto');

    expect(this.element.textContent.trim()).to.match(
      /^Content: Hello Prompto$/
    );
  });

  it('supports wrapping text node', async function() {
    this.set('value', 'Ancient');

    await render(hbs`
      {{#react-component "the-wrapper"}}
        {{~value~}}
      {{/react-component}}
    `);

    expect(this.element.textContent.trim()).to.match(/^Content: Ancient$/);
  });

  it('supports wrapping text node and rerender', async function() {
    this.set('value', 'Ancient');

    await render(hbs`
      {{#react-component "the-wrapper"}}
        {{~value~}}
      {{/react-component}}
    `);

    this.set('value', 'Modern');

    expect(this.element.textContent.trim()).to.match(/^Content: Modern$/);
  });

  it('supports interleaving React and Ember components', async function() {
    this.set('name', 'Luna');

    await render(hbs`
      {{#ember-box}}
        {{#react-component "the-wrapper"}}
          {{~ember-say-hi name=name ~}}
        {{/react-component}}
      {{/ember-box}}
    `);

    expect(this.element.textContent.trim()).to.match(/^!Content: Hello Luna!$/);
  });

  it('supports interleaving React and Ember components, and it rerenders when update', async function() {
    this.set('name', 'Luna');

    await render(hbs`
      {{#ember-box}}
        {{#react-component "the-wrapper"}}
          {{~ember-say-hi name=name ~}}
        {{/react-component}}
      {{/ember-box}}
    `);

    this.set('name', 'Iris');

    expect(this.element.textContent.trim()).to.match(/^!Content: Hello Iris!$/);
  });

  it('supports mutating children structure', async function() {
    this.set('isComing', true);

    await render(hbs`
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

    expect(this.element.textContent.trim()).to.match(/^Content: See ya!$/);
  });

  it('supports Function as Child Component', async function() {
    this.set('renderChildren', text =>
      React.createElement('span', null, `FACC is ${text}!!!`)
    );

    await render(hbs`
      {{react-component "facc-wrapper" children=(action renderChildren)}}
    `);

    expect(this.element.textContent.trim()).to.match(
      /^Warning: FACC is supported but anti-pattern!!!$/
    );
  });

  it('does not create YieldWrapper when there is no child', async function() {
    await render(hbs`{{no-yield-wrapper}}`);

    // If YieldWrapper is created, it will not render correctly.
    expect(this.element.textContent.trim()).to.match(/^Rendered correctly$/);
  });

  it('does not create YieldWrapper when there is no child, but the component has children inside', async function() {
    await render(hbs`{{no-yield-wrapper-with-own-children}}`);

    // If YieldWrapper is created, it will not render correctly.
    const anchors = this.element.querySelectorAll('a');
    expect(anchors.length).to.equals(2);
    expect(anchors[0].textContent.trim()).to.equals('Link 1');
    expect(anchors[1].textContent.trim()).to.equals('Link 2');
  });

  it('does not create YieldWrapper when there is no child, even after rerendering', async function() {
    this.set('text', 'show me!');
    await render(hbs`{{no-yield-wrapper-with-props text=text}}`);

    // If YieldWrapper is created, it will not render correctly.
    expect(this.element.textContent.trim()).to.match(
      /^Rendered correctly with "show me!"$/
    );

    // This test is needed because on a re-render, there is already a
    // non-comment child node (span) created by React. So simply checking
    // single comment node won't work.
    this.set('text', 'rerender me!');
    expect(this.element.textContent.trim()).to.match(
      /^Rendered correctly with "rerender me!"$/
    );
  });

  it('rerenders on state change', async function() {
    await render(hbs`{{react-component "say-hi" name=name}}`);
    this.set('name', 'Owen');
    expect(this.element.textContent).to.equal('Hello Owen');
  });

  it('rerenders when mutable state changes', async function(done) {
    await render(hbs`
      {{input value=name}}

      {{react-component "say-hi" name=name}}
    `);

    await fillIn('input', 'Noah');
    run.next(() => {
      expect(this.element.textContent).to.contain('Hello Noah');
      done();
    });
  });

  it('can use actions from action helper', async function() {
    const clickActionHandler = sinon.stub();
    this.set('didClickButton', clickActionHandler);

    await render(hbs`{{react-component "fancy-button"
      onClick=didClickButton
    }}`);

    await click('button');

    expect(clickActionHandler.called).to.be.true;
  });

  it('supports dynamically defined react component name', async function() {
    this.set('reactComponentName', 'say-hi');
    await render(hbs`{{react-component reactComponentName}}`);
    expect(this.element.querySelectorAll('.SayHi')).to.have.length(1);
    this.set('reactComponentName', 'fancy-button');
    expect(this.element.querySelectorAll('.FancyButton')).to.have.length(1);
  });

  describe('with ember-cli-react resolver', function() {
    it('can render react components directly', async function() {
      await render(hbs`
        {{say-hi name="Morgan"}}
      `);

      expect(this.element.textContent).to.contain('Hello Morgan');
    });

    it('can render react component using ember component helper', async function() {
      await render(hbs`
        {{component "say-hi" name="Morgan"}}
      `);

      expect(this.element.textContent).to.contain('Hello Morgan');
    });

    it('supports React-style component file name', async function() {
      await render(hbs`{{react-component "ReactStyleFileName"}}`);

      expect(this.element.textContent.trim()).to.equal(
        'My file name is ReactStyleFileName'
      );
    });

    it('supports React-style component file name, but render with Ember style name', async function() {
      await render(hbs`{{react-component "react-style-file-name"}}`);

      expect(this.element.textContent.trim()).to.equal(
        'My file name is ReactStyleFileName'
      );
    });

    it('supports React-style component file name even without dash', async function() {
      await render(hbs`{{react-component "card"}}`);

      expect(this.element.textContent.trim()).to.equal(
        'I am a Card component, I have no dash!'
      );
    });

    it('supports React-style component file name when rendering directly', async function() {
      await render(hbs`{{react-style-file-name}}`);

      expect(this.element.textContent.trim()).to.equal(
        'My file name is ReactStyleFileName'
      );
    });

    it('supports React-style component file name with namespace', async function() {
      await render(hbs`{{react-component "namespace/InsideNamespace"}}`);

      expect(this.element.textContent.trim()).to.equal(
        'I am inside a namespace!'
      );
    });

    it('supports React-style component file name when rendering directly with namespace', async function() {
      await render(hbs`{{namespace/inside-namespace}}`);

      expect(this.element.textContent.trim()).to.equal(
        'I am inside a namespace!'
      );
    });

    describe('when both `SameNameJsx.jsx` and `same-name-jsx.jsx` exist', function() {
      it('prioritises React-style file name (SameNameJsx.jsx)', async function() {
        await render(hbs`{{react-component "SameNameJsx"}}`);

        expect(this.element.textContent.trim()).to.equal(
          'My file name is "SameNameJsx.jsx"'
        );
      });

      it('prioritises React-style file name (SameNameJsx.jsx) when render with Ember-style name', async function() {
        await render(hbs`{{react-component "same-name-jsx"}}`);

        expect(this.element.textContent.trim()).to.equal(
          'My file name is "SameNameJsx.jsx"'
        );
      });

      it('prioritises React-style file name (SameNameJsx.jsx) when rendering directly', async function() {
        await render(hbs`{{same-name-jsx}}`);

        expect(this.element.textContent.trim()).to.equal(
          'My file name is "SameNameJsx.jsx"'
        );
      });
    });

    describe('when both `SameNameDifferentCaseMixed.jsx` and `same-name-different-case-mixed.js` (Ember) exist', function() {
      it('prioritises the React component (SameNameDifferentCaseMixed.jsx)', async function() {
        await render(hbs`{{react-component "SameNameDifferentCaseMixed"}}`);

        expect(this.element.textContent.trim()).to.equal(
          'My file name is "SameNameDifferentCaseMixed.jsx"'
        );
      });

      it('prioritises the React component (SameNameDifferentCaseMixed.jsx) when render with Ember-style name', async function() {
        await render(hbs`{{react-component "same-name-different-case-mixed"}}`);

        expect(this.element.textContent.trim()).to.equal(
          'My file name is "SameNameDifferentCaseMixed.jsx"'
        );
      });

      it('prioritises the React component (SameNameDifferentCaseMixed.jsx) when rendering directly', async function() {
        await render(hbs`{{same-name-different-case-mixed}}`);

        expect(this.element.textContent.trim()).to.equal(
          'My file name is "SameNameDifferentCaseMixed.jsx"'
        );
      });
    });

    // The React file will overwrite Ember file as that's how Broccoli-React works.
    // Skipping this to keep this in mind.
    describe.skip('when both `same-name-same-case-mixed.jsx` and `same-name-same-case-mixed.js` (Ember) exist', function() {
      it('prioritises the React component (same-name-same-case-mixed.js)', async function() {
        await render(hbs`{{react-component "same-name-same-case-mixed"}}`);

        expect(this.element.textContent.trim()).to.equal(
          'My file name is "same-name-same-case-mixed.jsx"'
        );
      });

      it('prioritises the React component (same-name-same-case-mixed.js) when rendering directly', async function() {
        await render(hbs`{{same-name-ember}}`);

        expect(this.element.textContent.trim()).to.equal(
          'My file name is "same-name-same-case-mixed.jsx"'
        );
      });
    });
  });
});
