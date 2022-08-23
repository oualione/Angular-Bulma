import { Client } from './../../model/Client';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientCollection : AngularFirestoreCollection<Client>
  clientDoc        : AngularFirestoreDocument<Client>

  constructor(private afs : AngularFirestore) {
    this.clientCollection = this.afs.collection('clients')
   }

   //Get all Clients from FireStore to the Client Component to send it to The Dashboard Page
   getClients(userId : string) : Observable<Client[]>{
    return this.afs.collection('clients', ref => ref.where('userId','==', userId)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }

   //Add New Client to FireStore via Add-Client Component
   newClient(client){
     return this.clientCollection.add(client);
   }

   //Get a Client from FireStore to Detail Client Component
   getClientById(id : string) : Observable<Client>{
     return this.clientCollection.doc(id).valueChanges();
   }

   //Delete Client from Firestore
   DeleteClient(id : string){
     this.clientDoc = this.clientCollection.doc(id);
     this.clientDoc.delete();
   }

   //Update Client from in Firebase
   UpdateClient(client : Client){
    this.clientDoc = this.clientCollection.doc(client.id);
    this.clientDoc.update(client);
   }
}
