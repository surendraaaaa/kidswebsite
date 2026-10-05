import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Product } from '../../services/api.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="catalog-page">
      <div class="catalog-header">
        <h1>Kids &amp; Family Collection</h1>
        <p>Designed with generous seam margins and 100% skin-safe cotton linings.</p>

        <!-- Filter Pills -->
        <div class="filter-pills">
          <button [class.active]="selectedCat === ''" (click)="filterCat('')">All Designs</button>
          <button [class.active]="selectedCat === 'kids'" (click)="filterCat('kids')">Kids Outfits</button>
          <button [class.active]="selectedCat === 'women'" (click)="filterCat('women')">Women's Ethnic</button>
          <button [class.active]="selectedCat === 'festive-matching'" (click)="filterCat('festive-matching')">Mom & Kid Sets</button>
        </div>
      </div>

      <!-- 4 Columns on Desktop, 2 Columns on Mobile -->
      <div class="products-grid">
        <div class="product-card" *ngFor="let prod of filteredProducts">
          <div class="image-box">
            <img [src]="prod.image_url" [alt]="prod.name" class="prod-img" loading="lazy" />
            <span class="badge-age">Age 0–8Y</span>
          </div>

          <div class="card-details">
            <div class="card-meta">
              <span class="category-tag">{{ prod.category | uppercase }}</span>
              <span class="fabric-tag">100% Cotton</span>
            </div>
            <h3>{{ prod.name }}</h3>
            <p class="desc">{{ prod.description }}</p>
            <div class="card-bottom">
              <span class="price">₹{{ prod.price }}</span>
              <button class="btn-primary add-btn" (click)="addToCart(prod)">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .catalog-page { max-width: 1240px; margin: 2rem auto; padding: 0 1.5rem; }
    .catalog-header { text-align: center; margin-bottom: 2.5rem; }
    .catalog-header h1 { font-size: 2.4rem; color: var(--marine-blue); margin-bottom: 0.3rem; }
    .catalog-header p { color: #666666; font-size: 0.95rem; }
    .filter-pills { display: flex; justify-content: center; gap: 0.5rem; margin-top: 1.2rem; flex-wrap: wrap; }
    .filter-pills button {
      background: #ffffff; border: 1px solid var(--border-gray); padding: 0.45rem 1.1rem;
      border-radius: var(--radius-sm); font-weight: 600; font-size: 0.82rem; cursor: pointer;
      color: var(--marine-blue); transition: all 0.15s ease;
      &.active, &:hover { background: var(--marine-blue); color: #ffffff; border-color: var(--marine-blue); }
    }
    /* 4 columns desktop / 2 columns mobile */
    .products-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;
    }
    .product-card {
      background: #ffffff; border: 1px solid var(--border-gray); border-radius: var(--radius-md);
      overflow: hidden; display: flex; flex-direction: column;
    }
    .image-box { position: relative; height: 260px; background: #f9f9f9; }
    .prod-img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .badge-age {
      position: absolute; bottom: 8px; left: 8px; background: var(--butter-yellow);
      color: var(--marine-blue); font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.5rem;
      border-radius: var(--radius-sm);
    }
    .card-details { padding: 1.1rem; display: flex; flex-direction: column; flex-grow: 1; }
    .card-meta { display: flex; justify-content: space-between; margin-bottom: 0.3rem; }
    .category-tag { font-size: 0.68rem; font-weight: 800; color: var(--marine-blue); }
    .fabric-tag { font-size: 0.68rem; color: #666666; }
    .card-details h3 { font-size: 1.05rem; margin-bottom: 0.3rem; color: var(--marine-blue); }
    .desc { font-size: 0.82rem; color: #666666; margin-bottom: 0.9rem; flex-grow: 1; }
    .card-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
    .price { font-size: 1.15rem; font-weight: 800; color: var(--marine-blue); }
    .add-btn { padding: 0.5rem 0.9rem; font-size: 0.82rem; }

    @media (max-width: 850px) {
      .products-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
      .image-box { height: 190px; }
    }
  `]
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCat = '';

  // Interactive Stage & 360° scrubbing state
  activeZoomId: number | null = null;
  zoomX = 0;
  zoomY = 0;
  lensBgPos = '0% 0%';
  selectedAngleMap: Record<number, number> = {};

  readonly angleViews = [
    { label: '0° Front', suffix: '' },
    { label: '45° Angle', suffix: '&fit=crop&crop=faces' },
    { label: 'Macro Texture', suffix: '&fit=crop&crop=bottom' },
    { label: '180° Back', suffix: '&fit=crop&crop=top' }
  ];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      error: () => {
        // Fallback demo data
        this.products = [
          {
            id: 1,
            name: 'Kids Embroidered Silk Lehenga',
            category: 'kids',
            price: 1499,
            stock: 15,
            image_url: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80',
            description: 'Pure chanderi silk lehenga with hand-embroidered border for ages 2-10.'
          },
          {
            id: 2,
            name: 'Mom & Daughter Festive Co-ord Set',
            category: 'festive-matching',
            price: 3499,
            stock: 8,
            image_url: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=600&q=80',
            description: 'Coordinated peach georgette anarkali set for celebrations and family portraits.'
          },
          {
            id: 3,
            name: 'Floral Handblock Pure Cotton Frock',
            category: 'kids',
            price: 899,
            stock: 25,
            image_url: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80',
            description: 'Skin-friendly organic cotton frock with natural vegetable dyes for all-day play.'
          },
          {
            id: 4,
            name: 'Designer Georgette Straight Kurti',
            category: 'women',
            price: 1899,
            stock: 12,
            image_url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
            description: 'Elegant mirror-work detailing with premium cotton lining, tailored for festive gatherings.'
          }
        ];
        this.filteredProducts = this.products;
      }
    });
  }

  filterCat(cat: string) {
    this.selectedCat = cat;
    if (!cat) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.category === cat);
    }
  }

  onMouseMove(event: MouseEvent, prodId: number) {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.activeZoomId = prodId;
    this.zoomX = event.clientX - rect.left;
    this.zoomY = event.clientY - rect.top;

    const xPercent = (this.zoomX / rect.width) * 100;
    const yPercent = (this.zoomY / rect.height) * 100;
    this.lensBgPos = `${xPercent}% ${yPercent}%`;
  }

  onMouseLeave(prodId: number) {
    if (this.activeZoomId === prodId) {
      this.activeZoomId = null;
    }
  }

  setActiveAngle(prodId: number, index: number) {
    this.selectedAngleMap[prodId] = index;
  }

  getActiveIndex(prodId: number): number {
    return this.selectedAngleMap[prodId] || 0;
  }

  getActiveImage(prod: Product): string {
    const idx = this.getActiveIndex(prod.id);
    return prod.image_url + this.angleViews[idx].suffix;
  }

  getActiveAngleLabel(prodId: number): string {
    return this.angleViews[this.getActiveIndex(prodId)].label;
  }

  addToCart(prod: Product) {
    this.api.addToCart(prod);
    alert(`Added "${prod.name}" to your cart!`);
  }
}
