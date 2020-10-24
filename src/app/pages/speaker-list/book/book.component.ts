import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})

export class BookComponent implements OnInit {
@Input() maisondhoteselected:any;
  constructor() {


   }

  ngOnInit() {


    console.log(this.maisondhoteselected);
    
  }

}

