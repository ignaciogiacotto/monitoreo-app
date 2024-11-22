import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SidenavService } from '../../services/sidenav.service';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,     
    MatListModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    public sidenavService: SidenavService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer){
      this.matIconRegistry.addSvgIcon(
        'logo', 
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/logo.svg'));    
    }

  toggleSidenav() { 
    this.sidenavService.toggle();
  }

  
}
