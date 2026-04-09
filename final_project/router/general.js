const axios = require('axios');
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
public_users.get('/', async function (req, res) {
  return new Promise((resolve, reject) => {
    resolve(books);
  }).then((data) => {
    res.status(200).json(data);
  }).catch(() => {
    res.status(500).json({message: "Error"});
  });
});


// TASK 3
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;

  return new Promise((resolve, reject) => {
    resolve(books[isbn]);
  }).then((data) => {
    res.status(200).json(data);
  }).catch(() => {
    res.status(500).json({message: "Error"});
  });
});

//  TASK 4
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;

  return new Promise((resolve, reject) => {
    const result = Object.values(books).filter(book => book.author === author);
    resolve(result);
  }).then((data) => {
    res.status(200).json(data);
  }).catch(() => {
    res.status(500).json({message: "Error"});
  });
});

// TASK 5
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;

  return new Promise((resolve, reject) => {
    const result = Object.values(books).filter(book => book.title === title);
    resolve(result);
  }).then((data) => {
    res.status(200).json(data);
  }).catch(() => {
    res.status(500).json({message: "Error"});
  });
});
// TASK 6
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;

//task 8
