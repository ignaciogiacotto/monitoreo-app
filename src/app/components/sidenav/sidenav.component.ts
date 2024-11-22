import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidenavService } from '../../services/sidenav.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,     
    MatListModule,
    MatIconModule,
    RouterLink,
    RouterOutlet,
    ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
constructor(
  public sidenavService: SidenavService,
  private matIconRegistry: MatIconRegistry,
  private domSanitizer: DomSanitizer) {

  this.matIconRegistry.addSvgIcon(
    'worldS', 
    this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/worldS.svg'));

    this.matIconRegistry.addSvgIcon(
    'plantS', 
    this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/plantS.svg'));

    this.matIconRegistry.addSvgIcon(
    'sensorS', 
    this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/sensorS.svg'));

    this.matIconRegistry.addSvgIcon(
    'historyplantS', 
    this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/historyplantS.svg'));

    this.matIconRegistry.addSvgIcon(
    'logoutS', 
    this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/logoutS.svg'));
}

}
