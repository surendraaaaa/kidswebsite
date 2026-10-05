import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="faq-page">
      <h1>Frequently Asked Questions</h1>
      <p class="subtitle">Everything you need to know about custom sizing, shipping across India, and payments.</p>

      <div class="faq-accordion">
        <div class="faq-item">
          <h3>How do I take measurements for my child?</h3>
          <p>We provide a quick 1-minute visual guide over WhatsApp. You only need chest, shoulder-to-waist, and overall length. For growing children, we always leave internal margins of 1.5 to 2 inches so the outfit can be easily loosened later.</p>
        </div>

        <div class="faq-item">
          <h3>What payment methods are supported?</h3>
          <p>We support all Indian payment options: UPI (Google Pay, PhonePe, Paytm, BHIM), NetBanking, Credit/Debit Cards, and Cash On Delivery (COD) for eligible pincodes.</p>
        </div>

        <div class="faq-item">
          <h3>How fast is the delivery?</h3>
          <p>Ready-to-wear catalog pieces dispatch within 24 to 48 hours. Custom tailoring typically takes 5–7 days. For urgent celebrations, we offer an express 48-hour tailoring service upon request.</p>
        </div>

        <div class="faq-item">
          <h3>Can I send my own fabric to Krishiv Creation?</h3>
          <p>Yes! If you have purchased your own fabric, you can courier it to our boutique address or drop it off in person. We will discuss lining choices, design cuts, and deliver the tailored outfit back to your address.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .faq-page { max-width: 800px; margin: 3rem auto; padding: 0 1.5rem; }
    h1 { font-size: 2.3rem; text-align: center; }
    .subtitle { text-align: center; color: #64748b; margin-bottom: 3rem; }
    .faq-accordion { display: flex; flex-direction: column; gap: 1.2rem; }
    .faq-item {
      background: #ffffff; padding: 1.6rem; border-radius: 14px; border: 1px solid #ffe4e6;
    }
    .faq-item h3 { font-size: 1.15rem; margin-bottom: 0.5rem; color: #1e293b; }
    .faq-item p { color: #64748b; font-size: 0.95rem; line-height: 1.6; }
  `]
})
export class FaqComponent {}
