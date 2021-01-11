"use strict";
const cfg = require('./config');
let fs = require('fs'); // for reading files
let readline = require('readline'); // required for line-by-line read in async file read

// class for managing the volatile server DB
class BooksDatabase {
  constructor(url) {
    this.url = url;
    this.data = null;
  }

  // loads books from file
  // (synchronous since it is only called once and not tied to any route handler)
  loadBooks() {
    return new Promise((resolve, reject) => {
      // read file entirely (blocking)
      let content = fs.readFileSync(this.url, 'utf8');
      this.data = JSON.parse(content);
      resolve(this.data);
    });
  }

  // EX 5:
  // find book by cfg.database.findby_vals
  findBy(query) {
    return new Promise((resolve, reject) => {

      // filtered search database (db reduces with every sub-query)
      let filteredDB = this.data;

      // iterate over query
      Object.keys(query).forEach(key => {

        // proceed if key is allowed
        if (cfg.database.findby_vals.includes(key.toLowerCase())) {

          let matchingEntries = [];
          let searchString = query[key].toLowerCase();

          // iterate over all books
          for (let book of filteredDB) {
            let fieldVal = book[key];
            // check if field is array (e.g. for authors or categories)
            if (Array.isArray(fieldVal)) {
              for (let v of fieldVal) {
                // is search string partially matching any value in field array?
                if (v.toLowerCase().indexOf(searchString) > -1) {
                  matchingEntries.push(book);
                  break;
                }
              }
            } else {
              // is search string partially matching the field value?
              if (fieldVal.toLowerCase().indexOf(searchString) > -1) matchingEntries.push(book);
            }
          }
          // set filtered db to all retrieved entries (for next iteration continue with this reduced db)
          filteredDB = matchingEntries;
        }
      });

      // resolve with whatever number of entries found for all queries
      resolve(filteredDB);

    });
  }

  // EX 4: retrives book by isbn
  getBook(isbn) {
    return new Promise((resolve, reject) => {
      let resolveObject = null;
      for (let book of this.data) {
        // found book
        if (book['isbn'] === isbn) {
          resolveObject = book;
          break;
        }
      }
      resolve(resolveObject);
    });
  }

  // EX 4: retrives all books
  getBooks() {
      return new Promise((resolve, reject) => {
          resolve(this.data);
      });
  }

  // EX 4
  // rent/return a book
  // @return -1 book not rentable/returnable, -2 isbn not found
  updateBook(book) {
    return new Promise((resolve, reject) => {
      if (book.rented === undefined) {reject(null);return;}
      let resolveObject = -2; // book not found
      for (let b of this.data) {
        // book found
        if (b['isbn'] === book.isbn) {
          // only rent/return book iff status has changed, i.e. book is rentable
          if (b.rented !== book.rented) {
            b.rented = book.rented;
            resolveObject = b;
          }
          else resolveObject = -1;
          break;
        }
      }
      resolve(resolveObject);
    });
  }

  // EX 5: create book
  // -1 book exists
  createBook(book) {
      return new Promise((resolve, reject) => {
          if (!book) {reject(null);return;}
          // check if isbn exists
          let entry = this.data.filter(val => val.isbn === book.isbn);
          let resolveObject = null;
          // book does not exist (can add)
          if (entry.length === 0) {
            this.data.push(book);
            resolveObject = book;
          }
          resolve(resolveObject);
      });
  }

  // EX 5: delete book
  deleteBook(isbn) {
      return new Promise((resolve, reject) => {
          if (isbn === undefined) {reject(null);return;}
          let resolveObject = null;
          // check if isbn exists
          let deleteEntry = this.data.filter(val => val.isbn === isbn);
          // book exists (can delete)
          if (deleteEntry.length === 1) {
              // crete new list without entry
              let newData = this.data.filter(val => val.isbn !== isbn);
              this.data = newData;
              resolveObject = deleteEntry[0];
          }
          resolve(resolveObject);
      });
  }

} // class

module.exports = BooksDatabase;
