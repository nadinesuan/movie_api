const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());

let users = [
    {
        id: 1,
        name: 'William',
        favoriteMovie: []
    },
    {
        id: 2,
        name: 'Tracy',
        favoriteMovie: []
    },
    {
        id: 3,
        name: 'Brian',
        favoriteMovie: []
    },
];

let movies = [
    {
        title: 'Once Upon A Time In Hollywood',
        genre: {
            name: 'Comedy',
            description: 'Comedy film is a category of film which emphasizes humor and are designed to make the audience laugh through the amusement.'
        },
        description: 'A faded television actor and his stunt double strive to achieve fame and success in the final years of Hollywoods Golden Age in 1969 Los Angeles.',
        directors: {
            name: 'Quentin Tarantino',
            bio: 'An American film director, writer, producer whose films are characterized by stylized violence.',
            birthyear: '1963',
            deathyear: ''
        }
    },

    {
        title: 'Step Brothers',
        genre: {
            name: 'Comedy',
            description: 'Comedy film is a category of film which emphasizes humor and are designed to make the audience laugh through the amusement.'
        },
        description: 'Two aimless middle-aged losers still living at home are forced against their will to become roommates when their parents marry.',
        directors: {
            name: 'Adam Mckay',
            bio: 'An American film director, producer, screenwriter, and comedian. McKay began his career as a head writer for the NBC sketch comedy show Saturday Night Live from 1995 to 2001.',
            birthyear: '1986',
            deathyear: ''
        } 
    },

    {
        title: 'Woman King',
        genre: {
            name: 'Action',
            description: 'A film in which the protagonist is thrust into a series of events that typically involve violence and physical feats.'
        },
        description: 'Inspired by true events that took place in The Kingdom of Dahomey, one of the most powerful states of Africa in the 18th and 19th centuries.',
        directors: {
            name: 'Gina Prince-Bythewood',
            bio: 'An American director and screenwriter who began her career as a writer for multiple television shows in the 1900s.',
            birthyear: '1969',
            deathyear: ''
        } 
    },

    {
        title: 'Inception',
        genre: {
            name: 'Sci-fi',
            description: 'Sci-fi is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science.'
        },
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO, but his tragic past may doom the project and his team to disaster.',
        directors: {
            name: 'Christopher Nolan',
            bio: 'A British-American filmmaker known for his Hollywood blockbusters with complex storytelling and is considered a leading filmmaker of the 21st century.',
            birthyear: '1970',
            deathyear: ''
        } 
    },

    {
        title: 'Catch me if you can',
        genre: {
            name: 'Crime',
            description: 'A film genre inspired by and analogous to the crime fiction literary genre.'
        },
        description: 'Barely 21 yet, Frank is a skilled forger who has passed as a doctor, lawyer and pilot. FBI agent Carl becomes obsessed with tracking down the con man, who only revels in the pursuit.',
        directors: {
            name: 'Steven Spielberg',
            bio: 'An American filmmaker and a major figure of the New Hollywood era and is the most commercially successful director in history.',
            birthyear: '1964',
            deathyear: ''
        } 
    },

    {
        title: 'Get Out',
        genre: {
            name: 'Thriller',
            description: 'A genre of fiction with numerous, often overlapping, subgenres, including crime, horror and detective fiction.'
        },
        description: 'A young African-American visits his White girlfriends parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.',
        directors: {
            name: 'Jordan Peele',
            bio: 'An American actor, comedian, and filmmaker. He is best known for his film and television work in the comedy and horror genres.',
            birthyear: '1979',
            deathyear: ''
        } 
    },

    {
        title: 'No Country for Old Men',
        genre: {
            name: 'Crime',
            description: 'A film genre inspired by and analogous to the crime fiction literary genre.'
        },
        description: 'Violence and mayhem ensue after a hunter stumbles upon a drug gone wrong and more than two million dollars in cash near the Rio Grande.',
        directors: {
            name: 'Ethan Coen',
            bio: 'An Academy Award and Golden Globe winning American writer, producer and director coming from small independent fils to big profile Hollywood films.',
            birthyear: '1957',
            deathyear: ''
        }
    },

    {
        title: 'Parasite',
        genre: {
            name: 'Thriller',
            description: 'A genre of fiction with numerous, often overlapping, subgenres, including crime, horror and detective fiction.'
        },
        description: 'Greed and class discrimination threaten the newly formed symbolic relationship between the wealthy Park family and the destitute Kim clan.',
        directors: {
            name: 'Bong Joon Ho',
            bio: 'A South Korean film director, producer, and screenwriter who began his career in 1994 after creating the short film White Man, Memories in My Frame, and Incoherence.',
            birthyear: '1969',
            deathyear: ''
        }
    },

    {
        title: 'The Wolf of Wall Street',
        genre: {
            name: 'Crime',
            description: 'A film genre inspired by and analogous to the crime fiction literary genre.'
        },
        description: 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
        directors: {
            name: 'Martin Scorsese',
            bio: 'An American film director, producer, screenweriter, and actor who emerged as one of themajor figures of the New Hollywood era.',
            birthyear: '1942',
            deathyear: ''
        }
    },

    {
        title: 'Air',
        genre: {
            name: 'Drama',
            description: 'A category or genre of narrative fiction or semi-fiction intended to be more serious than humorous in tone.'
        },
        description: 'Follows the history of shoe salesman Sonny Vaccaro, and how he led Nike in its pursuit of the greatest athlete in the history of basketball, Michael Jordan.',
        directors: {
            name: 'Ben Affleck',
            bio: 'An American actor and filmmaker who began his career as a child when he starred in the PBS educational series The Voyage of the Mimi. His accolades include two Academy Awards.',
            birthyear: '1972',
            deathyear: ''
        }
    },
];

let logger = (req, res, next) => {
    console.log(req.url);
    next();
};

app.use(logger);

app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});


//CREATE USER
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('Name field required.');
    }
});

//UPDATE USER
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('No such User.')
    }
});

//CREATE MOVIE
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovie.push(movieTitle);
        res.status(200).send('${movieTitle} has been added to users favorites');
    } else {
        res.status(404).send('User not found.')
    }
});

//DELETE MOVIE
app.delete('/users/:id/:movieTitle', (req, res)  => {
    const { id, movieTitle } = req.params;

    let user = user.sfind(user => user.id == id);

    if (user) {
        user.favoriteMovie = user.favoriteMovie.filter(title => title!==movieTitle)
        res.status(200).send('${movieTitle} has been removed from users favorites');
    } else {
        res.status(404).send('User not found.')
    }
});

//DELETE USER
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        users = users.filter(user => user.id != id);
        res.status(200).send('User ${id} has been deleted');
    } else {
        res.status(404).send('User not found.')
    }
});

//READ 
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

//READ
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('Could not find that movie.');
    }
});

//READ MOVIE GENRES
app.get('/movies/genres/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find(movie => movie.genre.name === genreName).genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(404).send('Could not find that genre.');
    }
});

//READ DIRECTORS
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find(movie => movie.directors.name === directorName).directors;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(404).send('Could not find that director.');
    }
});


app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});

