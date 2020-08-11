const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geocode = require('./Utils/geocode');
const forecast = require('./Utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views/views')
const partialsPath = path.join(__dirname, '../views/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anirudh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Anirudh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Anirudh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Provide addess'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error: 'Some error occurred'
            })
        } else {
            forecast(data.latitude, data.longitude, (error, forecastData) => {
                if(error) {
                    return res.send({
                        error: "couldn't get weather data"
                    })      
                } else {
                    return res.send({...forecastData,...data})
                }
            });
        }
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'anirudh',
        msg: 'help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'anirudh',
        msg: '404 page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})