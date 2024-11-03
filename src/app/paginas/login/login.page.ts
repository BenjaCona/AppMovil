import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  usuario : string=""
  password : string=""

  constructor(public mensaje:ToastController, public alerta:AlertController, private router:Router, private storage: Storage, private loginFirebase:FirebaseLoginService) {
    }

  async MensajeError() {
    const alert = await this.alerta.create({
      header: 'Error',
      message: 'No se ha podido iniciar sesión. Compruebe Usuario y Contraseña',
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }

  async MensajeCerrarSesion() {
    const toast = await this.mensaje.create({
      message: 'Cerrar Sesión Exitoso',
      duration: 2000
    });
  
  } 
  
  async MensajeCorrecto() {
  const toast = await this.mensaje.create({
    message: 'Inicio de Sesión Exitoso',
    duration: 2000
    
  });
  toast.present();
 } 
 


  
  ingresar (){
    if(this.usuario ==="" || this.password ===""){
      console.log("No se puede dejar el usuario y contraseñas vacios")
      this.MensajeError()
    }
    else{
      this.loginFirebase.login(this.usuario,this.password).then(()=>{
        console.log("Inicio de Sesión Exitoso")
        this.MensajeCorrecto()
        this.router.navigate(["/home"])
      }).catch(()=>{
        this.MensajeError();
      })
      
      
    }

    //guardando datos con persistencia/storage
    this.storage.set("usuario", "usuario");
    this.storage.set("password","password");
  }

  async ngOnInit() {

    await this.storage.create();
  }





}
