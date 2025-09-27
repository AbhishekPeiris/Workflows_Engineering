/**
 * Filters an array of objects by a search term (case insensitive).
 * Matches any field containing the search text.
 */
function filterData(data, term) {
  if (!term) return data;

  const lower = term.toLowerCase();
  return data.filter((item) =>
    Object.values(item).some((val) => String(val).toLowerCase().includes(lower))
  );
}

module.exports = { filterData };
