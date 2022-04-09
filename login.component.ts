import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg : string;

  constructor(public userSer : UsersService, public myRouter : Router ) { }

  ngOnInit(): void {
  }

  doLogin(frmVal: any)
  {
    console.log(frmVal.value);
    this.userSer.doUserLogin(frmVal.value).subscribe((data: any[])=>{

      console.log(data);
     // this.msg = data;
     if(data.length==0)
     {
       this.msg = "Invalid Login";
     }
     else 
     {
       localStorage.setItem("loggeduser", data[0]._id);
        this.myRouter.navigateByUrl("/court");
     }
      frmVal.reset();

    }, (error: any)=>{

      console.log(error);
      this.msg = "Something went wrong";

    });

  }
  
}
