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

    private API_URL = 'http://ec2-18-219-192-204.us-east-2.compute.amazonaws.com:8080/api';

    getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${this.authService.getToken()}`
        });
    }

    findAll(): Observable<Plantas[]> {
        return this.http.get<Plantas[]>(`${this.API_URL}/plantas`, 
            {headers: this.getHeaders()}).pipe(
            map((plantas: any) => plantas as Plantas[]),
        );
    }

    removePlanta(id: number) {
        return this.http.delete(`${this.API_URL}/plantas/${id}`, 
            {headers: this.getHeaders()});
    }

    createPlanta(planta: Plantas) {
        return this.http.post(`${this.API_URL}/plantas`, planta, 
            {headers: this.getHeaders()});
    }

    updatePlanta(id: number, planta: Partial<Plantas>) {
        return this.http.put<Plantas>(`${this.API_URL}/plantas/${id}`, planta,
            {headers: this.getHeaders()});
    }
}