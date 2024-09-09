import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CamaraIngredientePage } from './camara-ingrediente.page';

describe('CamaraIngredientePage', () => {
  let component: CamaraIngredientePage;
  let fixture: ComponentFixture<CamaraIngredientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CamaraIngredientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
