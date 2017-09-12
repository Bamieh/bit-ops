const expect = require('chai').expect;
const filteringMechanism = require('../');

const {CANDIDATES, FLAGS} = require('./fixtures');

describe('conjunctive filters', function() {
  describe('multiple conjunctive Categories', function() {
    it('should return candidates with all matching filters', function() {
      const activeFilters = {
        conjunctiveFilters: {
          benefits: {
            set: ['A', 'C'],
          },
          paymentTypes: {
            set: ['prepaid'],
          },
        }
      }
      const filteredList = filteringMechanism(CANDIDATES, activeFilters, FLAGS);
      const expectedList = [
        {paymentTypes: ['prepaid'], benefits: ['C', 'A'], stars: 4},
        {paymentTypes: ['prepaid'], benefits: ['A', 'C'], stars: 3},
      ]
      expect(filteredList).to.deep.equal(expectedList);
    });
  });

  describe('multiple disjunctive Categories', function() {
    it('should return candidates with any matching filters', function() {
      const activeFilters = {
        conjunctiveFilters: {
          benefits: {
            disjunctive: true,
            set: ['A', 'C'],
          },
          paymentTypes: {
            disjunctive: true,
            set: ['prepaid'],
          },
        }
      }
      const filteredList = filteringMechanism(CANDIDATES, activeFilters, FLAGS);
      const expectedList = [
        {paymentTypes: ['prepaid'], benefits: ['C', 'A'], stars: 4},
        {paymentTypes: ['prepaid'], benefits: ['C', 'B'], stars: 5},
        {paymentTypes: ['prepaid'], benefits: ['A', 'C'], stars: 3},
      ]
      expect(filteredList).to.deep.equal(expectedList);
    });
  });

  describe('multiple mixed Categories', function() {
    it('should return candidates with any matching filters', function() {
      const activeFilters = {
        conjunctiveFilters: {
          benefits: {
            disjunctive: true,
            set: ['B'],
          },
          paymentTypes: {
            set: ['prepaid'],
          },
        }
      }
      const filteredList = filteringMechanism(CANDIDATES, activeFilters, FLAGS);
      const expectedList = [
        {paymentTypes: ['prepaid'], benefits: ['C', 'B'], stars: 5},
        {paymentTypes: ['prepaid'], benefits: ['B'], stars: 5},
      ]
      expect(filteredList).to.deep.equal(expectedList);
    });
  });

});
