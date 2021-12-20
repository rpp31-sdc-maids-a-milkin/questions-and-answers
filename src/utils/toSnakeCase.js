const toSnakeCase = function(string) {
  return string.replaceAll(/[A-Z]/g, (p1) => ('_' + p1)).toLowerCase();
};

module.exports = toSnakeCase;