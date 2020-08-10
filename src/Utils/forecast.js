const request = require('request');

const forecast = (lat, lon, callback) => {
    const api = '97fc3552d0eaead441789ea0bd867726'; 
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`;

    request({
        url: weatherURL,
        json: true
    }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (response.error) {
            callback("Unable to find location", undefined);
        } else {
            callback(undefined, {
                temp: response.body.main.temp,
                temp_min: response.body.main.temp_min,
                temp_max: response.body.main.temp_max
            });
        }
    });
};

module.exports = forecast;