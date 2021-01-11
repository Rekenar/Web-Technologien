"use strict";
let express = require('express');
let cfg = require('./config.json') // config file
let cors = require('cors')
const BooksDatabase = require('./BooksDatabase');
let booksDB = null;

let app = express();

// bodyparser for sending different http request bodies
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));     // support encoded bodies
app.use(bodyParser.json());                             // support json encoded bodies
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *

// init server
function init() {
  return new Promise((resolve, reject) => {
    booksDB = new BooksDatabase(cfg.database.file);
    booksDB.loadBooks().then(resolve(), reject());
  });
}

// EX 5:
// Find book by partial matching of query strings:
// field = "isbn"/"title"/"authors"/"categories"
// query = [partial_match_string]
// e.g.: localhost:3000/books/?field=title&query=node
// INFO: uses next('route') to potentially skip to next routing function iff
//       no parameters were given (return all books in that case, i.e. call next route)
app.get("/books", (req, res, next) => {

  // query params as json
  let query = req.query;

  // have query string parameters been passed?
  if (Object.keys(query).length === 0) {
    // call next function in chain ( get all books)
    next('route');  // alternative: use next() and chain functions within this route
    return;         // need to stop function at this point
  }

  // query database (GET)
  booksDB.findBy(query).then(
    // resolve
    (results) => {
      if (results.length > 0) {
        // results have been found
        res.status(200).json(results);
      } else {
        // results empty
        res.status(401).json({
          "message": "No results"
        });
      }
      console.log(`FindBy search for '${JSON.stringify(query)}' -> ${results.length} results.`);
    },
    // reject
    () => {
      // wrong findby
      res.status(400).json({
        "message": "bad request"
      });
    });
});

// Ex 4: get all books (GET)
app.get("/books", (req, res) => {
  const isbn = req.params.isbn;
  booksDB.getBooks().then(
    // resolve
    (result) => {
      // result found
      if (result) res.status(200).json(result);
      // result not found
      else res.status(401).json({"message": "No results"});
    },
    // reject
    () => {
      // malformed request
      res.status(400).json({
        "message": "bad request"
      });
    });
});

// Ex 4: get single book by isbn (GET)
app.get("/books/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  booksDB.getBook(isbn).then(
    // resolve
    (result) => {
      // result found
      if (result) res.status(200).json(result);
      // result not found
      else res.status(401).json({"message": "No result"});
    },
    // reject
    () => {
      // malformed request
      res.status(400).json({
        "message": "bad request"
      });
    });
});

// EX 4: rent/return book (PUT/PATCH)
// we assume at least params parameter 'isbn' and body parameter 'rented' is given
app.patch("/books/:isbn", (req, res) => {
  const book = req.body;
  console.log(`patch for '${JSON.stringify(book)}'`);
  const isbn = req.params.isbn;
  const isRented = book.rented;
  // check if isbn is part of body or potentially add the passed one
  if (!book.isbn) book.isbn = isbn
  booksDB.updateBook(book).then(
    // resolve
    (result) => {
      // wrong rented flag
      if (result === -1) res.status(401).json({
        "message": "Book not " + ((isRented) ? 'rentable' : 'returnable')
      });
      else if (result === -2) res.status(401).json({
        "message": "ISBN not found"
      });
      // success
      else if (result) res.status(200).json(result);
      // result not found
      else res.status(401).json({
        "message": "Book not found"
      });
    },
    // reject
    () => {
      // malformed request
      res.status(400).json({
        "message": "bad request"
      });
    });
});

// EX 5: create book (POST)
app.post("/books", (req, res) => {
  const book = req.body;
  booksDB.createBook(book).then(
    // resolve
    (result) => {
        // success
        if (result) res.status(200).json(result);
        // result not found
        else res.status(401).json({
          "message": "Book already exists"
        });
    },
    // reject
    () => {
      // malformed request
      res.status(400).json({
        "message": "bad request"
      });
    });
});

// EX 5: delete book (DELETE)
app.delete("/books/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  booksDB.deleteBook(isbn).then(
    // resolve
    (result) => {
        // success
        if (result) res.status(200).json(result);
        // result not found
        else res.status(401).json({
          "message": "Book not found"
        });
    },
    // reject
    () => {
      // malformed request
      res.status(400).json({
        "message": "bad request"
      });
    });
});

// default route
app.use("/", (req, res) => {
  res.status(200).send("Welcome to DigiLib 1.0");
});

// init server then listen on port
init().then(() => {
  if (!booksDB.data) {
    console.log("Failed to load book data...");
    return;
  }
  app.listen(cfg.server.port, () => {
    console.log(`Listening on port ${cfg.server.port} ...`);
  });
});
