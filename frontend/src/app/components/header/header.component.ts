import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Top Announcement Bar -->
    <div class="sale-banner">
      🚚 Free Shipping on Orders Above ₹499 | 🔄 Easy 30-Day Returns
    </div>

    <!-- Main Navigation -->
    <nav class="navbar">
      <div class="navbar__container">
        <!-- Logo -->
        <a routerLink="/" class="navbar__logo">KidsKart</a>

        <!-- Desktop Menu -->
        <ul class="navbar__menu">
          <li><a routerLink="/" class="navbar__link">Home</a></li>
          <li><a routerLink="/catalog" class="navbar__link">Shop All</a></li>
          <li><a routerLink="/catalog" [queryParams]="{age: '0-2Y'}" class="navbar__link">Baby (0-2Y)</a></li>
          <li><a routerLink="/catalog" [queryParams]="{age: '3-8Y'}" class="navbar__link">Kids (3-8Y)</a></li>
          <li><a routerLink="/catalog" [queryParams]="{age: '9-17Y'}" class="navbar__link">Teens (9-17Y)</a></li>
          <li><a routerLink="/about" class="navbar__link">About</a></li>
          <li><a routerLink="/faq" class="navbar__link">FAQ</a></li>
        </ul>

        <!-- Actions -->
        <div class="navbar__actions">
          <!-- Search Icon -->
          <svg class="navbar__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>

          <!-- Account Icon -->
          <svg class="navbar__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>

          <!-- Cart Icon with Badge -->
          <div class="cart-badge" style="position: relative; cursor: pointer;">
            <svg class="navbar__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span class="cart-badge__count">3</span>
          </div>

          <!-- Mobile Menu Toggle -->
          <svg class="navbar__icon" style="display: none;" (click)="toggleMobileMenu()" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div class="mobile-menu" [class.open]="isMobileMenuOpen">
      <ul class="mobile-menu__list">
        <li class="mobile-menu__item"><a routerLink="/" class="mobile-menu__link" (click)="toggleMobileMenu()">Home</a></li>
        <li class="mobile-menu__item"><a routerLink="/catalog" class="mobile-menu__link" (click)="toggleMobileMenu()">Shop All</a></li>
        <li class="mobile-menu__item"><a routerLink="/catalog" [queryParams]="{age: '0-2Y'}" class="mobile-menu__link" (click)="toggleMobileMenu()">Baby (0-2Y)</a></li>
        <li class="mobile-menu__item"><a routerLink="/catalog" [queryParams]="{age: '3-8Y'}" class="mobile-menu__link" (click)="toggleMobileMenu()">Kids (3-8Y)</a></li>
        <li class="mobile-menu__item"><a routerLink="/catalog" [queryParams]="{age: '9-17Y'}" class="mobile-menu__link" (click)="toggleMobileMenu()">Teens (9-17Y)</a></li>
        <li class="mobile-menu__item"><a routerLink="/about" class="mobile-menu__link" (click)="toggleMobileMenu()">About</a></li>
        <li class="mobile-menu__item"><a routerLink="/faq" class="mobile-menu__link" (click)="toggleMobileMenu()">FAQ</a></li>
        <li class="mobile-menu__item"><a routerLink="/contact" class="mobile-menu__link" (click)="toggleMobileMenu()">Contact</a></li>
      </ul>
    </div>
  `,
  styles: []
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
