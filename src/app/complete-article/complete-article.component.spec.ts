import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteArticleComponent } from './complete-article.component';

describe('CompleteArticleComponent', () => {
  let component: CompleteArticleComponent;
  let fixture: ComponentFixture<CompleteArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
