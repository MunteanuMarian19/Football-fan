import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isSmallScreen = window.innerWidth < 576;
  showFullNavbar = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isSmallScreen = window.innerWidth < 576;
  }

  toggleNavbar(): void {
    this.showFullNavbar = !this.showFullNavbar;
  }

  closeNavbar(): void {
    this.showFullNavbar = false;
  }
}
