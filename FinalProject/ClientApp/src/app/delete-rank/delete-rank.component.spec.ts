import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRankComponent } from './delete-rank.component';

describe('DeleteRankComponent', () => {
  let component: DeleteRankComponent;
  let fixture: ComponentFixture<DeleteRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
