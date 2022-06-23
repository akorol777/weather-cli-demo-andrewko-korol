import { TOKEN_DICTIONARY, ARGS_DICTIONARY } from './constants.js';

const getArgs = (args) => {
  const res = {};
  const [executer, file, ...rest] = args;
  rest.forEach((value, index, array) => {
    if (value.charAt(0) === '-') {
      if (index === array.length - 1) {
        res[value.substring(1)] = true;
      } else if (array[index + 1].charAt(0) !== '-') {
        res[value.substring(1)] = array[index + 1];
      } else {
        res[value.substring(1)] = true;
      }
    } else {
      if (index === 0 && array.length === 1) {
        res[ARGS_DICTIONARY.city] = value;
      }
    }
  });

  return res;
};

export { getArgs };
