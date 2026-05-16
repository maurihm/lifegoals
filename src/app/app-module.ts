import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // 1. Agregamos FormsModule para los inputs

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { About } from './about/about';

// 2. Importaciones de Firebase que acabamos de instalar
import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    App,
    Home,
    About
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // 3. Importante meterlo aquí para que Angular lo reconozca
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    // 4. Conectamos tu app con las llaves que pusimos en el environment
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [App]
})
export class AppModule { }