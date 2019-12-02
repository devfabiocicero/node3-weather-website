
const request = require('request');

const getForecast = (latitude, longitude, cb) => {
    const url = `https://api.darksky.net/forecast/e9022ec82de20b3415a99e7762adbee5/${latitude},${longitude}?units=si`;

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            cb('Unable to connect with Weather service.');
        } else if (body.error) {
            cb('Unable to find location.');
        } else {
            cb(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' celcius degress out. The max tempeture was ' + body.daily.data[0].temperatureHigh + ', with min of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.');
        }
    });
};

module.exports = getForecast;