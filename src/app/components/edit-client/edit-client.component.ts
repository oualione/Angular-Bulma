import { Observable } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/model/Client';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from "bulma-toast";


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id : string;
  client : Client = {
    id : null,
    firstName : "",
    lastName : "",
    address  : "",
    email : "",
    phone : null,
    balance : null
  }

  constructor(private ClientService : ClientService,
              private activeRoute   : ActivatedRoute,
              private route         : Router,
              private flashMsg      : FlashMessagesService) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id'];
    this.ClientService.getClientById(this.id).subscribe((data) => {
      this.client = data;
    })

  
  }
onSubmit(){
  this.client.id = this.id;
  this.ClientService.UpdateClient(this.client);
  //this.flashMsg.show('Client Updated Successfully !' , {cssClass : 'notification is-primary is-light' , timeout : 5000})
  this.route.navigate(['/'])
  toast({
    message: "Client Updated Successfully",
    duration: 2000,
    type: "is-success",
    dismissible: true,
    position: "top-right",
    closeOnClick: true,
    opacity: 1,
  });
  
}

}
