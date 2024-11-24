import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Plantas } from '../models/plantas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class PlantasService  {

    private plantas: Plantas[] = [];

    constructor(private http: HttpClient, private authService: AuthService) { }

    getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${this.authService.getToken()}`
        });
    }

    findAll(): Observable<Plantas[]> {
        return this.http.get<Plantas[]>('http://localhost:8080/api/plantas', 
            {headers: this.getHeaders()}).pipe(
            map((plantas: any) => plantas as Plantas[]),
        );
    }

    removePlanta(id: number) {
        return this.http.delete(`http://localhost:8080/api/plantas/${id}`, 
            {headers: this.getHeaders()});
    }

    createPlanta(planta: Plantas) {
        return this.http.post(`http://localhost:8080/api/plantas`, planta, 
            {headers: this.getHeaders()});
    }
}