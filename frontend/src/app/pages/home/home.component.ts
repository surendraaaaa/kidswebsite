import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Futuristic Diagonal Hero (Marine Blue -> Bright Red) -->
    <section class="hero-diagonal" (mousemove)="onMouseMove($event)">
      <div class="hero-container">
        <div class="hero-text">
          <div class="hero-badge-wrap">
            <span class="holographic-badge">✦ FUTURE COUTURE // ATELIER 2026</span>
          </div>
          <h1>Architectural Precision for Kids &amp; Women</h1>
          <p>
            Ultra-soft organic muslin linings, zero-friction seams, and statement Indian ethnic apparel.
            Designed with growth margins for active kids and tailored elegance for mothers.
          </p>

          <!-- Instant Age-Group Filter Visual Chips -->
          <div class="age-filter-section">
            <span class="filter-label">Filter by Child's Age:</span>
            <div class="age-chips">
              <button *ngFor="let age of ageGroups"
                      [class.active]="selectedAge === age"
                      (click)="setAgeFilter(age)"
                      class="chip-btn">
                {{ age }}
              </button>
            </div>
          </div>

          <div class="hero-btn-group">
            <a routerLink="/catalog" class="btn-primary">Shop Instant Collection 🛍️</a>
            <button class="btn-secondary" (click)="handleQuoteClick()">Custom Atelier Fitting ✂</button>
          </div>
        </div>

        <!-- Interactive 3D Parallax Floating Stage -->
        <div class="hero-3d-stage" [style.transform]="parallaxTransform">
          <div class="card-glow"></div>
          <div class="floating-showcase">
            <img src="https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80"
                 alt="Krishiv Creation Atelier Piece"
                 class="hero-img" />
            <div class="floating-overlay-card">
              <span class="tag">Selected Filter</span>
              <strong>{{ selectedAge === 'All' ? 'Curated Festive Edit' : selectedAge + ' Precision Sizing' }}</strong>
            </div>
          </div>
          <div class="floating-pill pill-top">
            <span class="dot-red"></span> 100% Soft Breathable Cotton
          </div>
          <div class="floating-pill pill-bottom">
            <span class="badge-yellow">⚡</span> 48h Urgent Atelier Dispatch
          </div>
        </div>
      </div>
    </section>

    <!-- Fabric & Safety Micro-Badges -->
    <section class="safety-ribbon">
      <div class="safety-grid">
        <div class="safety-badge">
          <span class="icon">🌿</span>
          <div class="badge-text">
            <strong>100% Breathable Cotton</strong>
            <span>Pre-washed natural organic fibers</span>
          </div>
        </div>
        <div class="safety-badge">
          <span class="icon">🌸</span>
          <div class="badge-text">
            <strong>Hypoallergenic Dyes</strong>
            <span>Certified non-toxic, gentle on infant skin</span>
          </div>
        </div>
        <div class="safety-badge">
          <span class="icon">🏷️</span>
          <div class="badge-text">
            <strong>Tagless Comfort</strong>
            <span>Zero-scratch heat-sealed labels</span>
          </div>
        </div>
        <div class="safety-badge">
          <span class="icon">🔒</span>
          <div class="badge-text">
            <strong>Nickel-Free Hardware</strong>
            <span>Safe rust-proof snaps & smooth zippers</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Highlights -->
    <section class="services-highlight">
      <div class="section-title">
        <h2>Our Core Tailoring Services</h2>
        <p>Every piece is uniquely measured, hand-cut, and detailed.</p>
      </div>

      <div class="service-grid">
        <div class="service-box">
          <img src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80" alt="Kids Ethnic Wear" />
          <div class="box-content">
            <h4>Kids Festive Lehengas & Kurta Sets</h4>
            <p>Traditional Indian patterns crafted with lightweight materials easy for children to move in.</p>
          </div>
        </div>

        <div class="service-box">
          <img src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80" alt="Women Tailoring" />
          <div class="box-content">
            <h4>Women's Designer Kurtis & Sarees</h4>
            <p>Precise necklines, padded blouses, and custom festive suits tailored to your comfort.</p>
          </div>
        </div>

        <div class="service-box">
          <img src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80" alt="Mom and Daughter Matching" />
          <div class="box-content">
            <h4>Mom & Daughter Matching Sets</h4>
            <p>Matching festival & photoshoot co-ords that make every occasion memorable.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Photo Reviews with Child Measurements -->
    <section class="reviews-section">
      <div class="section-title">
        <h2>Real Families, Exact Fits</h2>
        <p>Verified purchase reviews featuring child measurements for sizing confidence.</p>
      </div>

      <div class="reviews-grid">
        <div class="review-frame" *ngFor="let rev of photoReviews">
          <div class="photo-wrapper">
            <img [src]="rev.photo" [alt]="rev.productName" />
            <span class="verified-badge">✓ Verified Family</span>
          </div>
          <div class="review-content">
            <div class="measurements-pill">
              <span><strong>Age:</strong> {{ rev.age }}</span>
              <span><strong>Weight:</strong> {{ rev.weight }}</span>
              <span><strong>Height:</strong> {{ rev.height }}</span>
            </div>
            <h4>{{ rev.productName }}</h4>
            <p class="size-tag">Size Ordered: <strong>{{ rev.sizePurchased }}</strong></p>
            <p class="comment">"{{ rev.comment }}"</p>
            <span class="author">— {{ rev.author }}, {{ rev.city }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Visit & Google Maps Section -->
    <section class="location-section">
      <div class="loc-text">
        <h2>Visit Our Local Boutique</h2>
        <p>Feel the fabrics, view sample stitch books, or bring your children for custom measurements.</p>
        <div class="loc-box brand-accent-box">
          <p><strong>Shop Name:</strong> Krishiv Creation</p>
          <p><strong>Address:</strong> Shop No. 4, Ground Floor, Royal Market, Near Station Road, India</p>
          <p><strong>Opening Hours:</strong> 10:30 AM – 8:30 PM (Mon to Sat)</p>
          <p><strong>Instant Contact:</strong> +91 98765 43210</p>
        </div>
        <div class="mt-4">
          <a href="tel:+919876543210" class="btn-primary">Call Store Now</a>
        </div>
      </div>

      <div class="map-wrapper">
        <iframe
          title="Krishiv Creation Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14686.790938644383!2d72.571362!3d23.033863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000"
          width="100%"
          height="350"
          style="border:0; border-radius: 16px;"
          loading="lazy">
        </iframe>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      display: grid; grid-template-columns: 1.2fr 1fr; gap: 3rem; align-items: center;
      max-width: 1240px; margin: 2rem auto; padding: 3rem 1.5rem;
    }
    .cyber-badge-wrap { margin-bottom: 1.2rem; }
    .hero-tag {
      background: var(--marine-blue); color: var(--butter-yellow); padding: 0.45rem 1.1rem;
      border-radius: 999px; font-weight: 800; font-size: 0.74rem; letter-spacing: 0.12em;
      display: inline-block; border: 1px solid rgba(254, 234, 154, 0.2);
    }
    .hero-text h1 { font-size: 3.2rem; line-height: 1.12; margin-bottom: 1.2rem; color: var(--marine-blue); }
    .hero-text p { font-size: 1.1rem; color: #475569; margin-bottom: 2rem; max-width: 520px; line-height: 1.7; }
    .hero-btn-group { display: flex; gap: 1rem; flex-wrap: wrap; }

    /* 3D Floating Scene */
    .hero-3d-scene {
      position: relative;
      perspective: 1200px;
    }
    .hologram-glow {
      position: absolute; inset: 10%; background: radial-gradient(circle, rgba(254, 234, 154, 0.35) 0%, rgba(255, 26, 42, 0.15) 60%, transparent 80%);
      filter: blur(40px); z-index: 0; pointer-events: none;
    }
    .floating-card {
      position: relative; z-index: 1; border-radius: 28px; overflow: hidden;
      box-shadow: var(--shadow-3d); border: 2px solid rgba(255, 255, 255, 0.8);
      animation: float-slow 6s ease-in-out infinite;
      transform: rotateY(-6deg) rotateX(4deg);
      transition: transform 0.4s ease;
      &:hover { transform: rotateY(0deg) rotateX(0deg) scale(1.02); }
    }
    .hero-img { width: 100%; height: 460px; object-fit: cover; display: block; }
    .chip {
      position: absolute; z-index: 2; background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px); padding: 0.6rem 1.1rem; border-radius: 999px;
      font-size: 0.82rem; font-weight: 700; color: var(--dark); display: flex;
      align-items: center; gap: 0.5rem; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    }
    .chip-1 {
      top: 15px; right: -15px; border: 1px solid var(--butter-yellow);
      animation: float-reverse 5s ease-in-out infinite;
    }
    .chip-2 {
      bottom: 25px; left: -20px; border: 1px solid var(--bright-red);
      animation: float-slow 7s ease-in-out infinite;
    }
    .chip-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--bright-red); }

    .pillars {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;
      max-width: 1240px; margin: 3rem auto; padding: 0 1.5rem;
    }
    .pillar-card {
      background: var(--card-bg); backdrop-filter: blur(10px); padding: 2.2rem 2rem; border-radius: 20px;
      border: 1px solid var(--border-subtle); text-align: left;
      box-shadow: var(--shadow-subtle); transition: all 0.3s ease;
      &:hover { transform: translateY(-6px); border-color: var(--bright-red); box-shadow: var(--shadow-3d); }
    }
    .pillar-icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
    .pillar-card h3 { margin-bottom: 0.5rem; font-size: 1.2rem; }
    .pillar-card p { font-size: 0.9rem; color: #64748b; }
    .services-highlight { max-width: 1240px; margin: 4rem auto; padding: 0 1.5rem; }
    .section-title { text-align: center; margin-bottom: 2.5rem; }
    .section-title h2 { font-size: 2.2rem; }
    .section-title p { color: #64748b; font-size: 1rem; }
    .service-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
    .service-box {
      background: #fff; border-radius: 20px; overflow: hidden; border: 1px solid var(--border-subtle);
      box-shadow: var(--shadow-subtle); transition: all 0.3s ease;
      &:hover { transform: translateY(-6px); border-color: var(--bright-red); box-shadow: 0 12px 30px rgba(9, 26, 48, 0.1); }
      img { width: 100%; height: 220px; object-fit: cover; }
    }
    .box-content { padding: 1.5rem; }
    .box-content h4 { font-size: 1.2rem; margin-bottom: 0.5rem; }
    .box-content p { font-size: 0.9rem; color: #64748b; }
    .location-section {
      max-width: 1240px; margin: 4rem auto; padding: 2.5rem; background: #ffffff; border-radius: 24px;
      display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: center; border: 1px solid var(--border-subtle);
      box-shadow: var(--shadow-subtle);
    }
    .loc-box { margin-top: 1.2rem; background: #f8fafc; padding: 1.4rem; border-radius: 16px; font-size: 0.9rem; line-height: 1.8; }
    .brand-accent-box { border-left: 4px solid var(--marine-blue); }
    .mt-4 { margin-top: 1.5rem; }
    @media (max-width: 850px) {
      .hero-container { grid-template-columns: 1fr; }
      .hero-text h1 { font-size: 2.4rem; }
      .hero-img { height: 280px; }
      .location-section { grid-template-columns: 1fr; }
    }
  `]
})
export class HomeComponent {
  @Output() openQuoteModal = new EventEmitter<void>();

  selectedAge = 'All';
  ageGroups = ['All', '0-3M', '6-12M', '1-2Y', '2-4Y', '4-6Y'];
  parallaxTransform = 'rotateY(0deg) rotateX(0deg)';

  photoReviews = [
    {
      productName: 'Handblock Cotton Party Frock',
      photo: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80',
      age: '18 Months',
      weight: '11.5 kg',
      height: '82 cm',
      sizePurchased: '1-2Y',
      comment: 'The extra 2-inch internal seam margin allowed a perfect fit without feeling tight on her waist during playtime.',
      author: 'Pooja K.',
      city: 'Mumbai'
    },
    {
      productName: 'Chanderi Silk Festive Lehenga',
      photo: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80',
      age: '4.5 Years',
      weight: '17.2 kg',
      height: '106 cm',
      sizePurchased: '4-5Y',
      comment: 'Zero itchiness! The muslin lining felt like a soft cloud. She danced all evening without asking to change.',
      author: 'Ananya S.',
      city: 'Ahmedabad'
    },
    {
      productName: 'Mother & Daughter Royal Co-ord',
      photo: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=600&q=80',
      age: '3 Years (Child)',
      weight: '14.0 kg',
      height: '94 cm',
      sizePurchased: 'M (Mom) / 2-3Y (Kid)',
      comment: 'Super fast delivery and the color matching under festive lights was breathtaking. Truly bespoke luxury.',
      author: 'Neha R.',
      city: 'Bangalore'
    }
  ];

  constructor(public api: ApiService) {}

  onMouseMove(e: MouseEvent) {
    const { innerWidth, innerHeight } = window;
    const xFactor = (e.clientX / innerWidth - 0.5) * 16;
    const yFactor = (e.clientY / innerHeight - 0.5) * -16;
    this.parallaxTransform = `rotateY(${xFactor}deg) rotateX(${yFactor}deg)`;
  }

  setAgeFilter(age: string) {
    this.selectedAge = age;
  }

  handleQuoteClick() {
    this.openQuoteModal.emit();
    this.api.openQuoteModal();
  }
}
