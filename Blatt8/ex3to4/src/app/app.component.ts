import { Component } from '@angular/core';
import globalBookList from '../assets/book_library.json';
import {Book} from "./model/book";

// now globalBookList contains the data from the json file

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    bookList: Book[] = [];
    master = 'Master';
    constructor() {
      this.bookList = globalBookList;
    }
    
}
