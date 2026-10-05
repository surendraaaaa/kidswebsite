import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer>
      <div class="container">
        <div class="footer__grid">
          <div class="footer__section">
            <h4>About KidsKart</h4>
            <p style="color: #9CA3AF; font-size: 0.875rem; line-height: 1.6;">Premium quality kids clothing with safe, breathable fabrics. Designed for play, made for comfort.</p>
          </div>
          <div class="footer__section">
            <h4>Quick Links</h4>
            <ul>
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/catalog">Shop All</a></li>
              <li><a routerLink="/catalog" [queryParams]="{age: '0-2Y'}">Baby (0-2Y)</a></li>
              <li><a routerLink="/catalog" [queryParams]="{age: '3-8Y'}">Kids (3-8Y)</a></li>
              <li><a routerLink="/catalog" [queryParams]="{age: '9-17Y'}">Teens (9-17Y)</a></li>
            </ul>
          </div>
          <div class="footer__section">
            <h4>Customer Care</h4>
            <ul>
              <li><a routerLink="/faq">FAQ</a></li>
              <li><a routerLink="/shipping">Shipping Policy</a></li>
              <li><a routerLink="/returns">Returns & Exchanges</a></li>
              <li><a routerLink="/privacy">Privacy Policy</a></li>
              <li><a routerLink="/terms">Terms of Service</a></li>
            </ul>
          </div>
          <div class="footer__section">
            <h4>Get in Touch</h4>
            <ul>
              <li><a href="https://wa.me/919876543210" target="_blank" rel="noopener">💬 WhatsApp Support</a></li>
              <li><a href="mailto:support@kidskart.in">✉️ support@kidskart.in</a></li>
              <li><a href="tel:+919876543210">📞 +91 98765 43210</a></li>
            </ul>
            <div class="footer__social" style="margin-top: 1rem;">
              <a href="https://instagram.com/kidskart" target="_blank" rel="noopener" style="color: #D1D5DB; font-size: 1.5rem;">📸</a>
              <a href="https://facebook.com/kidskart" target="_blank" rel="noopener" style="color: #D1D5DB; font-size: 1.5rem;">👍</a>
              <a href="https://twitter.com/kidskart" target="_blank" rel="noopener" style="color: #D1D5DB; font-size: 1.5rem;">🐦</a>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <p style="color: #9CA3AF; font-size: 0.875rem;">© 2026 KidsKart. All rights reserved.</p>
          <div class="flex gap-3" style="align-items: center;">
            <span style="color: #9CA3AF; font-size: 0.75rem;">🔒 Secure Checkout</span>
            <span style="color: #9CA3AF; font-size: 0.75rem;">💳 UPI | Cards | BHIM | Net Banking</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {}
