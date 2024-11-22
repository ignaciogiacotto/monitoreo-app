import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  isOpen: boolean = true;

  toggle(){
    this.isOpen = !this.isOpen;
  }

  constructor() { }
}
