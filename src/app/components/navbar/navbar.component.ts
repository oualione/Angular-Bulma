import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toast } from "bulma-toast";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //userEmail : string;
  isLoggedIn : Boolean = false;

  constructor(private AuthService : AuthService,
             private route : Router) { }

  ngOnInit() {
    this.AuthService.GetAuth().subscribe((auth) => {
      if(auth){
        //this.userEmail = auth.email
        return this.isLoggedIn = true;
        
      }else{
        return this.isLoggedIn = false;
        
      }
    })
  }

  LogOut(){
    this.AuthService.Logout();
    this.isLoggedIn = false;
    this.route.navigate(['/login']);
    toast({
      message: "Logged out Successfully",
      duration: 2000,
      type: "is-success",
      dismissible: true,
      position: "top-right",
      closeOnClick: true,
      opacity: 1,
    });
  }
}
