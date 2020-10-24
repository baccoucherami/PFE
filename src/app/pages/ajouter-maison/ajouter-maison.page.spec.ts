import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjouterMaisonPage } from './ajouter-maison.page';

describe('AjouterMaisonPage', () => {
  let component: AjouterMaisonPage;
  let fixture: ComponentFixture<AjouterMaisonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterMaisonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterMaisonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
