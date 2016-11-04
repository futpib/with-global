/* eslint-env mocha */

const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);

const { expect, spy } = chai;

const withGlobal = require('with-global');

describe('withGlobal', () => {
  const library_ = {};

  beforeEach(() => {
    delete window.library;
  })

  it('calls the callback', () => {
    const callback = spy();

    withGlobal({}, callback);

    expect(callback).to.have.been.called.once;
  });

  it('returns callback`s return value', () => {
    const value = {};

    const returned = withGlobal({}, () => value);

    expect(returned).to.equal(value);
  });

  it('throws what callback throws', () => {
    const error = {};
    try {
      withGlobal({ library: library_ }, () => {
        throw error;
      });
      expect.fail();
    } catch (e) {
      expect(e).to.equal(error);
    }
  });

  it('sets given global variables for callback', () => {
    withGlobal({ library: library_ }, () => {
      expect(window.library).to.equal(library_);
    });
  });

  it('cleans up given global variables afterwards', () => {
    withGlobal({ library: library_ }, () => {});

    expect(window.library).to.be.undefined;
  });

  it('restores old global variables afterwards', () => {
    const oldLibrary_ = {};

    window.library = oldLibrary_;

    withGlobal({ library: library_ }, () => {});

    expect(window.library).to.be.equal(oldLibrary_);
  });

  it('cleans up when callback throws', () => {
    try {
      withGlobal({ library: library_ }, () => {
        throw new Error;
      });
    } catch (e) {
      // noop
    }

    expect(window.library).to.be.undefined;
  });
});
