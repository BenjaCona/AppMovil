import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AppComponent } from '../app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { firebaseConfig } from './firebase-config';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';

@NgModule({
  declarations: [AppComponent], // Solo declara AppComponent aquí
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp(firebaseConfig)), // Usa firebaseConfig aquí también
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideHttpClient(withInterceptorsFromDi()),
    provideAuth(() => getAuth(initializeApp(firebaseConfig))),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
