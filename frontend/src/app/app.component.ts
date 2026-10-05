import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuoteModalComponent } from './components/quote-modal/quote-modal.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent, QuoteModalComponent],
  template: `
    <div class="app-layout">
      <app-header (openQuoteModal)="api.openQuoteModal()"></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>

      <!-- WhatsApp Sizing Support CTA (Subtle, Clean) -->
      <a href="https://wa.me/919876543210?text=Hello%20Krishiv%20Creation,%20I%20have%20a%20question%20about%20kids%20sizing"
         target="_blank"
         class="floating-chat-btn"
         aria-label="Direct Sizing Support on WhatsApp">
        💬 WhatsApp Help
      </a>

      <!-- GDPR / Indian Digital Personal Data Consent Banner -->
      <div class="cookie-banner" *ngIf="!cookieConsentDismissed">
        <div class="cookie-content">
          <p>We use essential cookies and 256-bit SSL encryption to ensure secure checkout and accurate sizing.</p>
          <button class="cookie-accept-btn" (click)="dismissCookieConsent()">Accept</button>
        </div>
      </div>

      <app-quote-modal
        *ngIf="api.quoteModalOpen$ | async"
        (close)="api.closeQuoteModal()">
      </app-quote-modal>
    </div>
  `,
  styles: [`
    .app-layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .main-content {
      flex: 1;
    }
    .floating-chat-btn {
      position: fixed; bottom: 80px; right: 24px; z-index: 998;
      background: var(--bright-red); color: #ffffff; text-decoration: none;
      padding: 0.65rem 1.1rem; border-radius: var(--radius-pill); font-weight: 700; font-size: 0.85rem;
      box-shadow: var(--shadow-md); transition: background-color 0.15s ease;
      &:hover { background: var(--bright-red-hover); }
    }
    /* Cookie Consent Banner */
    .cookie-banner {
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 1000;
      background: var(--marine-blue); color: #ffffff;
      padding: 0.8rem 1.5rem; box-shadow: var(--shadow-md);
    }
    .cookie-content {
      max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 1rem;
      p { font-size: 0.85rem; color: #ffffff; }
    }
    .cookie-accept-btn {
      background: var(--butter-yellow); color: var(--marine-blue); border: none; padding: 0.45rem 1.2rem;
      border-radius: var(--radius-sm); font-weight: 700; font-size: 0.8rem; cursor: pointer; white-space: nowrap;
      &:hover { background: var(--butter-yellow-hover); }
    }
    @media (max-width: 768px) {
      .cookie-content { flex-direction: column; text-align: center; }
      .floating-chat-btn { bottom: 70px; right: 16px; padding: 0.6rem 1rem; }
    }
  `]
})
export class AppComponent {
  cookieConsentDismissed = false;

  constructor(public api: ApiService) {}

  dismissCookieConsent() {
    this.cookieConsentDismissed = true;
  }
}
