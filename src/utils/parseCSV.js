/** @param {string} value */
function typeParser(value) {
  if (!Number.isNaN(+value)) {
    return Number(value);
  }

  if (value === 'null') {
    return null;
  }

  return value;
}

/** @param {string} csv */
function parseCSV(csv) {
  const [columInput, ...dataInputs] = csv.trim().split('\n');
  const columKeys = columInput.trim().split(',');

  return dataInputs.map((dataInput, id) => {
    return dataInput.trim().split(',').reduce((data, row, i) => {
      return Object.assign(data, { [columKeys[i]]: typeParser(row) })
    }, { id });
  });
}

export default parseCSV;
