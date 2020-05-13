const fetch = require('node-fetch');

const IOT_URL = 'https://wework-iot.herokuapp.com/';

module.exports.get = async (req, res) => {
  const respose = await fetch(IOT_URL);
  const data = await respose.json();

  const { temperatureBuild } = data;
  const tBuild = temperatureBuild.reduce((acc, cur) => acc + cur, 0) / temperatureBuild.length;
  const { temperatureBody } = data;
  const tBody = temperatureBody.reduce((acc, cur) => acc + cur, 0) / temperatureBody.length;
  const { timeOfActivity } = data;
  const time = [Math.min(...timeOfActivity), Math.max(...timeOfActivity)];
  const { pressure } = data;
  const p = pressure
    .reduce(([A, B], [a, b]) => [A + a, B + b], [0, 0])
    .map((val) => val / pressure.length);

  res.json({
    temperatureBuild: tBuild,
    temperatureBody: tBody,
    timeOfActivity: time,
    pressure: p,
  });
}