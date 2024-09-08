import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})
export class RecetasPage implements OnInit {

  constructor(public mensaje:ToastController, public alerta:AlertController, private router:Router) { }

  ngOnInit() {
  }

  async MensajeCorrecto() {
    const toast = await this.mensaje.create({
      message: 'Inicio de Sesión Exitoso',
      duration: 2000
      
    });
    toast.present();
  } 

}
