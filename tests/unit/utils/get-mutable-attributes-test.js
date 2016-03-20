/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import getMutableAttributes from 'ember-react/utils/get-mutable-attributes';

describe('utils | getMutableAttributes', function() {
  // Smoke test to ensure the way we load in ember internals doesn't throw
  it('works', function() {
    let result = getMutableAttributes({foo: 'bar', value: 123 });
    expect(result.foo).to.equal('bar');
    expect(result.value).to.equal(123);
  });
});
