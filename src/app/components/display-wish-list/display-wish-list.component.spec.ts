import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayWishListComponent } from './display-wish-list.component';

describe('DisplayWishListComponent', () => {
  let component: DisplayWishListComponent;
  let fixture: ComponentFixture<DisplayWishListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayWishListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayWishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
