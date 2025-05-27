import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResorceCardComponent } from './resorce-card.component';

describe('ResorceCardComponent', () => {
  let component: ResorceCardComponent;
  let fixture: ComponentFixture<ResorceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResorceCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResorceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
