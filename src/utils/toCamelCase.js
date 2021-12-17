const toCamelCase = function(string) {
  if (!typeof string === 'string') {
    return string;
  }
  let split = string.split('_');
  if (split.length === 1) {
    return string;
  }
  let tail = split.slice(1);
  let camels = tail.map((s) => (s[0].toUpperCase() + s.slice(1)));
  return split[0] + camels.join('');
};

module.exports = toCamelCase;