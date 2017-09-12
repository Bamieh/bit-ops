const createMask = (pickedFlags, allFlags) => {
  const toReduceFlags = typeof pickedFlags === 'object'? pickedFlags : [pickedFlags];
  return toReduceFlags.reduce((masking, flag) => masking | allFlags[flag], 0)
}

const maskMatch = (disjunctive, candidateFlags, flagsInActiveFilter, allFlagsInFilter) => {
  const activeFilterMask = createMask(flagsInActiveFilter, allFlagsInFilter);
  const candidateMask = createMask(candidateFlags, allFlagsInFilter);

  return disjunctive?
    candidateMask & activeFilterMask:
    candidateMask === activeFilterMask;
}

module.exports = function(candidates, selectedFilters, allFlags) {
  const filterCandidate = (candidate, filter, conjunctiveFilters) => {
    if(!filter) return false;
    const filterKeys = Object.keys(filter);
    return filterKeys.reduce((keepPrevious, filterKey) => {
      const activeFilter = filter[filterKey];
      const disjunctiveCategory = activeFilter.disjunctive;
      
      const flagsInActiveFilter = activeFilter.set;
      const allFlagsInFilter = allFlags[filterKey];
      const candidateFlags = candidate[filterKey];
      
      const candidateMaskMatch =
        maskMatch(disjunctiveCategory, candidateFlags, flagsInActiveFilter, allFlagsInFilter);

      return conjunctiveFilters?
        keepPrevious && candidateMaskMatch:
        keepPrevious || candidateMaskMatch;

    }, conjunctiveFilters);
  }

  return candidates.filter((candidate) => {
    const qualifiedConjunction = filterCandidate(candidate, selectedFilters.conjunctiveFilters, true);
    const qualifiedDisjunction = filterCandidate(candidate, selectedFilters.disjunctiveFilters);
    
    return qualifiedConjunction || qualifiedDisjunction;
  })
}
