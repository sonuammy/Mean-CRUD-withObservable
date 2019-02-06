import { Component, OnInit } from '@angular/core';
import{UserService}  from '../../shared-service/user.service';
import{User}  from '../../user';
import{Router}  from '@angular/router';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {
  private users:User[];
  msg: string;
  mycolor: string;
  constructor(private _userService:UserService, private _router:Router) { }

  ngOnInit() {
      this._userService.getUsers().subscribe((users)=>{
        console.log(users);
        this.users=users;
      },(error)=>{
        console.log(error);
      })
  }
  deleteUser(user){
    this._userService.deleteUser(user._id).subscribe((data)=>{
        this.users.splice(this.users.indexOf(user),1);
        this.msg = "Succesfully deleted";
        this.mycolor = "green";
    },(error)=>{
      console.log(error);
      this.msg = "Not succesfully deleted";
      this.mycolor = "red";
    });
  }

   updateUser(user){  
     this._userService.setter(user);
     this._router.navigate(['/update']);


   }
   newUser(){
   let user = new User();
    this._userService.setter(user);
     this._router.navigate(['/update']);
   
   }

}
