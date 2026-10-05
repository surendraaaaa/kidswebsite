import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-page">
      <div class="about-header">
        <h1>About Krishiv Creation</h1>
        <p class="tagline">Crafting heirloom celebrations since 2018 in India.</p>
      </div>

      <div class="story-grid">
        <div class="story-text">
          <h2>Rooted in Local Craft, Dedicated to Childhood Comfort</h2>
          <p>Krishiv Creation started with a simple belief: <em>traditional Indian clothing for children should never come at the cost of comfort</em>. Rough synthetic linings, tight elastics, and heavy zips often turn festive functions into tears for toddlers.</p>
          <p>Our founder created Krishiv Creation to combine genuine artisan needlework with soft, breathable cotton and silk that respects sensitive skin. Over the years, our bespoke mother-child ensembles and festive wear for women have grown into an essential choice for families celebrating memorable milestones.</p>
          <p>Every piece that leaves our shop in India is hand-inspected, cut with seam margins for growing kids, and tailored with personal dedication.</p>
        </div>
        <div class="story-image">
          <img src="https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=700&q=80" alt="About Krishiv Creation Artisans" />
        </div>
      </div>

      <div class="testimonials">
        <h2>What Our Families Say</h2>
        <div class="reviews-grid">
          <div class="review-card">
            <p>⭐⭐⭐⭐⭐</p>
            <p class="review-text">"Ordered a birthday dress for my 3-year-old daughter. The cotton lining made sure she didn't complain once throughout the party! Excellent stitching."</p>
            <strong>— Sneha R., Ahmedabad</strong>
          </div>
          <div class="review-card">
            <p>⭐⭐⭐⭐⭐</p>
            <p class="review-text">"Our matching mom-and-daughter lehengas for Diwali received so many compliments. Krishiv Creation got the measurements spot on via WhatsApp."</p>
            <strong>— Meera K., Mumbai</strong>
          </div>
          <div class="review-card">
            <p>⭐⭐⭐⭐⭐</p>
            <p class="review-text">"They completed our urgent family wedding order in just 48 hours. Reliable, communicative, and very respectful pricing."</p>
            <strong>— Rajesh P., Surat</strong>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-page { max-width: 1100px; margin: 3rem auto; padding: 0 1.5rem; }
    .about-header { text-align: center; margin-bottom: 3rem; }
    .about-header h1 { font-size: 2.6rem; }
    .tagline { color: var(--primary); font-weight: 700; font-size: 1.1rem; }
    .story-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 3rem; align-items: center; margin-bottom: 4rem; }
    .story-text h2 { font-size: 1.8rem; margin-bottom: 1.2rem; }
    .story-text p { color: #475569; margin-bottom: 1rem; font-size: 1rem; }
    .story-image img { width: 100%; border-radius: 18px; box-shadow: 0 10px 25px rgba(0,0,0,0.08); }
    .testimonials h2 { text-align: center; font-size: 2rem; margin-bottom: 2rem; }
    .reviews-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
    .review-card {
      background: #ffffff; padding: 1.8rem; border-radius: 16px; border: 1px solid #ffe4e6;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    }
    .review-text { font-style: italic; color: #475569; margin: 0.8rem 0; font-size: 0.95rem; }
    .review-card strong { color: #1e293b; font-size: 0.9rem; }
    @media (max-width: 768px) {
      .story-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class AboutComponent {}
