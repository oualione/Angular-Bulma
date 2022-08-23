import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {toast} from 'bulma-toast'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email : string;
  password : string;
  cpassword : string;

  constructor(private AuthService : AuthService,
              private route           : Router) { }

  ngOnInit() {
    return this.AuthService.GetAuth().subscribe((auth) => {
      if(auth){
         return this.route.navigate(['/']);
      }
    })
  }

  OnSingUp(){
    return this.AuthService.SignUp(this.email,this.password).
    then(register =>{
      if(register){
        toast({
          message: "Register Successfully",
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
        message: "Oops : " + error,
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
