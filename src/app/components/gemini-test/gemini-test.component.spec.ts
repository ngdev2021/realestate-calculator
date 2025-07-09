import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeminiTestComponent } from './gemini-test.component';

describe('GeminiTestComponent', () => {
  let component: GeminiTestComponent;
  let fixture: ComponentFixture<GeminiTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeminiTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeminiTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
