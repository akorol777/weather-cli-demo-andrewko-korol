import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';
import { printError, printSlavaUkraine } from './log.service.js';

const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case '01':
      return 'âī¸';
    case '02':
      return 'đ¤ī¸';
    case '03':
      return 'âī¸';
    case '04':
      return 'âī¸';
    case '09':
      return 'đ§ī¸';
    case '10':
      return 'đĻī¸';
    case '11':
      return 'đŠī¸';
    case '13':
      return 'âī¸';
    case '50':
      return 'đĢī¸';
  }
};

const getWeather = async () => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  const city = await getKeyValue(TOKEN_DICTIONARY.city);
  if (!token) {
    throw new Error('No API key, set it up with the command -t [API_KEY]');
  }
  const { data } = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        q: city,
        appid: token,
        units: 'metric',
      },
    }
  );
  if (data.sys.country === 'RU') {
    printSlavaUkraine();
    throw new Error('Try to enter a better city');
  } else {
    return data;
  }
};

export { getWeather, getIcon };
