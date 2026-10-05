import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="services-page">
      <h1>Custom Tailoring & Design Services</h1>
      <p class="subtitle">Every child has different growth milestones, and every woman has unique fitting preferences. Here is how Krishiv Creation can craft your vision.</p>

      <div class="service-list">
        <div class="item">
          <div class="icon">🎂</div>
          <div>
            <h3>Kids Birthday & Milestone Outfits</h3>
            <p>From first-birthday fluffy frocks and tutu dresses to custom embroidered ethnic kurta-dhoti sets. Lined with ultra-soft muslin so your child can smile all day without itchiness.</p>
          </div>
        </div>

        <div class="item">
          <div class="icon">👯‍♀️</div>
          <div>
            <h3>Mother & Child Matching Combos</h3>
            <p>Coordinate fabric, motif, and color palette for Haldi, Mehendi, Diwali, or milestone family photoshoots. Designed with comfort for mothers and fun for little ones.</p>
          </div>
        </div>

        <div class="item">
          <div class="icon">🪡</div>
          <div>
            <h3>Designer Blouse & Ethnic Kurti Stitching</h3>
            <p>Padded blouses, back designs, boat necks, princess cuts, and A-line anarkalis. Send us reference sketches or pick from our boutique catalogs.</p>
          </div>
        </div>

        <div class="item">
          <div class="icon">🏫</div>
          <div>
            <h3>Annual Day, School Function & Bulk Orders</h3>
            <p>Standardized sizing and fast production for dance groups, theatrical performances, and community celebrations across India.</p>
          </div>
        </div>
      </div>

      <div class="cta-banner">
        <h3>Have a design in mind?</h3>
        <p>Talk to our master cutting master directly or send measurements via our online inquiry form.</p>
        <button class="btn-primary" (click)="handleQuoteClick()">Request a Custom Quote ✂️</button>
      </div>
    </div>
  `,
  styles: [`
    .services-page { max-width: 900px; margin: 3rem auto; padding: 0 1.5rem; }
    h1 { font-size: 2.3rem; margin-bottom: 0.5rem; text-align: center; }
    .subtitle { text-align: center; color: #64748b; margin-bottom: 3rem; }
    .service-list { display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 3.5rem; }
    .item {
      display: flex; gap: 1.5rem; background: #fff; padding: 1.8rem; border-radius: 16px;
      border: 1px solid #ffe4e6; align-items: flex-start;
    }
    .icon { font-size: 2.5rem; background: #fff1f2; padding: 1rem; border-radius: 14px; }
    .item h3 { font-size: 1.25rem; margin-bottom: 0.4rem; }
    .item p { color: #64748b; font-size: 0.95rem; line-height: 1.6; }
    .cta-banner {
      background: linear-gradient(135deg, #fff0f3 0%, #fffbf0 100%);
      padding: 2.5rem; border-radius: 20px; text-align: center; border: 2px dashed #fecdd3;
    }
    .cta-banner h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    .cta-banner p { color: #64748b; margin-bottom: 1.5rem; }
  `]
})
export class ServicesComponent {
  @Output() openQuoteModal = new EventEmitter<void>();

  constructor(public api: ApiService) {}

  handleQuoteClick() {
    this.openQuoteModal.emit();
    this.api.openQuoteModal();
  }
}
