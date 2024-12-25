import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GistCardComponent } from './gist-card.component';

describe('GistCardComponent', () => {
  let component: GistCardComponent;
  let fixture: ComponentFixture<GistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GistCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
