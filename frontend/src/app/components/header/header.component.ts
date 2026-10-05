import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <header class="header">
      <div class="top-bar">
        <span class="announcement">Free Express Shipping across India on orders over ₹999 | 100% Kid-Safe Soft Cotton</span>
        <a href="tel:+919876543210" class="call-mobile">
          <span>Help: +91 98765 43210</span>
        </a>
      </div>

      <nav class="nav-container">
        <!-- Brand Logo on Left (Marine Blue) -->
        <a routerLink="/" class="brand-logo" aria-label="Krishiv Creation Home">
          <svg class="logo-mark" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="6" fill="#0047AB" />
            <circle cx="20" cy="20" r="3" fill="#FFF14D" />
            <path d="M 20 20 C 13 14 9 8 6 4" stroke="#FFF14D" stroke-width="2" stroke-linecap="round" />
            <path d="M 20 20 C 27 14 31 8 34 4" stroke="#FFF14D" stroke-width="2" stroke-linecap="round" />
            <path d="M 20 20 C 10 24 6 32 4 36" stroke="#FFF14D" stroke-width="2" stroke-linecap="round" />
            <path d="M 20 20 C 30 24 34 32 36 36" stroke="#FFF14D" stroke-width="2" stroke-linecap="round" />
          </svg>
          <div class="wordmark-wrap">
            <span class="wordmark">krishiv</span>
            <span class="submark">CREATION</span>
          </div>
        </a>

        <!-- Clean Navigation with Butter Yellow Underline on Hover -->
        <div class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a routerLink="/catalog" routerLinkActive="active">Catalog</a>
          <a routerLink="/services" routerLinkActive="active">Services</a>
          <a routerLink="/about" routerLinkActive="active">About</a>
          <a routerLink="/faq" routerLinkActive="active">FAQ</a>
        </div>

        <!-- Search, Cart, Account Icons -->
        <div class="nav-actions">
          <a routerLink="/catalog" class="icon-btn" title="Search catalog">🔍</a>
          <a routerLink="/checkout" class="cart-pill">
            Cart ({{ (cartCount$ | async) }})
          </a>
          <button class="btn-primary quote-btn" (click)="onRequestQuote()">
            Request Quote
          </button>
        </div>
      </nav>
    </header>

    <!-- Mobile-First Thumb Navigation Bar -->
    <nav class="mobile-bottom-nav">
      <a routerLink="/" routerLinkActive="active-tab" [routerLinkActiveOptions]="{exact: true}">
        <span>Home</span>
      </a>
      <a routerLink="/catalog" routerLinkActive="active-tab">
        <span>Catalog</span>
      </a>
      <button class="quote-trigger-tab" (click)="onRequestQuote()">
        <span>Quote</span>
      </button>
      <a routerLink="/checkout" routerLinkActive="active-tab">
        <span>Cart ({{ (cartCount$ | async) }})</span>
      </a>
    </nav>
  `,
  styles: [`
    .header {
      background: #ffffff;
      position: sticky;
      top: 0;
      z-index: 100;
      border-bottom: 1px solid var(--border-gray);
    }
    .top-bar {
      display: flex; justify-content: space-between; align-items: center;
      padding: 0.35rem 2rem; background: var(--marine-blue); font-size: 0.76rem; font-weight: 600;
      color: #ffffff;
    }
    .call-mobile { color: #ffffff; text-decoration: none; }
    .call-mobile:hover { text-decoration: underline; }
    .nav-container {
      display: flex; align-items: center; justify-content: space-between; padding: 0.9rem 2rem; max-width: 1240px; margin: 0 auto;
    }
    .brand-logo {
      display: flex; align-items: center; text-decoration: none; gap: 0.6rem;
    }
    .logo-mark { width: 30px; height: 30px; }
    .wordmark-wrap { display: flex; flex-direction: column; line-height: 1; }
    .wordmark {
      font-size: 1.15rem; font-weight: 800; color: var(--marine-blue);
      letter-spacing: 0.08em; text-transform: lowercase;
    }
    .submark {
      font-size: 0.55rem; font-weight: 700; color: var(--bright-red); letter-spacing: 0.2em; margin-top: 2px;
    }
    .nav-links a {
      margin: 0 1rem; text-decoration: none; color: var(--marine-blue); font-weight: 600; font-size: 0.9rem;
      letter-spacing: 0.02em; padding-bottom: 4px; border-bottom: 2px solid transparent; transition: border-color 0.15s ease;
      &.active, &:hover { border-bottom-color: var(--butter-yellow); }
    }
    .nav-actions { display: flex; align-items: center; gap: 0.75rem; }
    .icon-btn { text-decoration: none; font-size: 1rem; padding: 0.4rem; color: var(--marine-blue); }
    .cart-pill {
      background: var(--light-gray); color: var(--marine-blue); padding: 0.5rem 1rem;
      border-radius: var(--radius-sm); text-decoration: none; font-weight: 700; font-size: 0.85rem;
      border: 1px solid var(--border-gray);
    }
    .quote-btn {
      font-size: 0.85rem; padding: 0.5rem 1rem;
    }
    /* Mobile Bottom Navigation */
    .mobile-bottom-nav {
      display: none;
      position: fixed; bottom: 0; left: 0; right: 0; height: 60px;
      background: #ffffff; border-top: 1px solid var(--border-gray);
      z-index: 999; justify-content: space-around; align-items: center;
      a, button {
        background: none; border: none; color: var(--marine-blue); text-decoration: none; font-size: 0.78rem;
        font-weight: 600; display: flex; flex-direction: column; align-items: center; cursor: pointer; font-family: inherit;
        &.active-tab { color: var(--bright-red); font-weight: 800; }
      }
    }
    @media (max-width: 850px) {
      .nav-links { display: none; }
      .announcement { display: none; }
      .top-bar { justify-content: center; }
      .mobile-bottom-nav { display: flex; }
    }
  `]
})
export class HeaderComponent {
  @Output() openQuoteModal = new EventEmitter<void>();
  cartCount$ = this.api.cart$.pipe(
    map(items => items.reduce((sum, item) => sum + item.quantity, 0))
  );

  constructor(public api: ApiService) {}

  onRequestQuote() {
    this.openQuoteModal.emit();
    this.api.openQuoteModal();
  }
}
