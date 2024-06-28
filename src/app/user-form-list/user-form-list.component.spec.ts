import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormListComponent } from './user-form-list.component';

describe('UserFormListComponent', () => {
  let component: UserFormListComponent;
  let fixture: ComponentFixture<UserFormListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
