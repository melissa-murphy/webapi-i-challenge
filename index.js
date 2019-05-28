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

// GET, USER BY ID
server.get('/api/users/:id', (req, res) => {
  // get user by id
  database
    .findById(req.params.id)
    .then(user => {
      if (user.length === 0) {
        sendUserError(404, 'This user does not exist, please try again.');
        return;
      }
      res.json(user);
    })
    .catch(error => {
      sendUserError(500, 'Server error: could not find user.', res);
      return;
    });
});

// DELETE, USER BY ID
server.delete('/api/users/:id', (req, res) => {
  // delete user by id
  const id = req.params;
  database
    .remove(id)
    .then(res => {
      if (res) {
        res.status(200).json({ success: `User#${id} sucessfully removed.` });
      } else {
        res.status(404, `User#${id} does not exist. Please try again.`, res);
        return;
      }
    })
    .catch(error => {
      console.log(`-------------------Within catch, delete user(id)` + error);
      sendUserError(
        500,
        `User#${id} does not exist and cannot be deleted. Please try again.`,
        res
      );
    });
});

// PUT, MODIFY USER BY ID
server.put('/api/users/:id', (req, res) => {
  // updates user and returns modified doc/state
  const { id } = req.params;
  const { name, bio } = req.body;
  if (!name || !body) {
    sendUserError(400).json({
      ErrorMessage: `Please provide the required name and bio`
    });
    return;
  }
  db.update(id, { name, bio }).then(response => {
    if (response === 0) {
      res.status(404).json({
        ErrorMessage: `This user does not exist, please try again.`
      });
      return;
    }
    db.findById(id)
      .then(user => {
        if (user.length === 0) {
          res
            .status(404)
            .json({ ErrorMessage: `User not found, please try again.` });
          return;
        }
        res.status(201).json(user);
      })
      .catch(error => {
        res
          .status(500)
          .json({ ErrorMessage: `Server Error: Cannot find user.` });
        return;
      })
      .catch(error => {
        res.status(500).json({ ErrorMessage: `Internal Server Error` });
      });
  });
});

// POST, NEW USER
server.post('/api/users', (req, res) => {
  console.log(`----------------------------------requested body` + req.body);
  const { name, bio, created_on, updated_on } = req.body;
  if (!name || !bio) {
    res.status(400).json({ ErrorMessage: `Name and Bio required.` });
    return;
  }
  db.insert({
    name,
    bio,
    created_on,
    updated_on
  })
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ ErrorMessage: `Bad request, please try again.` });
      return;
    });
});

server.listen(8000, () => console.log('API Running on port 8000'));
