import { Client } from './../../../model/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { toast } from "bulma-toast";

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css']
})
export class DetailClientComponent implements OnInit {
  showBalance : boolean = false;
  id : string;
  client : Client = {
    firstName : null,
    lastName  : null,
    email     : null,
    phone     : null,
    address   : null,
    balance   : null

  }

  constructor(private ClientService : ClientService,
              private route         : Router,
              private ActiveRoute   : ActivatedRoute,
              private flashMsg      : FlashMessagesService) { }

  ngOnInit() {
    this.id = this.ActiveRoute.snapshot.params['id'];
    this.ClientService.getClientById(this.id).subscribe((data) => {
      this.client = data;
    })

  } 

  onSubmit(){
    this.client.id = this.id;
    this.ClientService.UpdateClient(this.client);
    //this.flashMsg.show('Balance Updated Successfully !' , {cssClass : 'notification is-primary is-light' , timeout : 5000})
    this.showBalance = !this.showBalance ;
    toast({
      message: "Balance Updated Successfully",
      duration: 2000,
      type: "is-success",
      dismissible: true,
      position: "top-right",
      closeOnClick: true,
      opacity: 1,
    });
  }

  deleteClient(id : string){

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
        //this.flashMsg.show('Client Deleted Successfully !' , {cssClass : 'notification is-primary is-light' , timeout : 5000})
        this.route.navigate(['/'])
        Swal.fire(
          'Deleted!',
          'Your Client has been deleted.',
          'success'
        ),
        toast({
          message: "Client Deleted Successfully",
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
