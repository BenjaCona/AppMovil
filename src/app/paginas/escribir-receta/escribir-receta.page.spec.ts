import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EscribirRecetaPage } from './escribir-receta.page';

describe('EscribirRecetaPage', () => {
  let component: EscribirRecetaPage;
  let fixture: ComponentFixture<EscribirRecetaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EscribirRecetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
