const request = require('request');

const geoCode = (city, callback) => {
    const MapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=pk.eyJ1IjoiYW5pcnVkaDE3MTMiLCJhIjoiY2tkbzM4Y2xmMW9peDJyb2hwZDB5OHEzdiJ9.xfroHbnjR4ctnEmdJPJYQQ`;

    request({url: MapboxURL, json: true}, (error, response) => {
        if (error) {
            callback("unable to connnect to location servieces", undefined);
        }else if(response.body.features.length === 0) {
            callback("unable to find location, try another search", undefined);
        }else {
            callback(undefined, {
                latitude: response.body.features[0].center[1], 
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
};

module.exports = geoCode;