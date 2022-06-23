#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';
import {
  TOKEN_DICTIONARY,
  ARGS_DICTIONARY,
  DEFAULT_CITY,
} from './helpers/constants.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('No token');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Token has been saved');
  } catch (error) {
    printError(error.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError('No city');
    return;
  }
  try {
    const test = await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('City has been saved');
  } catch (error) {
    printError(error.message);
  }
};

const getForcast = async () => {
  try {
    const weather = await getWeather();
    printWeather(weather, getIcon(weather.weather[0].icon));
  } catch (error) {
    if (error?.response?.status === 404) {
      printError('Wrong city');
      await saveKeyValue(TOKEN_DICTIONARY.city, DEFAULT_CITY);
      printSuccess(`Default city ${DEFAULT_CITY} was set`);
    } else if (error?.response?.status === 401) {
      printError('Wrong token');
    } else {
      printError(error.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args[ARGS_DICTIONARY.help]) {
    return printHelp();
  }
  if (args[ARGS_DICTIONARY.city]) {
    saveCity(args[ARGS_DICTIONARY.city]);
  }
  if (args[ARGS_DICTIONARY.token]) {
    return saveToken(args[ARGS_DICTIONARY.token]);
  }
  getForcast('Kyiv');
};

initCLI();
