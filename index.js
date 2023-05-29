const express = require('express');

const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();

let topMovies = [
    {
        title: 'Once Upon A Time In Hollywood',
        director: 'Quentin Tarantino'
    },
    {
        title: 'Step Brothers',
        director: 'Adam Mckay'
    },
    {
        title: 'Woman King',
        director: 'Gina Prince-Bythewood'
    },
    {
        title: 'Inception',
        director: 'Christopher Nolan'
    },
    {
        title: 'Catch me if you can',
        director: 'Steven Spielberg'
    },
    {
        title: 'Get Out',
        director: 'Jordan Peele'
    },
    {
        title: 'No Country for Old Men',
        director: 'Ethan Coen'
    },
    {
        title: 'Parasite',
        director: 'Bong Joon Ho'
    },
    {
        title: 'The Wolf of Wall Street',
        director: 'Martin Scorsese'
    },
    {
        title: 'Air',
        director: 'Ben Affleck'
    },
];

//log users who visits the website.
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'log.txt'), {flags: 'a'}
);
app.use(morgan('combined', {stream: accessLogStream}));

//sends all files that are requested from within the public folder.
app.use(express.static('public'));

//setups message to user who goes to websites home page.
app.get('/', (req, res) => {
    res.send('Welcome to Best Movies of the 21st Century!');
});

//setups message to user who goes to the secreturl directory.
app.get('/secreturl', (req, res) => {
    res.send('This is a secret url with super top-secret content.');
});

//error code to detect errors in the above code.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname});
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});


app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});