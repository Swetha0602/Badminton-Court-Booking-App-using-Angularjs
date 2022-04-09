import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  msg: string;

  userdata : {_id:number, uname:string, uemail:string, upassword:string, uphone:string};

  constructor(public activeRoute : ActivatedRoute , public userSer : UsersService) { }

  ngOnInit(): void {

    this.activeRoute.params.subscribe((param:Params)=>{

      console.log(param.userid);

      if(param.userid)
      {
        this.userSer.getSingleUserData(param.userid).subscribe((data:any[])=>{
          console.log(data);
          this.userdata = data[0];
        },(error:any)=>{
          console.log(error);
          

        });
      }

    });

  }

  editUser(form: NgForm)
  {
    form.value._id = this.userdata._id;
    console.log(form.value);
    this.userSer.editSingleUserData(form.value).subscribe ((data:string)=>{
      this.msg = data;


    },(error:any)=>{
      this.msg="Something went wrong";
    })
  }

}
