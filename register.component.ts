import { Component, OnInit } from '@angular/core';
import { UsersService } from "../users.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 msg : string | undefined ;

  constructor(public userSer : UsersService) { }

  ngOnInit(): void {
  }
  doRegister(frmVal:any)
  {
    console.log("User Registered");
    console.log(frmVal.value);
    this.userSer.doUserRegistration(frmVal.value).subscribe((data:string)=>{
      console.log(data);
      this.msg = data;
      frmVal.reset();
    }, (error:any)=>{

      console.log(error);
      this.msg = "Something Went Wrong";


    });
    
  
    
  }

}
