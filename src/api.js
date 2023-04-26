require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');

const router = express.Router();
const db = require('./queries');
const cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const port = 3010;
module.exports.handler = serverless(app);

app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('combined'));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
const corsOptions = {
  origin: [process.env.TODO_UI_LOCAL_HOST, process.env.TODO_DATA_HOST],
  optionsSuccessStatus: 200, //  some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

router.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

router.get('/todos', db.getTodos);
router.get('/todos/:id', db.getTodoById);
router.post('/todos', db.createTodo);
router.put('/todos', db.updateTodo);
router.delete('/todos/:id', db.deleteTodo);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

app.use('/.netlify/functions/api', router);

// TODO! Clean up old code
// app.get('/', (req, res) => {
//   res.json({ info: 'Node.js, Express, and Postgres API' });
// });

// app.get('/todos', db.getTodos);
// app.get('/todos/:id', db.getTodoById);
// app.post('/todos', db.createTodo);
// app.put('/todos', db.updateTodo);
// app.delete('/todos/:id', db.deleteTodo);
