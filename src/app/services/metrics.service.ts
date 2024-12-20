import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Metrics } from '../models/metrics';
import { Plantas } from '../models/plantas';

@Injectable({
    providedIn: 'root'
})
export class MetricsService  {
    private metrics: Metrics[] = [{
        name: 'Temperatura',
        ok: 100,
        medium: 20,
        high: 3,
        icon: 'temperature.svg'
    },
    {
        name: 'Presión',
        ok: 100,
        medium: 20,
        high: 3,
        icon: 'presion.svg'
        },
    {
        name: 'Viento',
        ok: 100,
        medium: 20,
        high: 3,
        icon: 'viento.svg'
    },
    {
        name: 'Niveles',
        ok: 100,
        medium: 20,
        high: 3,
        icon: 'niveles.svg'
    },
    {
        name: 'Energía',
        ok: 100,
        medium: 20,
        high: 3,
        icon: 'energia.svg'
    },
    {
        name: 'Tensión',
        ok: 100,
        medium: 20,
        high: 3,
        icon: 'tension.svg'
    },
    {
        name: 'Monóxido de carbono',
        ok: 100,
        medium: 20,
        high: 3,
        icon: 'co2.svg'
    },
    {
        name: 'Otros gases',
        ok: 100,
        medium: 20,
        high: 3,
        icon: 'gases.svg'
    },
    ];

    
    constructor() { }

    findall(): Observable<Metrics[]> {
        return of(this.metrics);
    }

    getMetrics(): Observable<Metrics[]> {
        return of(this.metrics);
    }

    updateMetrics(planta: Plantas): void {
        this.metrics = this.metrics.map(metric => ({
            ...metric,
            ok: metric.ok + (planta.readings || 0),
            medium: metric.medium + (planta.mediumAlerts || 0),
            high: metric.high + (planta.highAlerts || 0)
        }));
    }
}