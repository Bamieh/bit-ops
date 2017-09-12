module.exports = {
  CANDIDATES: [
    {paymentTypes: ['prepaid'], benefits: ['C', 'A'], stars: 4},
    {paymentTypes: ['cardless'], benefits: ['A', 'B'], stars: 4},
    {paymentTypes: ['prepaid'], benefits: ['C', 'B'], stars: 5},
    {paymentTypes: ['postpaid'], benefits: ['A', 'C'], stars: 3},
    {paymentTypes: ['postpaid'], benefits: ['B'], stars: 2},
    {paymentTypes: ['prepaid'], benefits: ['A', 'C'], stars: 3},
    {paymentTypes: ['prepaid'], benefits: ['B'], stars: 5},
    {paymentTypes: ['cardless'], benefits: ['A'], stars: 5},
  ],
  FLAGS: {
    benefits: {
      A: 1,
      B: 2,
      C: 4,
    },
    paymentTypes:{
      cardless: 1,
      prepaid: 2,
      postpaid: 4,
    },
    stars: {
      5: 1,
      4: 2,
      3: 4,
      2: 8,
      1: 16,
    }
  },
}