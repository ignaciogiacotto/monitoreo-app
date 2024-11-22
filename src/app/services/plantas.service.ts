import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Plantas } from '../models/plantas';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PlantasService  {

    private plantas: Plantas[] = [];

    constructor(private http: HttpClient) { }

    findAll(): Observable<Plantas[]> {
        return this.http.get<Plantas[]>('http://localhost:8080/api/plantas').pipe(
            map((plantas: any) => plantas as Plantas[]),
        );
    }

    removePlanta(id: number) {
        return this.http.delete(`http://localhost:8080/api/plantas/${id}`);
    }

    createPlanta(planta: Plantas) {
        return this.http.post(`http://localhost:8080/api/plantas`, planta);
    }
}