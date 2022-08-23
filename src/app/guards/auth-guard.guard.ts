import { AuthService } from './../services/auth.service';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private AngularFireAuth : AngularFireAuth,
              private route           : Router){}
  canActivate(): Observable<boolean>{
    return this.AngularFireAuth.authState.pipe(map((auth) => {
      if(!auth){
        this.route.navigate(['/login']);
        return false;
      }else {
        return true;
      }
    }))
  }
                
  


}

