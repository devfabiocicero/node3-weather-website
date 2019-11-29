
const request = require('request');

const getGeoCode = (address, cb) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGV2ZmFiaW9jaWNlcm8iLCJhIjoiY2syNjk2ZzcyMno1ejNtcGl3eDI5cTh3aCJ9.CLnFCLJtty2onRSG_Ib4aQ&limit=1`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            cb('Unable to connect with Map Box service');
        } else if (!body.features.length) {
            cb ('Unable to find location. Try another search.');
        } else {
            const { features } = body;
            const location = features[0];
            
            cb(undefined, {
                latitude: location.center[1],
                longitude: location.center[0],
                location: location.place_name
            });
        }
    });
};

module.exports = getGeoCode;