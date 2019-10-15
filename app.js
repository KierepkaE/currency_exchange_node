// `http://api.nbp.pl/api/exchangerates/rates/a/${code}/`
const request = require('request');
const validCodes = ['usd', 'eur', 'gbp', 'chf'];
const code = process.argv[2];
const isValid = validCodes.find(currency => currency === code) ? true : false;
if (!isValid) process.exit();
const url = `http://api.nbp.pl/api/exchangerates/rates/a/${code}/?format=json`
request(url, { json: true }, (err, res, body) => {
  console.log(body)
})