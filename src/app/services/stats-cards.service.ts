import { Injectable } from '@angular/core';
import { StatsCard } from '../models/statsCard';
import { map, Observable, of } from 'rxjs';
import { PlantasService } from './plantas.service';

@Injectable({
  providedIn: 'root'
})
export class StatsCardsService {
  private readonly statsCards: StatsCard[] = [
    {
        title: 'Lecturas OK',
        valueKey: 'totalLecturas',
        icon: 'assets/icons/ok64.svg',
        class: ''
    },
    {
        title: 'Alertas medias',
        valueKey: 'totalAlertasMedias',
        icon: 'assets/icons/medium64.svg',
        class: 'warning'
    },
    {
        title: 'Alertas rojas',
        valueKey: 'totalAlertasRojas',
        icon: 'assets/icons/high64.svg',
        class: 'danger'
    },
    {
        title: 'Sensores deshabilitados',
        valueKey: 'totalSensoresDeshabilitados',
        icon: 'assets/icons/sensores64.svg',
        class: 'disabled'
    }
];

  constructor(private plantasService: PlantasService) { }

  findall(): Observable<StatsCard[]> {
    return of(this.statsCards);
  }

  getStatsCardsConfig(): StatsCard[] {
    return this.statsCards;
  }

  
  getMetricas(): Observable<Record<string, number>> {
    return this.plantasService.findAll().pipe(
      map(plantas => {
        return {
          totalLecturas: plantas.reduce((sum, planta) => sum + planta.readings, 0),
          totalAlertasMedias: plantas.reduce((sum, planta) => sum + planta.mediumAlerts, 0),
          totalAlertasRojas: plantas.reduce((sum, planta) => sum + planta.highAlerts, 0),
          totalSensoresDeshabilitados: plantas.reduce((sum, planta) => sum + planta.disabledSensors, 0)
        };
      })
    );
  }
}
