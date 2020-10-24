import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Maison } from '../../Models/Maison';
import '../../../assets/js/algolia.js';
import { MaisonDhoteService } from '../../service/maison-dhote.service';
declare let algolia: any;


@Component({
  selector: 'app-ajouter-maison',
  templateUrl: './ajouter-maison.page.html',
  styleUrls: ['./ajouter-maison.page.scss'],
})
export class AjouterMaisonPage implements OnInit {

  ngOnInit() {
  }
  isSaving = false;
  form = this.fb.group({
    nomMaison: [null, [Validators.required]],
    descriptionMaison: [null, [Validators.required]]
  });
  constructor(private fb: FormBuilder,
              private router: Router,
              private  loadingController: LoadingController,
              private toastController: ToastController,
              private maisonDhoteService: MaisonDhoteService) { }

  ionViewDidEnter() {
    this.algolia();

  }
  save(): void {
    this.isSaving = true;
    const maison = this.createFromForm();
    this.maisonDhoteService.saveImageMaisonDhote(maison).subscribe();
    console.log(maison);
    // this.subscribeToSaveResponse(this.beneficiaryService.create(beneficiary));
  }

  private createFromForm(): Maison {
    let regionAddress:string = (<HTMLInputElement>document.getElementById("input-map")).value;
    let city:string = (<HTMLInputElement>document.getElementById("city")).value;
    let state:string = (<HTMLInputElement>document.getElementById("state")).value;
    let zip:string = (<HTMLInputElement>document.getElementById("zip")).value;
    let lat:string = (<HTMLInputElement>document.getElementById("Latitude")).value;
    let long:string = (<HTMLInputElement>document.getElementById("Longitude")).value;
    return {
      ...new Maison(),
      // tslint:disable-next-line:no-non-null-assertion
      nom: this.form.get(['nomMaison'])!.value,
      // tslint:disable-next-line:no-non-null-assertion
      description: this.form.get(['descriptionMaison'])!.value,
      imageId:"1",
      mapUrl: lat+" "+long    
    };
  }
  // protected subscribeToSaveResponse(result: Observable<HttpResponse<IBeneficiary>>): void {
  //   this.loadingController.create({message: 'creating a new Beneficiary ..'}).then(
  //     (loadingElement) => {
  //       loadingElement.present();
  //       result.subscribe(
  //         res => {
  //           this.onSaveSuccess();
  //           loadingElement.dismiss();
  //           this.form.reset();
  //           this.router.navigateByUrl('/app/tabs/beneficiaries');
  //           this.presentSuccessToast();
  //         },
  //         () => {this.onSaveError();
  //           loadingElement.dismiss();
  //           this.presentFailToast();
  //         }
  //       );
  //     }
  //   );}
  algolia() {
    setTimeout(()=>{
      new algolia();
    },3000)
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;

  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'new Beneficiary have been saved.',
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }

  async presentFailToast() {
    const toast = await this.toastController.create({
      message: 'adding a new beneficiary have failed',
      duration: 2000,
      color: 'danger',
      position: 'top'
    });
    toast.present();
  }

}
