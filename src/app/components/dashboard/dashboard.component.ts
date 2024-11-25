import { Component, OnInit } from '@angular/core';
import { StatsCard } from '../../models/statsCard';
import { StatsCardsService } from '../../services/stats-cards.service';
import { CommonModule } from '@angular/common';
import { PlantasService } from '../../services/plantas.service';
import { MetricsService } from '../../services/metrics.service';
import { NgbDropdownModule, NgbModal, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Plantas } from '../../models/plantas';
import { Metrics } from '../../models/metrics';
import { PlantaFormComponent } from '../planta-form/planta-form.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    NgbDropdownModule, 
    NavbarComponent, 
    SidenavComponent, 
    NgbAlertModule],
  providers: [PlantasService, MetricsService, StatsCardsService, CountriesService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  statsCards: (StatsCard & { value: number })[] = [];
  plantas: Plantas[] = [];
  metrics: Metrics[] = [];
  alertMessage = '';
  showAlert = false;

  constructor(
    private statsCardsService: StatsCardsService,
    private plantasService: PlantasService,
    private metricsService: MetricsService,
    private modalService: NgbModal,
    private countriesService: CountriesService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
    this.plantasService.findAll().subscribe(plantas => {
      this.plantas = plantas;
    });
    this.metricsService.getMetrics().subscribe(metrics => {
      this.metrics = metrics;
    });
  }

  private loadDashboardData() {
    const cardsConfig = this.statsCardsService.getStatsCardsConfig();
    
    this.statsCardsService.getMetricas().subscribe(metrics => {
      this.statsCards = cardsConfig.map(card => ({
        ...card,
        value: metrics[card.valueKey]
      }));
    });
  }

  private reloadDashboardData(): void {
    this.loadDashboardData();
    this.plantasService.findAll().subscribe(plantas => {
      this.plantas = plantas;
    });
    this.metricsService.getMetrics().subscribe(metrics => {
      this.metrics = metrics;
    });
}



  removePlanta(planta: Plantas): void {
    this.plantasService.removePlanta(planta.id).subscribe({
      next: () => {
        this.reloadDashboardData();
      },
      error: (error) => {
        console.error('Error al eliminar la planta:', error);
      }
    });
  }
  
  createPlanta(planta: Plantas): void {
    this.plantasService.createPlanta(planta).subscribe({
      next: () => {
        this.reloadDashboardData();
      },
      error: (error) => {
        console.error('Error al crear la planta:', error);
      }
    });
  }

  openCreateModal(): void {
    const modalRef = this.modalService.open(PlantaFormComponent);
    modalRef.componentInstance.data = { 
        isEdit: false 
    };

    modalRef.result.then(
        (result) => {
            if (result) {
                this.plantasService.createPlanta(result).subscribe({
                    next: () => this.reloadDashboardData(),
                    error: () => this.handleError('crear')
                });
            }
        },
        () => {}
    );
}

editarPlanta(planta: Plantas): void {
    const modalRef = this.modalService.open(PlantaFormComponent);
    modalRef.componentInstance.data = { 
        planta: planta, 
        isEdit: true 
    };
    
    modalRef.result.then(
        (result) => {
            if (result) {
                this.plantasService.updatePlanta(planta.id, result).subscribe({
                    next: () => this.reloadDashboardData(), 
                    error: () => this.handleError('actualizar')
                });
            }
        },
        () => {}
    );
}

  private handleError(action: string): void {
    this.alertMessage = `No se pudo ${action} la planta. Por favor, intente nuevamente.`;
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 3000);
  }

  getCountryName(countryCode: string): string {
    return this.countriesService.getCountryName(countryCode);
  }

  getFlagUrl(countryCode: string): string {
    return this.countriesService.getFlagUrl(countryCode);
  }

}
