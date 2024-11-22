import { CommonModule } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlantasService } from '../../services/plantas.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Plantas } from '../../models/plantas';

@Component({
  selector: 'planta-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './planta-form.component.html',
  styleUrl: './planta-form.component.css'
})
export class PlantaFormComponent {
    plantaForm = new FormGroup({
      name: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      flag: new FormControl(''),
      readings: new FormControl(0),
      mediumAlerts: new FormControl(0),
      highAlerts: new FormControl(0)
  });

  constructor(
    private plantasService: PlantasService,
    private modal: NgbActiveModal
  ) {}

  onSubmit() {
    if( this.plantaForm.valid) {
      this.plantasService.createPlanta(this.plantaForm.value as Plantas).subscribe({
        next: () => {
          this.modal.close();
        },
        error: (error) => {
          console.error("Error al crear la planta", error);
        }
      })
    }
  }

  closeForm() {
    this.modal.dismiss();
  }


}
