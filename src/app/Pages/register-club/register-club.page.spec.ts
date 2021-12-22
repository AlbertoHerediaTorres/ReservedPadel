import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterClubPage } from './register-club.page';

describe('RegisterClubPage', () => {
  let component: RegisterClubPage;
  let fixture: ComponentFixture<RegisterClubPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterClubPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterClubPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
