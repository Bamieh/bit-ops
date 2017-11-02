'use strict'

const activateFilter = (activeFilterMask, filterFlag) => {
  return ~~activeFilterMask | filterFlag; // 1010 | 0001 => 1011
};

const toggleFilter = (activeFilterMask, filterFlag) => {
  return ~~activeFilterMask ^ filterFlag; // 1010 | 0001 => 1011
};

const deactivateFilter = (activeFilterMask, filterFlag) => {
  const mask = ~~activeFilterMask;
  return Math.min(mask ^ filterFlag, mask); // 0010 ^ 0011 => 0001
};

const createFilterFlags = (uniqueArray = []) => {
  return uniqueArray.reduce(
    (acc, cur, i) =>
      Object.assign({}, acc, {
        [cur]: 1 << i
      }),
    {}
  );
};

const createMask = (toMaskArray = [], flags) => {
  return toMaskArray.reduce(
    (mask, itemInMask) => activateFilter(mask, flags[itemInMask]),
    0
  );
};

const qualifyDisjunction = (bitmask, candidateMask) => {
  // Or
  return Boolean(bitmask & candidateMask);
};
const qualifyConjunction = (bitmask, candidateMask) => {
  // And
  return (bitmask & candidateMask) === bitmask;
};

// Checking a bit

// To check a bit, shift the number x to the right, then bitwise AND it:
// bit = (number >> x) & 1;
// That will put the value of bit x into the variable bit

const getActiveFlags = (bitmask, set) => {
  let i = 0;
  let remaining = bitmask;
  const matches = [];
  while (remaining) {
    const bit = 1 << i;
    if (remaining & bit) {
      remaining -= bit;
      matches.push(set[i]);
    }
    i++;
  }
  return matches;
};

// Wrappers
const createBranch = set => {
  const arrayFromSet = Array.from(set);
  return {
    set: arrayFromSet,
    flags: createFilterFlags(arrayFromSet)
  };
};

const qualifyMask = (branch, candidateMask) => {
  const activeQualifier = branch.disjunctive ? qualifyDisjunction : qualifyConjunction;
  return activeQualifier(branch.bitmask, candidateMask);
};
const getActiveFlagsFromBranch = branch => {
  return getActiveFlags(branch.bitmask, branch.set);
};

const buildFlagsObject = filters => {
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


export {
  activateFilter,
  toggleFilter,
  deactivateFilter,
  createFilterFlags,
  createMask,
  qualifyDisjunction,
  qualifyConjunction,
  getActiveFlags,
  createBranch,
  qualifyMask,
  getActiveFlagsFromBranch,
  buildFlags,
}