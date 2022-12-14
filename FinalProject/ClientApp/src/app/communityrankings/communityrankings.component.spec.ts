import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityRankingsComponent } from './communityrankings.component';

describe('CommunityrankingsComponent', () => {
  let component: CommunityRankingsComponent;
  let fixture: ComponentFixture<CommunityRankingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityRankingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
