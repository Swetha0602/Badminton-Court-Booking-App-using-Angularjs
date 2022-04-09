import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  msg : string;

  usernameAvail = false;

  constructor(public userSer : UsersService) { }

  ngOnInit(): void {
  }

  addUser(frmVal: any)
  {
    this.userSer.doUserRegistration(frmVal.value).subscribe((data:string)=>{

      console.log(data);

      this.msg = data;
      
      frmVal.reset();

    }, (error:any)=>{

      console.log(error);

      this.msg = "Something Went Wrong!!";

    });
  }

  usernameCheck(username:string)
  {
    this.userSer.usernameCheckAvailability(username).subscribe((data:any[])=>{

      console.log(data);

      if(data.length==0)
      {
        this.msg = "Congrats Username Available for You!!";

        this.usernameAvail = true;
      }
      else {
        this.msg = "Username Already Taken!!";
        this.usernameAvail = false;
      }

    }, (error:any)=>{

      console.log(error);

      this.msg = "Something Went Wrong!!";
    })
  }

}
