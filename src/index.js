// import dependencies 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
//define the express app for use
const app = express();

// basic database for now
const questions = [];

//security for header functionality 
app.use(helmet());

// body parser to parse application JSON content-type
app.use(bodyParser.json())

// enable all CORS requests
app.use(cors());

//log http requests
app.use(morgan('combined'));

//DOT ENV IMPORTS
const CLIENT_ID = process.env.CLIENT_ID;


//root
app.get('/', (req, res) => {
  const qs = questions.map(q => ({
    id: q.id,
    title: q.title,
    description: q.description,
    answers: q.answers.length,
  }));
  res.send(qs);
});

//get a specific question
app.get('/:id', (req, res) => {
  const question = questions.filter(q => (q.id === parseInt(req.params.id)));
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send();
  res.send(question[0]);
});

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://edwhe.auth0.com/.well-known/jwks.json`
  }),

  //validate the audience and the issuer.
  audience: `${process.env.AUTH_CLIENT}`,
  issuer: `https://edwhe.auth0.com/`,
  algorithms: ['RS256']
});



app.post('/', checkJwt, (req, res) => {
  const { title, description } = req.body;
  const newQuestion = {
    id: questions.length + 1,
    title,
    description,
    answers: [],
    author: req.user.name,
  };
  questions.push(newQuestion);
  res.status(200).send();
});

//insert a new answer to a question
app.post('/answer/:id', checkJwt, (req, res) => {
  const { answer } = req.body;

  const question = questions.filter(q => (q.id === parseInt(req.params.id)));
  if (question.length > 1) return res.status(500).send();
  if (questions.length === 0) return res.status(404).send();

  question[0].answers.push({
    answer,
    author: req.user.name,
  });

  res.status(200).send();
})

app.listen(5000, () => {
  console.log('listening on port 5000')
})