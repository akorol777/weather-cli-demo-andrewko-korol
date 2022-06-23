import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
  console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan(' HELP ')}
		No parameters - weather output
		-s [CITY] to set the city
		-h to withdraw help
		-t [API_KEY] to save the token
		`
  );
};

const printSlavaUkraine = () =>
  console.log(`🇺🇦 🇺🇦 🇺🇦  ${chalk.bgBlue.yellow('Слава Україні!')} 🇺🇦 🇺🇦 🇺🇦`);

const prettyTemperature = (temperature) => `${Math.round(temperature)}°С`;

const printWeather = (res, icon) => {
  console.log(
    dedent`${chalk.bgCyanBright.black(' WEATHER ')} Weather in ${res.name}:
    ${icon}  ${res.weather[0].description}
    Temperature: ${prettyTemperature(
      res.main.temp
    )} (fills like ${prettyTemperature(res.main.feels_like)})
    Humidity: ${res.main.humidity}%
    Wind speed: ${res.wind.speed} m/s
    `
  );
};

export { printError, printSuccess, printHelp, printWeather, printSlavaUkraine };
