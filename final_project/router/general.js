const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// REGISTER (Task 7 - để sau)
public_users.post("/register", (req,res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).json({message: "Missing username or password"});
  }

  let userExists = users.find(user => user.username === username);

  if (userExists) {
    return res.status(400).json({message: "User already exists"});
  }

  users.push({username, password});
  return res.status(200).json({message: "User successfully registered"});
});


//  TASK 2
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});


// TASK 3
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn]);
});


//  TASK 4
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  let result = {};

  for (let key in books) {
    if (books[key].author === author) {
      result[key] = books[key];
    }
  }

  return res.status(200).json(result);
});


// TASK 5
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  let result = {};

  for (let key in books) {
    if (books[key].title === title) {
      result[key] = books[key];
    }
  }

  return res.status(200).json(result);
});


// TASK 6
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
