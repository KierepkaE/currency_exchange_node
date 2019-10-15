// `http://api.nbp.pl/api/exchangerates/rates/a/${code}/`
const request = require('request');
const fs = require('fs');
const validCodes = ['usd', 'eur', 'gbp', 'chf'];
const code = process.argv[2];
const isValid = validCodes.find(currency => currency === code) ? true : false;
if (!isValid) process.exit();
const url = `http://api.nbp.pl/api/exchangerates/rates/a/${code}/?format=json`
request(url, { json: true }, (err, res, body) => {
  if (err) console.log("Error:", err);
  if (res.statusCode !== 200) console.log("Error:", err);
  const { currency, rates } = body;
  const message = `Average value of ${currency} at ${rates[0].effectiveDate} is ${rates[0].mid} PLN `;
  fs.appendFile('currencies.txt', message + '\n', (err) => {
    if (err) {
      console.log(err);
      process.exit();
    }
    console.log('Result saved to currencies.txt!')
  });
  console.log(message);

})