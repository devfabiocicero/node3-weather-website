const path = require('path'); 
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geocode');
const getForecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Setup Template Engine
const viewsFolder = path.join(__dirname, '/templates/views');
const partialsPath = path.join(__dirname, '/templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsFolder);

hbs.registerPartials(partialsPath);

// Setup Static Files
const publicFolder = path.join(__dirname, '../public');
app.use(express.static(publicFolder));

// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application', 
        author: 'Fábio Cícero',
        pageTitle: 'Home'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Fábio Cícero',
        pageTitle: 'About'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'Fábio Cícero',
        pageTitle: 'Help'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help article not found',
        author: 'Fábio Cícero',
        pageTitle: 'Help'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    }

    geoCode(req.query.address, (err, { latitude, longitude, location } = {}) => {
        if (err) {
            return res.send({
                error: err
            });
        }

        getForecast(latitude, longitude, (err, forecast) => {
            if (err) {
                return res.send({
                    error: err
                });
            }

            res.send({
                forecast,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found.',
        author: 'Fábio Cícero',
        pageTitle: '404'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ', port);
});