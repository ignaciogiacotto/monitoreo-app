import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private readonly API_URL = 'https://flagcdn.com/en/codes.json';
  private readonly FLAG_URL = 'https://flagcdn.com';
  private countries: {code: string, name: string}[] = [];

  constructor(private http: HttpClient) {
    this.loadCountries();
  }

  private loadCountries() {
    this.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  getCountryName(code: string): string {
    const country = this.countries.find(c => c.code === code);
    return country ? country.name : code;
  }

  getCountries(): Observable<{code: string, name: string}[]> {
    return this.http.get<{[key: string]: string}>(this.API_URL).pipe(
      map(response => {
        return Object.entries(response).map(([code, name]) => ({
          code,
          name
        }));
      })
    );
  }

  getFlagUrl(countryCode: string): string {
    return `${this.FLAG_URL}/${countryCode}.svg`;
  }
}
