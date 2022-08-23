import { AuthService } from './../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/model/Client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { toast } from "bulma-toast";
import { analytics } from 'firebase';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  total : number = 0;
  clients : Client [] = [];
  showSpinner : boolean = true;

  constructor(private ClientService : ClientService,
              private AuthService   : AuthService,
              private route         : Router,
              private FlashMsg      : FlashMessagesService) { }

  ngOnInit() {
   this.getAllClients();
    
    
  }

  getAllClients(){

    this.AuthService.GetAuth().subscribe((auth)=> {

       this.ClientService.getClients(auth.uid).subscribe((data) => {
      this.showSpinner = false;
      this.clients = data;
      this.totalBalance();
    })

    })
  
   
  }

  totalBalance() {
    this.total = this.clients.reduce((accum, client) => {
      return accum + +client.balance;
    }, 0)
  }

  deleteClient(id){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.ClientService.DeleteClient(id);
        //this.FlashMsg.show('Client Deleted Successfully ! ' , {cssClass : 'notification is-primary is-light' , timeout : 3000});
        Swal.fire(
          'Deleted!',
          'Your Client has been deleted.',
          'success'
        ),
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
    })
  }



}
