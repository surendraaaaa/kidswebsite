import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  ageRange: string;
  category: string;
  badge?: 'new' | 'sale' | 'discount';
  rating?: number;
  reviewCount?: number;
}

interface Category {
  name: string;
  image: string;
  link: string;
  count?: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Sale Banner -->
    <div class="sale-banner">
      🎉 Grand Opening Sale! Get 20% Off on First Order - Use Code: WELCOME20 | <a href="/catalog">Shop Now →</a>
    </div>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1>Style & Comfort for Your Little Ones</h1>
        <p>Premium quality kids clothing with safe, breathable fabrics. Designed for play, made for comfort.</p>
        <div class="flex gap-2 justify-center mt-3">
          <button class="btn btn-primary" routerLink="/catalog">Shop Collection</button>
          <button class="btn btn-outline" routerLink="/about">Our Story</button>
        </div>
      </div>
    </section>

    <!-- Age Filter Chips -->
    <section class="section section--sm bg-white">
      <div class="container">
        <div class="age-chips">
          <div class="age-chip" routerLink="/catalog" [queryParams]="{age: '0-2Y'}">0-2 Years</div>
          <div class="age-chip" routerLink="/catalog" [queryParams]="{age: '3-5Y'}">3-5 Years</div>
          <div class="age-chip" routerLink="/catalog" [queryParams]="{age: '6-8Y'}">6-8 Years</div>
          <div class="age-chip" routerLink="/catalog" [queryParams]="{age: '9-11Y'}">9-11 Years</div>
          <div class="age-chip" routerLink="/catalog" [queryParams]="{age: '12-14Y'}">12-14 Years</div>
          <div class="age-chip" routerLink="/catalog" [queryParams]="{age: '15-17Y'}">15-17 Years</div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="section">
      <div class="container">
        <div class="section-title">
          <span class="section-title__subtitle">Browse By</span>
          <h2 class="section-title__title">Shop Categories</h2>
        </div>
        <div class="grid grid-3">
          <div class="category-card" *ngFor="let category of categories" [routerLink]="category.link">
            <img [src]="category.image" [alt]="category.name" class="category-card__image">
            <div class="category-card__overlay"></div>
            <div class="category-card__content">
              <h3 class="category-card__title">{{ category.name }}</h3>
              <p class="text-muted">{{ category.count }} Products</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- New Arrivals -->
    <section class="section bg-white">
      <div class="container">
        <div class="section-title">
          <span class="section-title__subtitle">Fresh Styles</span>
          <h2 class="section-title__title">New Arrivals</h2>
        </div>
        <div class="grid grid-4">
          <div class="product-card" *ngFor="let product of newProducts">
            <div class="product-card__image-container">
              <img [src]="product.image" [alt]="product.name" class="product-card__image">
              <div class="product-card__badges">
                <span class="badge badge-new" *ngIf="product.badge === 'new'">New</span>
                <span class="badge badge-sale" *ngIf="product.badge === 'sale'">Sale</span>
                <span class="badge badge-discount" *ngIf="product.badge === 'discount'">-20%</span>
              </div>
            </div>
            <div class="product-card__content">
              <p class="product-card__category">{{ product.category }}</p>
              <h3 class="product-card__title">{{ product.name }}</h3>
              <p class="text-muted mb-1">{{ product.ageRange }}</p>
              <div class="flex items-center gap-2">
                <span class="product-card__price">₹{{ product.price }}</span>
                <span class="product-card__price--original" *ngIf="product.originalPrice">₹{{ product.originalPrice }}</span>
              </div>
            </div>
            <div class="product-card__actions">
              <button class="btn btn-primary" style="width: 100%;">Add to Cart</button>
            </div>
          </div>
        </div>
        <div class="text-center mt-3">
          <button class="btn btn-outline btn-lg" routerLink="/catalog">View All Products</button>
        </div>
      </div>
    </section>

    <!-- Sale & Clearance -->
    <section class="section">
      <div class="container">
        <div class="section-title">
          <span class="section-title__subtitle">Limited Stock</span>
          <h2 class="section-title__title">Sale & Clearance</h2>
        </div>
        <div class="grid grid-4">
          <div class="product-card" *ngFor="let product of saleProducts">
            <div class="product-card__image-container">
              <img [src]="product.image" [alt]="product.name" class="product-card__image">
              <div class="product-card__badges">
                <span class="badge badge-sale">Sale</span>
                <span class="badge badge-discount">-{{ getDiscountPercent(product) }}%</span>
              </div>
            </div>
            <div class="product-card__content">
              <p class="product-card__category">{{ product.category }}</p>
              <h3 class="product-card__title">{{ product.name }}</h3>
              <p class="text-muted mb-1">{{ product.ageRange }}</p>
              <div class="flex items-center gap-2">
                <span class="product-card__price text-danger">₹{{ product.price }}</span>
                <span class="product-card__price--original">₹{{ product.originalPrice }}</span>
              </div>
            </div>
            <div class="product-card__actions">
              <button class="btn btn-primary" style="width: 100%;">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Section -->
    <section class="trust-section">
      <div class="container">
        <div class="trust-section__grid">
          <div class="trust-section__item">
            <svg class="trust-section__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <h4 class="trust-section__title">100% Secure Checkout</h4>
            <p class="trust-section__description">PCI DSS compliant with Razorpay</p>
          </div>
          <div class="trust-section__item">
            <svg class="trust-section__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
            <h4 class="trust-section__title">Free Shipping</h4>
            <p class="trust-section__description">On orders above ₹499</p>
          </div>
          <div class="trust-section__item">
            <svg class="trust-section__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <h4 class="trust-section__title">Easy Returns</h4>
            <p class="trust-section__description">30-day hassle-free returns</p>
          </div>
          <div class="trust-section__item">
            <svg class="trust-section__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h4 class="trust-section__title">Safe Materials</h4>
            <p class="trust-section__description">Hypoallergenic, kid-safe fabrics</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  categories: Category[] = [
    { name: 'Baby (0-2Y)', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600', link: '/catalog', count: 156 },
    { name: 'Kids (3-8Y)', image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600', link: '/catalog', count: 243 },
    { name: 'Teens (9-17Y)', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600', link: '/catalog', count: 189 }
  ];

  newProducts: Product[] = [
    { id: 1, name: 'Cotton Onesie Set (3-Pack)', price: 899, originalPrice: 1199, image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400', ageRange: '0-2 Years', category: 'Baby Wear', badge: 'new', rating: 4.8 },
    { id: 2, name: 'Playful Dinosaur T-Shirt', price: 549, image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400', ageRange: '3-5 Years', category: 'Tops', badge: 'new', rating: 4.6 },
    { id: 3, name: 'Denim Overalls', price: 1299, image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400', ageRange: '6-8 Years', category: 'Bottoms', badge: 'discount', rating: 4.7 },
    { id: 4, name: 'Rainbow Hoodie', price: 999, image: 'https://images.unsplash.com/photo-1519238809107-ee8992a1931c?w=400', ageRange: '9-11 Years', category: 'Outerwear', badge: 'new', rating: 4.9 }
  ];

  saleProducts: Product[] = [
    { id: 5, name: 'Summer Dress Collection', price: 799, originalPrice: 1499, image: 'https://images.unsplash.com/photo-1621451537084-482c730a5a68?w=400', ageRange: '3-5 Years', category: 'Dresses', badge: 'sale' },
    { id: 6, name: 'Sports Jersey Set', price: 649, originalPrice: 1099, image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400', ageRange: '6-8 Years', category: 'Activewear', badge: 'sale' },
    { id: 7, name: 'Winter Jacket', price: 1599, originalPrice: 2499, image: 'https://images.unsplash.com/photo-1608234807905-4466023792f5?w=400', ageRange: '9-11 Years', category: 'Outerwear', badge: 'sale' },
    { id: 8, name: 'Formal Shirt & Tie', price: 899, originalPrice: 1399, image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400', ageRange: '12-14 Years', category: 'Formal', badge: 'sale' }
  ];

  constructor() {}

  ngOnInit(): void {}

  getDiscountPercent(product: Product): number {
    if (product.originalPrice && product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  }
}
