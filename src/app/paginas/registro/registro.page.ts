import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service'; // Ajusta la ruta según sea necesario
import { FirebaseError } from 'firebase/app'; // Importa FirebaseError
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    private authService: AuthService, // Inyecta AuthService
    private alertController: AlertController, // Inyecta AlertController
    private router: Router
  ) {
    // Inicializa el formulario
    this.registerForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]], // Validación de correo
    });
  }

  ngOnInit() {}

  async onSubmitTemplate() {
    if (this.registerForm.valid) {
        const { usuario, password, nombre, correo } = this.registerForm.value;

        try {
            // Registra al usuario usando AuthService
            await this.authService.register(correo, password, usuario);

            // Verifica si el usuario está autenticado
            const auth = getAuth();
            const user = auth.currentUser; // Obtén el usuario actual
            if (user) {
                console.log('Usuario autenticado:', user);
            } else {
                console.log('No hay usuario autenticado después del registro.');
            }

            this.datos(); // Navegar a otra página si es necesario
        } catch (error: unknown) {
            console.error('Error al registrar:', error);
            
            // Manejar el error (mostrar un mensaje de alerta)
            if (error instanceof FirebaseError && error.code === 'auth/email-already-in-use') {
                this.showEmailInUseAlert();
            } else {
                this.showGenericErrorAlert();
            }
        }
    }
}

  datos() {
    this.router.navigate(['/home'], {
      state: {
        nombre: this.registerForm.value.nombre, // Pasar el nombre
      },
    });
  }

  // Método para mostrar el alert si el correo ya está en uso
  async showEmailInUseAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El correo electrónico ya está en uso. Por favor, usa otro.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Método para mostrar un alert genérico para otros errores
  async showGenericErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El correo que estás intentando utilizar está en uso. Intente con uno nuevo',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
