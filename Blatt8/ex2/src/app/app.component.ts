import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'List of Books';
  books = [new Book( "Java", "Torsten Fink", true), new Book("C"), new Book("Python", "John Gwynnek",false)]
}

class Book{
    constructor( private _title:string, private _author?:string,  private _rented?:boolean){
    }
    
    get author() {
      return this._author;
    }
    get title() {
      return this._title;
    }
    get rented() {
      return this._rented;
    }
}
