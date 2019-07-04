import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //   (ngModelChange)="onChange($event)" -->
  //   <p>A: {{ 9 | currency: 'USD':'symbol':'1.2-2' }}</p>
  //   <p>A: {{ 95 | currency: 'USD':'symbol':'1.2-2' }}</p>
  //   <p>B: {{ 195 | currency: 'USD':'symbol':'1.2-2' }}</p>
  //   <p>B: {{ 1095 | currency: 'USD':'symbol':'1.2-2' }}</p>
  //   <p>B: {{ 1195 | currency: 'USD':'symbol':'1.2-2' }}</p>
  //   <p>B: {{ 10195 | currency: 'USD':'symbol':'1.2-2' }}</p>
  //   <p>B: {{ 109987 | currency: 'USD':'symbol':'1.2-2' }}</p>
  //   <p>B: {{ 0.95 | currency: 'USD':'symbol':'1.2-2' }}</p>
  //   <p>B: {{ 1.95 | currency: 'USD':'symbol':'1.2-2' }}</p>
  //   <p>B: {{ 1.0957 | currency: 'USD':'symbol':'1.2-2' }}</p>
  //   <p>B: {{ 1.0 | currency: 'USD':'symbol':'1.2-2' }}</p>
  //   <p>B: {{ 12221.09567 | currency: 'USD':'symbol':'1.2-4' }}</p>

  //    <p>A: {{ 9 | currency: 'EUR':'symbol':'1.2-2' }}</p>
  //   <p>A: {{ 95 | currency: 'EUR':'symbol':'1.2-2' }}</p>
  //   <p>B: {{ 195 | currency: 'EUR':'symbol':'1.2-2' }}</p>
  //   <p>B: {{ 1095 | currency: 'EUR':'symbol':'1.2-2' }}</p>
  //   <p>B: {{ 1195 | currency: 'EUR':'symbol':'1.2-2' }}</p>
  //   <p>B: {{ 10195 | currency: 'EUR':'symbol':'1.2-2' }}</p>
  //   <p>B: {{ 109987 | currency: 'EUR':'symbol':'1.2-2' }}</p>
  //   <p>B: {{ 0.95 | currency: 'EUR':'symbol':'1.2-2' }}</p>
  //   <p>B: {{ 1.95 | currency: 'EUR':'symbol':'1.2-2' }}</p>
  //   <p>B: {{ 1.0957 | currency: 'EUR':'symbol':'1.2-2' }}</p>
  //   <p>B: {{ 1.0 | currency: 'EUR':'symbol':'1.2-2' }}</p>
  //   <p>B: {{ 12221.09567 | currency: 'EUR':'symbol':'1.2-4' }}</p>
});
