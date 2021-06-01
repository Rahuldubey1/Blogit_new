import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProflieComponent } from './user-proflie.component';

describe('UserProflieComponent', () => {
  let component: UserProflieComponent;
  let fixture: ComponentFixture<UserProflieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProflieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProflieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
