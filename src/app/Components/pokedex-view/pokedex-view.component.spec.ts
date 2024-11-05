import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexViewComponent } from './pokedex-view.component';

describe('PokedexViewComponent', () => {
  let component: PokedexViewComponent;
  let fixture: ComponentFixture<PokedexViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
