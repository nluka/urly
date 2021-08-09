const database = require('../database');

const shortRegex = /^[a-zA-Z0-9]{1,8}$/;

async function pushShortErrors(
  short,
  errors,
  options = { existenceComparer: true }
) {
  if (typeof options.existenceComparer !== 'boolean') {
    throw new TypeError('options.existenceComparer must be a boolean');
  }

  if (typeof short !== 'string') {
    errors.push('short must be a string');
    return;
  }

  short = short.trim();

  if (!short.match(shortRegex)) {
    errors.push(`short must match ${shortRegex}`);
  } else if (
    (await database.urlDoesShortExist(short)) === options.existenceComparer
  ) {
    errors.push(
      options.existenceComparer ? 'short already exists' : 'short not found'
    );
  }
}

module.exports.pushShortErrors = pushShortErrors;
module.exports.shortRegex = shortRegex;
