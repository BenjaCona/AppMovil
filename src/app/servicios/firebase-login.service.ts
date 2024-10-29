import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(private afAtuh:AngularFireAuth, private router:Router) { }

  login(email:string,password:string){
    return this.afAtuh.signInWithEmailAndPassword(email,password);
  }
  logout(){
    return this.afAtuh.signOut().then(()=>{
      this.router.navigate(['/login'])
    })
  }
}
