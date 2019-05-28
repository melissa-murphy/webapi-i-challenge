// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/users', (req, res) => {
  //   res.redirect('/api/users');
  //   res.status(200).json(users);
  db.find()
    .then(users => {
      res.json({ users });
    })
    .catch(error => {
      sendUserError(500, `No such user exists, please try again.`, res);
      return;
    });
});

server.get('/api/users/:id', (req, res) => {
  // get user by id
  database
    .findById(req.params.id)
    .then(user => {
      if (user.length === 0) {
        sendUserError(404, "This user does not exist, please try again");
        return;
      }
      res.json(user);
    })
    .catch(error => {
      sendUserError(500, "Server error: could not find user", res);
      return;
    });

});

server.delete('/api/users/:id', (req, res) => {
  // delete user by id
});

server.put('/api/users/:id', (req, res) => {
  // updates user and returns modified doc/state
});
server.listen(8000, () => console.log('API Running on port 8000'));
