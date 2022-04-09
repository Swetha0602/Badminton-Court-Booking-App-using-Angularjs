import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public http : HttpClient) { }

  doUserRegistration(data: any)
  {
    return this.http.post<string>("http://localhost:3000/register", data);
  }

  doUserLogin(data : any)
  {
    return this.http.post<any[]>("http://localhost:3000/login", data);
  }

  isLoggedIn()
  {
    return !!localStorage.getItem("loggeduser");
  }
  getAllUsers()
  {
    return this.http.get<any[]>("http://localhost:3000/allusers");
  }

  usernameCheckAvailability(username:string)
  {
    return this.http.get<any[]>("http://localhost:3000/usernamecheck/"+username);
  }

  getSingleUserData(userid : string)
  {
    return this.http.get<any[]>("http://localhost:3000/getuser/"+userid);
  }
  editSingleUserData(data: any)
  {
    return this.http.put<string>("http://localhost:3000/updateuser", data);
  }
  deleteUserData(userid: number)
  {
    return this.http.delete<string>("http://localhost:3000/deleteuser/"+userid);
  }
  searchUsers(searchtxt:string)
  {
     return this.http.get<any[]>("http://localhost:3000/searchuser/"+searchtxt);
  }

}

