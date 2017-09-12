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
  FILTERS: {
    paymentTypes: ['prepaid', 'cardless', 'postpaid'],
    benefits: ['A', 'B', 'C'],
    stars: [1,2,3,4,5],
  }
}