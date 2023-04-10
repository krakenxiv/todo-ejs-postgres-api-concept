const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./queries');
const { response } = require('express');
const app = express();
const port = 3010;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/todos', db.getTodos);
app.get('/todos/:id', db.getTodoById);
app.post('/todos', db.createTodo);
app.put('/todos', db.updateTodo);
app.delete('/todos/:id', db.deleteTodo);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

// app.get('/todo/:id', cors(corsOptions), db.getTodoById);
