const expect = require('chai').expect;
const filteringMechanism = require('../');

const {CANDIDATES, FLAGS} = require('./fixtures');

describe('single category in each filter', function() {
  it('should return candidates with all matching filters', function() {
    const activeFilters = {
      conjunctiveFilters: {
        benefits: {
          set: ['A', 'C'],
        },
      },
      disjunctiveFilters: {
        paymentTypes: {
          set: ['prepaid'],
        },
        stars: {
          set: [5, 4],
        }
      }
    }
    const filteredList = filteringMechanism(CANDIDATES, activeFilters, FLAGS);
    const expectedList = [
      {paymentTypes: ['prepaid'], benefits: ['C', 'A'], stars: 4},
      {paymentTypes: ['prepaid'], benefits: ['C', 'B'], stars: 5},
      {paymentTypes: ['postpaid'], benefits: ['A', 'C'], stars: 3},
      {paymentTypes: ['prepaid'], benefits: ['A', 'C'], stars: 3},
      {paymentTypes: ['prepaid'], benefits: ['B'], stars: 5},
    ]
    expect(filteredList).to.deep.equal(expectedList);
  });
});

describe('multiple categories in each filter', function() {
  it('should return candidates with all matching filters', function() {
    const activeFilters = {
      conjunctiveFilters: {
        benefits: {
          set: ['A', 'C'],
        },
      },
      disjunctiveFilters: {
        paymentTypes: {
          set: ['prepaid'],
        },
        stars: {
          disjunctive: true,
          set: [5, 4],
        }
      }
    }
    const filteredList = filteringMechanism(CANDIDATES, activeFilters, FLAGS);
    const expectedList = [
      {paymentTypes: ['prepaid'], benefits: ['C', 'A'], stars: 4},
      {paymentTypes: ['cardless'], benefits: ['A', 'B'], stars: 4},
      {paymentTypes: ['prepaid'], benefits: ['C', 'B'], stars: 5},
      {paymentTypes: ['postpaid'], benefits: ['A', 'C'], stars: 3},
      {paymentTypes: ['prepaid'], benefits: ['A', 'C'], stars: 3},
      {paymentTypes: ['prepaid'], benefits: ['B'], stars: 5},
      {paymentTypes: ['cardless'], benefits: ['A'], stars: 5},
    ]
    expect(filteredList).to.deep.equal(expectedList);
  });
});
