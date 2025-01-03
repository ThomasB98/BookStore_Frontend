import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsiplayOrderComponent } from './dsiplay-order.component';

describe('DsiplayOrderComponent', () => {
  let component: DsiplayOrderComponent;
  let fixture: ComponentFixture<DsiplayOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsiplayOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsiplayOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
