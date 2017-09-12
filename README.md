# Basics

```javascript
// create flags
const flags = {
  A: 1,
  B: 2,
  C: 4,
}


// create a mask
const mask = flags.A | flags.C; // 5 in binary (101);

// contains A
const inMask = mask & flags.A;

```

#Basic Filtering with masking:

```javascript
const flags = {
  benefits: {
    A: 1,
    B: 2,
    C: 4,
  },
  paymentTypes:{
    cardless: 1,
    prepaid: 2,
    postpaid: 4,
  }
}

const createMask = (pickedFlags, allFlags) => (
  pickedFlags.reduce((masking, benefit) => masking | allFlags[benefit], 0)
)

const activeFilters = {
  benefits: ['A', 'C'], // 5
  // paymentTypes: ['prepaid'],
};

const activeBenefitsMask = createMask(activeFilters.benefits, flags.benefits)
const activePaymentTypesMask = createMask(activeFilters.paymentTypes, flags.paymentTypes)

const candidates = [
  {paymentTypes: ['prepaid'], benefits: ['C', 'A']},
  {paymentTypes: ['cardless'], benefits: ['A', 'B']},
  {paymentTypes: ['prepaid'], benefits: ['C', 'B']},
  {paymentTypes: ['postpaid'], benefits: ['A', 'C']},
  {paymentTypes: ['postpaid'], benefits: ['B']},
  {paymentTypes: ['prepaid'], benefits: ['A', 'C']},
  {paymentTypes: ['cardless'], benefits: ['A']},
]

// > Conjunctive: (AND: all data in active filter should be in candidate)

const conjunctiveCandidates = candidates.filter((candidate) => {
  const candidateMask = createMask(candidate.benefits, flags.benefits);
  return candidateMask === activeBenefitsMask;
})

// > Disjunctive (OR: any of the data is active filters is also in candidate)

const disjunctiveCandidates = candidates.filter((candidate) => {
  const candidateMask = createMask(candidate.benefits, flags.benefits);
  return candidateMask & activeBenefitsMask;
})
```


