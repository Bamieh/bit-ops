const filters = {
  disjunctive: {
    benefits: ['wireless', 'breakfast'],
  },
  conjunctive: {

  }
}
const disjunctiveFilters = {
  paymentType: [''],
  stars: [],
}


const activeFilters = {
  disjunctive: {
    benefits: 0,
  }
  conjunctive: {

  }
}

const candidateMaskCache = new weakMap();
const allFlags = {};

const createMask = (pickedFlags, allFlags) => {
  const toReduceFlags = typeof pickedFlags === 'object'? pickedFlags : [pickedFlags];
  return toReduceFlags.reduce((masking, flag) => masking | allFlags[flag], 0)
}

const createCandidateMask = (candidate) => {
  return Object.keys(allFlags).reduce((candidateMask, filterKey) => {
    candidateMask[filterKey] = candidateFilterGetter(candidate, filterKey);
    return candidateMask;
  });
}

const getCandidateMask = (candidate, flags) => {
  if(candidateMaskCache.has(candidate)) {
    return candidateMaskCache.get(candidate);
  }
  const candidateMask = createMask(candidate, flags);
  candidateMaskCache.set(candidate, candidateMask);
  return candidateMask;
}

const filterCandidate = (candidateMask, activeFilter, disjunctiveCategory) => {
  getCandidateMask()
}


const buildFlagsObject(filters) {
  if(!filters) return {};

  const filterKeys = Object.keys(filters);
  return filterKeys.reduce((flagGroup, filterKey) => {
    const filter = filters[filterKey];

    flagGroup[filterKey] = filter.reduce((flag, item, index) => {
      flag[item] =  1  << index;
      return flag;
    }, {});

    return flagGroup;
  }, {})
}

const buildFlags = (filters={}) => {
  return {
    conjunctive: buildFlagsObject(filters.conjunctive || filters),
    disjunctive: buildFlagsObject(filters.disjunctive),
  }
}

const defaults = {
  candidateFilterGetter: (candidate, key) => candidate[key],
}

class bitOps {
  constructor({candidateFilterGetter, filters}) {
    this.candidateFilterGetter = this.candidateFilterGetter || defaults.candidateFilterGetter;
    this.allFilters = filters || {};
    this.allFlags = buildFlags(this.allFilters);
    this.candidateMaskCache = new weakMap();
  }
  filter(candidates, activeFilters) {

  }
}


module.exports = {

  activateBit(activeFilterMask, filterFlag) {
    return ~~activeFilterMask | filterFlag; // 1010 | 0001 => 1011
  },
  deactivateBit(activeFilterMask, filterFlag) {
    const mask = ~~activeFilterMask;
    return Math.min(mask ^ filterFlag, mask); // 0010 ^ 0011 => 0001
  },
  bitmaskFilter(allFlags, conjunctive, mask) {
    return Object.keys(flags).reduce((keepPrev, flagKey) => {
      const activeFilterMask = flags[flagKey];
      const candidateFilterMask = candidateMasks[flagKey];
      const candidateMaskMatch = activeFilterMask === candidateFilterMask;
      return candidateMaskMatch && keepPrev;
    }, true);
  }
  bitmaskFilter(candidateMask, activeFilters, allFlags) {
    candidateMask = {
      benefits: 3,
      paymentType: 1,
      occupancy: 4,
    }

    const conjunctiveFilters = activeFilters.conjunctive;
    const disjunctiveFilters = activeFilters.disjunctive;

    const qualifiedConjunction = Object.keys(conjunctiveFilters).reduce((keepPrev, maskKey) => {
      const activeFilterMask = conjunctiveFilters[maskKey];
      const candidateFilterMask = candidateMasks[maskKey];
      const candidateMaskMatch = activeFilterMask === candidateFilterMask;
      return candidateMaskMatch && keepPrev;

    }, true);

    const qualifiedDisjunction = Object.keys(disjunctiveFilters).reduce((maskKey) => {
      candidateMasks[maskKey] & disjunctiveFilters[maskKey]
    }, true);
    return qualifiedConjunction || qualifiedDisjunction
    
  }
  bitmaskFilter(candidate, activeFilters, flags) {

    const conjunctiveFilters = activeFilters.conjunctive;
    const disjunctiveFilters = activeFilters.disjunctive;

    return candidates.filter((candidate) => {
      filterCandidate(candidate, conjunctiveFilters, true)

      const activeFilterKeys = Object.keys(activeFilters);
      activeFilterKeys.reduce((activeFilterKey) => {
        const activeFilter = activeFilters[activeFilterKey];

      }, true)

    })
  },
};
