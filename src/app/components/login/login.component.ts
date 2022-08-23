import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toast } from "bulma-toast";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : string;
  password : string;

  constructor(private AuthService : AuthService,
              private route       : Router) { }

  ngOnInit() {
    return this.AuthService.GetAuth().subscribe((auth) => {
      if(auth){
         return this.route.navigate(['/']);
         
        
      }
    }) 

  }

  onLogin(){
    return this.AuthService.LoginWithEmailandPassword(this.email,this.password).
    then(auth =>{
      if(auth){
        this.route.navigate(['/']);
        toast({
          message: "Loged In Successfully",
          duration: 2000,
          type: "is-success",
          dismissible: true,
          position: "top-right",
          closeOnClick: true,
          opacity: 1,
        });
      }
    }).catch((error) => {
      toast({
        message: "Login Field" + error.message + " ",
        duration: 2000,
        type: "is-danger",
        dismissible: true,
        position: "top-right",
        closeOnClick: true,
        opacity: 1,
      });
    })
  }

  GoogleSignIn(){
    return this.AuthService.GoogleLogin().
    then(auth =>{
      if(auth){
        toast({
          message: "Logged in Successfully",
          duration: 2000,
          type: "is-success",
          dismissible: true,
          position: "top-right",
          closeOnClick: true,
          opacity: 1,
        });
        this.route.navigate(['/'])
      }
    }).catch((error) => {
      toast({
        message: "Oops " + error,
        duration: 2000,
        type: "is-danger",
        dismissible: true,
        position: "top-right",
        closeOnClick: true,
        opacity: 1,
      });
    })
  }


}
