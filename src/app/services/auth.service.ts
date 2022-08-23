import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private FireAuth : AngularFireAuth,) { }

              

  LoginWithEmailandPassword(email : string, password : string){
    return new Promise((resolve , reject) =>{
      this.FireAuth.signInWithEmailAndPassword(email,password).
      then((userData) => resolve(userData),
          (error) => reject(error))
     })

  }

  SignUp(email : string, password : string){
    return new Promise((resolve , reject) =>{
      this.FireAuth.createUserWithEmailAndPassword(email,password).
      then((userData) => resolve(userData),
          (error) => reject(error))
     })
   }

   GoogleLogin(){
    return new Promise((resolve , reject) => {
      this.FireAuth.signInWithPopup( new firebase.auth.GoogleAuthProvider()).
      then((userData) => resolve(userData),
      (error) => reject(error))
 })
  }
  
  Logout(){
    return this.FireAuth.signOut();
  }

  GetAuth(){
    return this.FireAuth.authState.pipe((auth) => auth);
  }




}




