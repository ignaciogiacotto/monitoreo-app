import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-planta-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './planta-form.component.html',
  styleUrls: ['./planta-form.component.css']
})
export class PlantaFormComponent implements OnInit {
  plantaForm: FormGroup;
  countries: { code: string; name: string }[] = [];
  selectedFlag: string = '';
  @Input() data: { planta?: any; isEdit: boolean } = { isEdit: false };

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private countriesService: CountriesService
  ) {
    this.plantaForm = this.fb.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      lecturas: [null],
      lecturasMax: [null],
      alertasMedias: [null],
      alertasRojas: [null]
    });
  }

  ngOnInit() {
    this.loadCountries();
    
    if (this.data?.isEdit && this.data?.planta) {
      this.plantaForm.patchValue(this.data.planta);
      this.selectedFlag = this.countriesService.getFlagUrl(this.data.planta.country);
    }
  }

  private loadCountries() {
    this.countriesService.getCountries().subscribe(countries => {
      this.countries = countries.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  onCountryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    if (select?.value) {
      this.selectedFlag = this.countriesService.getFlagUrl(select.value);
    }
  }

  onSubmit() {
    if (this.plantaForm.valid) {
        const formData = this.plantaForm.getRawValue();
        
        const plantaData = {
            name: formData.name,
            country: formData.country,
            readings: formData.lecturas,
            maxReadings: formData.lecturasMax,
            mediumAlerts: formData.alertasMedias,
            highAlerts: formData.alertasRojas,
            disabledSensors: formData.lecturasMax
        };
        
        this.activeModal.close(plantaData);
    }
}

  closeForm() {
    this.activeModal.dismiss();
  }
}
