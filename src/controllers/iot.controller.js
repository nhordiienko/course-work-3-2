const fetch = require('node-fetch');

const IOT_URL = 'https://wework-iot.herokuapp.com/';

module.exports.get = async (req, res) => {
  const respose = await fetch(IOT_URL);
  const data = await respose.json();

  res.json({ data });
}