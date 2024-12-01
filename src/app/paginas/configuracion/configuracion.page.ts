import { Component } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage {
  isHelpModalOpen = false;
  isAboutModalOpen = false;

  constructor() {}

  openModal(type: 'help' | 'about') {
    if (type === 'help') {
      this.isHelpModalOpen = true;
    } else if (type === 'about') {
      this.isAboutModalOpen = true;
    }
  }

  closeModal(type: 'help' | 'about') {
    if (type === 'help') {
      this.isHelpModalOpen = false;
    } else if (type === 'about') {
      this.isAboutModalOpen = false;
    }
  }
}


