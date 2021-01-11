import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  
  bookForm = new FormGroup({
    title: new FormControl(''),
    isbn: new FormControl(''),
    rented: new FormControl(false)
  });
  onSubmit(){
    console.warn(this.bookForm.value)
  }
}
