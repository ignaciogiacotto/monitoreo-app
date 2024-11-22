import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [{
    id: 1,
    name: 'Ignacio',
    lastname: 'Giacotto',
    email: 'ignacio@gmail.com',
    password: '12345'
  },
  {
    id: 2,
    name: 'Victoria',
    lastname: 'Nuñez',
    email: 'victoria@gmail.com',
    password: '12345'
  }]

  constructor() { }

  findall(): Observable<User[]> {
    return of(this.users);
  }
}
