const { response } = require('express');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'timz_mini',
  host: 'localhost',
  database: 'todo_app',
  password: '',
  port: 5432,
});

const getTodos = (req, res) => {
  pool.query('SELECT * FROM todos ORDER BY id DESC', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getTodoById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM todos WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const createTodo = (req, res) => {
  const { todo_name, todo_description, completed } = req.body;
  pool.query(
    'INSERT INTO todos ( todo_name, todo_description, completed) VALUES ($1, $2, $3) RETURNING *',
    [todo_name, todo_description, completed],
    (error, results) => {
      if (error) {
        throw error;
      }
      return res.status(201).json(results.rows[0]);
    }
  );
};

const updateTodo = (req, res) => {
  // const { id, todo_name, todo_description, completed } = req.body;
  if (req.body.id) {
    const values = [req.body.id, req.body.todo_name, req.body.todo_description, req.body.completed];

    console.log(values);
    pool.query(
      'UPDATE todos SET todo_name = $2, todo_description = $3, completed = $4 WHERE id = $1',
      values,
      (error, results) => {
        if (error) {
          throw error;
        }
        // send back whatever you want your app to consume
        return res.status(201).send({values});
      }
    );
  }
};

const deleteTodo = (req, res) => {
  const id = req.params.id;
  console.log(id);
   // pool.query(`DELETE FROM todos WHERE id = ${id}`, [ id ], (error, results) => {
   pool.query(`DELETE FROM todos WHERE id = ${id}`, (error, results) => {
    if (error) {
     throw error;
   }
   // send back whatever you want your app to consume
    return res.status(200).send(id);
   });
  };

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};
