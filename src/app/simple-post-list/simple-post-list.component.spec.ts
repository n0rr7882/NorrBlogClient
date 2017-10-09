import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePostListComponent } from './simple-post-list.component';

describe('SimplePostListComponent', () => {
  let component: SimplePostListComponent;
  let fixture: ComponentFixture<SimplePostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplePostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplePostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
