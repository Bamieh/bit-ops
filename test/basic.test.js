import {
  buildFlags,
  activateFilter,
  deactivateFilter,
} from '../src';

import {CANDIDATES, FILTERS} from './fixture/basic';

describe('activate Filter', function() {
  before(function() {
    this.flags = buildFlags(FILTERS);
  })
  it('should return a new mask with the provided flag added', function() {
    const activeFilterMask = 1;
    const wirelessFilterFlag = 2;

    const newFilterState = activateFilter(activeFilterMask, wirelessFilterFlag);
    expect(newFilterState).to.equal(3);
  })
  it('returns new mask if no previous mask was defined with value equal to provided flag', function() {
    const wirelessFilterFlag = 2;

    const newFilterState = activateFilter(undefined, wirelessFilterFlag);
    expect(newFilterState).to.equal(wirelessFilterFlag);
  })
});

describe('deactivate Filter', function() {
  before(function() {
    this.flags = buildFlags(FILTERS);
  })
  it('should return a new mask with the provided flag removed', function() {
    const activeFilterMask = 3;
    const wirelessFilterFlag = 2;

    const newFilterState = deactivateFilter(activeFilterMask, wirelessFilterFlag);
    expect(newFilterState).to.equal(1);
  })
  it('should return same mask value if the provided flag not in the mask', function() {
    const activeFilterMask = 0;
    const wirelessFilterFlag = 8;

    const newFilterState = deactivateFilter(activeFilterMask, wirelessFilterFlag);
    expect(newFilterState).to.equal(activeFilterMask);
  })
  it('should return 0 if no mask provided', function() {
    const wirelessFilterFlag = 2;
    const newFilterState = deactivateFilter(undefined, wirelessFilterFlag);
    expect(newFilterState).to.equal(0);
  })
});