const expect = require('chai').expect;
const filteringMechanism = require('../');

const {CANDIDATES, FLAGS} = require('./fixtures');

describe('disjunctive filters', function() {
  describe('multiple conjunctive Categories', function() {
    it('should return candidates with all matching filters', function() {
      const activeFilters = {
        disjunctiveFilters: {
          benefits: {
            set: ['A', 'C'],
          },
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

  describe('multiple disjunctive Categories', function() {
    it('should return candidates with any matching filters', function() {
      const activeFilters = {
        disjunctiveFilters: {
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

  describe('multiple mixed Categories', function() {
    it('should return candidates with any matching filters', function() {
      const activeFilters = {
        disjunctiveFilters: {
          benefits: {
            disjunctive: true,
            set: ['C', 'A'],
          },
          paymentTypes: {
            set: ['prepaid'],
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
        {paymentTypes: ['prepaid'], benefits: ['B'], stars: 5},
        {paymentTypes: ['cardless'], benefits: ['A'], stars: 5},
      ]
      expect(filteredList).to.deep.equal(expectedList);
    });
  });

});
