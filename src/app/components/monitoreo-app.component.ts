import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@Component({
  selector: 'monitoreo-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidenavComponent,],
  templateUrl: './monitoreo-app.component.html',
  styleUrls: ['./monitor-app.component.css']
})
export class MonitoreoAppComponent {

}
