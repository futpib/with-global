
const mapValues = require('lodash.mapvalues');
const forEach = require('lodash.foreach');

/**
 * Run callback with given global variables, then clean up global namespace
 *
 * @param {Object} variables name-value mapping of global variables to be set
 * @param {function} callback function that depends on presence of global variables
 * @returns {*} whatever `callback` returns
 */
function withGlobal (variables, callback) {
  const backups = mapValues(variables, (value, name) => window[name]);

  forEach(variables, (value, name) => {
    window[name] = value;
  });

  let returnValue;
  try {
    returnValue = callback();
  } finally {
    forEach(backups, (value, name) => {
      window[name] = value;
    });
  }

  return returnValue;
}

module.exports = withGlobal;
