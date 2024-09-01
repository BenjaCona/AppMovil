import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreinicioPage } from './preinicio.page';

describe('PreinicioPage', () => {
  let component: PreinicioPage;
  let fixture: ComponentFixture<PreinicioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PreinicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
