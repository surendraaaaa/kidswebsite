import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  template: `
    <footer class="footer">
      <div class="footer-inner">
        <div class="col brand-col">
          <div class="footer-logo">
            <svg width="42" height="42" viewBox="0 0 64 64" fill="none">
              <rect width="64" height="64" rx="14" fill="#0E2442" stroke="#D1FE17" stroke-width="1.5" />
              <circle cx="32" cy="32" r="4" fill="#D1FE17" />
              <path d="M 32 32 C 20 24 14 14 10 8" stroke="#D1FE17" stroke-width="2.5" stroke-linecap="round" />
              <path d="M 32 32 C 44 24 50 14 54 8" stroke="#D1FE17" stroke-width="2.5" stroke-linecap="round" />
              <ellipse cx="32" cy="32" rx="20" ry="8" stroke="#FFFFFF" stroke-width="1.2" stroke-dasharray="3 3" transform="rotate(-28 32 32)" />
            </svg>
            <span class="footer-wordmark">krishiv</span>
          </div>
          <p>Quantum-precision tailoring meets joyful Indian festive wear for kids and women.</p>
          <div class="contact-details">
            <p>📞 <strong>Phone:</strong> <a href="tel:+919876543210">+91 98765 43210</a></p>
            <p>💬 <strong>WhatsApp:</strong> +91 98765 43210</p>
            <p>📍 <strong>Store:</strong> Shop No. 4, Ground Floor, Royal Market, Near Station Road, India</p>
          </div>
        </div>

        <div class="col">
          <h4>Quick Links</h4>
          <ul>
            <li><a routerLink="/">Home</a></li>
            <li><a routerLink="/catalog">Collections</a></li>
            <li><a routerLink="/services">Custom Tailoring</a></li>
            <li><a routerLink="/about">About Our Artisans</a></li>
            <li><a routerLink="/faq">Frequently Asked Questions</a></li>
          </ul>
        </div>

        <div class="col">
          <h4>Payment Methods Accepted</h4>
          <p class="tagline">UPI (GPay, PhonePe, Paytm, BHIM), NetBanking, Credit/Debit Cards, Cash On Delivery across India.</p>
          <div class="badge-row">
            <span class="badge">100% Soft Cotton</span>
            <span class="badge">Safe on Kids Skin</span>
            <span class="badge">Hand-Inspected</span>
          </div>
        </div>
      </div>
      <div class="copyright">
        © Krishiv Creation. All rights reserved. Handcrafted with love.
      </div>
    </footer>
  `,
  styles: [`
    .footer { background: var(--marine-blue); color: #ffffff; padding: 3.5rem 1.5rem 1.5rem; margin-top: 4rem; }
    .footer-inner { max-width: 1240px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1.2fr 1.8fr; gap: 3rem; }
    h3 { color: #ffffff; margin-bottom: 0.8rem; font-size: 1.4rem; }
    h4 { color: var(--butter-yellow); margin-bottom: 0.8rem; font-size: 1rem; }
    p { color: #e5e5e5; font-size: 0.88rem; line-height: 1.6; }
    a { color: #ffffff; text-decoration: none; }
    a:hover { color: var(--butter-yellow); }
    ul { list-style: none; }
    li { margin-bottom: 0.4rem; font-size: 0.88rem; }
    .contact-details { margin-top: 0.8rem; font-size: 0.85rem; }
    .newsletter-form {
      display: flex; gap: 0.5rem; margin: 0.8rem 0;
      input {
        flex: 1; padding: 0.6rem 0.8rem; border: none; border-radius: var(--radius-sm); font-size: 0.85rem;
      }
      button { padding: 0.6rem 1.2rem; }
    }
    .payment-methods-text { font-size: 0.76rem; color: #d0d7de; margin-top: 0.5rem; }
    .copyright { text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.15); margin-top: 2.5rem; padding-top: 1.2rem; font-size: 0.8rem; color: #d0d7de; }
    @media (max-width: 768px) {
      .footer-inner { grid-template-columns: 1fr; }
    }
  `]
})
export class FooterComponent {}