// app.component.ts o cualquier otro componente
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  userData: any;

  ngOnInit() {
    // Recuperar datos de LocalStorage al iniciar la aplicación
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
      console.log('Datos de usuario recuperados de LocalStorage:', this.userData);
    } else {
      console.log('No hay datos de usuario en LocalStorage');
    }
  }
}
