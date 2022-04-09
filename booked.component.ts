import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.css']
})
export class BookedComponent implements OnInit {

  constructor(public myRouter : Router) { }

  ngOnInit(): void {
  }

  doLogOut()
  {
    localStorage.clear();
    this.myRouter.navigateByUrl("/");
  }

}
