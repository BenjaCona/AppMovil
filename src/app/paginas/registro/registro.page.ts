import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { HomePage } from 'src/app/home/home.page';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nombre : string="";
  
  usuario ={
    correo: '',
    password : ''

  };
  

  constructor(public navCtrl: NavController) { }

  datos(){
    this.navCtrl.navigateForward('/home', {
      state: {
        nombre: this.nombre // Pasamos el valor de 'nombre'
      }
    })}

  ngOnInit() {
  }

  onSubmitTemplate() {
    console.log("correo god");
    this.datos();
  }
}

