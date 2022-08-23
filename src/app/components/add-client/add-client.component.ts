import { AuthService } from './../../services/auth.service';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/model/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { toast } from "bulma-toast";


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client : Client = {
    firstName : "",
    lastName : "",
    address  : "",
    email : "",
    phone : null,
    balance : null,
    userId  : null
    

  }

  constructor(private ClientService : ClientService,
              private AuthService : AuthService,
              private router : Router,
              private flashMsg : FlashMessagesService,) { }

  ngOnInit() {
    this.AuthService.GetAuth().subscribe(auth => {
      this.client.userId = auth.uid;
    })
  }

  onSubmit(){
    this.ClientService.newClient(this.client);
    //this.flashMsg.show('CLIENT ADDED SUCCESSFULLY' , { cssClass : 'notification is-primary is-light' , timeout : 3000} );
    this.router.navigate(['/']);
    toast({
      message: "Client Added Successfully",
      duration: 2000,
      type: "is-success",
      dismissible: true,
      position: "top-right",
      closeOnClick: true,
      opacity: 1,
    });
  }

}
