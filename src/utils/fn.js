const { factorials, languageFactor } = require("./constant");

const getFactorValue = (factor) => {
  console.log(factor);
  const key = Object.keys(factor)[0];
  const item = factorials.find((el) => el.hasOwnProperty(key));
  return item[key][factor[key]];
};

const getLanguageFactorValue = (key) => {
  return languageFactor[key];
};

module.exports = { getFactorValue, getLanguageFactorValue };
