const expect = require('chai').expect;
const filteringMechanism = require('../');

const {CANDIDATES, FLAGS} = require('./fixtures');


describe('disjunctive Categories', function() {
  let conjunctive;
  beforeEach(function () {
    conjunctive = !conjunctive;
  });

  const testConjunctiveCategory = () => {
    const conjuntionType = conjunctive? 'conjunctiveFilters' : 'disjunctiveFilters';
    const activeFilters = {
      [conjuntionType]: {
        benefits: {
          disjunctive: true,
          set: ['A', 'C'],
        },
      }
    }
    const filteredList = filteringMechanism(CANDIDATES, activeFilters, FLAGS);
    const expectedList = [
      {paymentTypes: ['prepaid'], benefits: ['C', 'A'], stars: 4},
      {paymentTypes: ['cardless'], benefits: ['A', 'B'], stars: 4},
      {paymentTypes: ['prepaid'], benefits: ['C', 'B'], stars: 5},
      {paymentTypes: ['postpaid'], benefits: ['A', 'C'], stars: 3},
      {paymentTypes: ['prepaid'], benefits: ['A', 'C'], stars: 3},
      {paymentTypes: ['cardless'], benefits: ['A'], stars: 5},
    ]

    expect(filteredList).to.deep.equal(expectedList);

  };

  it('should return candidates with any matching filters (conjunctiveFilters)', testConjunctiveCategory)
  it('should return candidates with any matching filters (disjunctiveFilters)', testConjunctiveCategory)
});

describe('conjunctive Categories', function() {
  let conjunctive;
  beforeEach(function () {
    conjunctive = !conjunctive;
  });

  const testConjunctiveCategory = () => {
    const conjuntionType = conjunctive? 'conjunctiveFilters' : 'disjunctiveFilters';
    const activeFilters = {
      [conjuntionType]: {
        benefits: {
          set: ['A', 'C'],
        },
      }
    }
    const filteredList = filteringMechanism(CANDIDATES, activeFilters, FLAGS);
    const expectedList = [
      {paymentTypes: ['prepaid'], benefits: ['C', 'A'], stars: 4},
      {paymentTypes: ['postpaid'], benefits: ['A', 'C'], stars: 3},
      {paymentTypes: ['prepaid'], benefits: ['A', 'C'], stars: 3},
    ]
    expect(filteredList).to.deep.equal(expectedList);

  };

  it('should return candidates with exactly matching filters (conjunctiveFilters)', testConjunctiveCategory)
  it('should return candidates with exactly matching filters (disjunctiveFilters)', testConjunctiveCategory)
});