import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReconocimientoDeIngredientesPage } from './reconocimiento-de-ingredientes.page';

describe('ReconocimientoDeIngredientesPage', () => {
  let component: ReconocimientoDeIngredientesPage;
  let fixture: ComponentFixture<ReconocimientoDeIngredientesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconocimientoDeIngredientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
