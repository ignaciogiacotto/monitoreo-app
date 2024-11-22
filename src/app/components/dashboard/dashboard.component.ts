import { Component, OnInit } from '@angular/core';
import { StatsCard } from '../../models/statsCard';
import { StatsCardsService } from '../../services/stats-cards.service';
import { CommonModule } from '@angular/common';
import { PlantasService } from '../../services/plantas.service';
import { MetricsService } from '../../services/metrics.service';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Plantas } from '../../models/plantas';
import { Metrics } from '../../models/metrics';
import { PlantaFormComponent } from '../planta-form/planta-form.component';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule],
  providers: [PlantasService, MetricsService, StatsCardsService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  statsCards: (StatsCard & { value: number })[] = [];
  plantas: Plantas[] = [];
  metrics: Metrics[] = [];

  constructor(
    private statsCardsService: StatsCardsService,
    private plantasService: PlantasService,
    private metricsService: MetricsService,
    private modalService: NgbModal,
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
        // En lugar de filtrar manualmente, recargamos todos los datos
        this.reloadDashboardData();
      },
      error: (error) => {
        console.error('Error al eliminar la planta:', error);
      }
    });
  }

  editarPlanta(planta: Plantas): void {
      console.log(planta);
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

  openCreateModal() {
    const modalRef = this.modalService.open(PlantaFormComponent);
    modalRef.result.then(
        (result) => {
            if (result) {
                this.reloadDashboardData();
            }
        },
        () => {}
    );
    }


}
