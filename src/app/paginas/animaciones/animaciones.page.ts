import { Component, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';
import { AnimationController, Animation } from '@ionic/angular';

@Component({
  selector: 'app-animaciones',
  templateUrl: 'animaciones.page.html',
})
export class AnimacionesPage {
  @ViewChild('modal1', { static: true }) modal1!: IonModal;
  @ViewChild('modal2', { static: true }) modal2!: IonModal;
  @ViewChild('modal3', { static: true }) modal3!: IonModal;

  constructor(
    private animationCtrl: AnimationController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    const createAnimation = (baseEl: HTMLElement): Animation => {
      const root = baseEl.shadowRoot;
      if (!root) return this.animationCtrl.create(); 

      const backdrop = root.querySelector('ion-backdrop');
      const wrapper = root.querySelector('.modal-wrapper');
      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(backdrop || baseEl)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = this.animationCtrl
        .create()
        .addElement(wrapper || baseEl)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' },
        ]);

      return this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const enterAnimation = (baseEl: HTMLElement): Animation => createAnimation(baseEl);
    const leaveAnimation = (baseEl: HTMLElement): Animation => createAnimation(baseEl).direction('reverse');

    this.modal1.enterAnimation = enterAnimation;
    this.modal1.leaveAnimation = leaveAnimation;
    this.modal2.enterAnimation = enterAnimation;
    this.modal2.leaveAnimation = leaveAnimation;
    this.modal3.enterAnimation = enterAnimation;
    this.modal3.leaveAnimation = leaveAnimation;
  }

  closeModal(modal: IonModal) {
    modal.dismiss();
  }

  goHome() {
    this.navCtrl.navigateRoot('/home');
  }
}
