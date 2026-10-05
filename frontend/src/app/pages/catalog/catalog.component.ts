import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  ageRange: string;
  category: string;
  badge?: 'new' | 'sale' | 'discount';
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
}

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Catalog Header -->
    <section class="section bg-white">
      <div class="container">
        <h1 class="text-center mb-2">Shop All Products</h1>
        
        <!-- Filters Bar -->
        <div class="flex items-center justify-between gap-3 mb-3" style="flex-wrap: wrap;">
          <!-- Age Filter -->
          <div class="age-chips">
            <div class="age-chip" [class.active]="selectedAge === 'all'" (click)="filterByAge('all')">All Ages</div>
            <div class="age-chip" [class.active]="selectedAge === '0-2Y'" (click)="filterByAge('0-2Y')">0-2 Years</div>
            <div class="age-chip" [class.active]="selectedAge === '3-5Y'" (click)="filterByAge('3-5Y')">3-5 Years</div>
            <div class="age-chip" [class.active]="selectedAge === '6-8Y'" (click)="filterByAge('6-8Y')">6-8 Years</div>
            <div class="age-chip" [class.active]="selectedAge === '9-11Y'" (click)="filterByAge('9-11Y')">9-11 Years</div>
            <div class="age-chip" [class.active]="selectedAge === '12-14Y'" (click)="filterByAge('12-14Y')">12-14 Years</div>
            <div class="age-chip" [class.active]="selectedAge === '15-17Y'" (click)="filterByAge('15-17Y')">15-17 Years</div>
          </div>
          
          <!-- Sort & View -->
          <div class="flex gap-2 items-center">
            <select class="btn btn-outline" style="padding: 0.5rem 1rem;">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
              <option>Best Selling</option>
            </select>
          </div>
        </div>
        
        <!-- Results Count -->
        <p class="text-muted">Showing {{ filteredProducts.length }} of {{ products.length }} products</p>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="section">
      <div class="container">
        <div class="grid grid-4">
          <div class="product-card" *ngFor="let product of filteredProducts">
            <div class="product-card__image-container">
              <img [src]="product.image" [alt]="product.name" class="product-card__image">
              <div class="product-card__badges">
                <span class="badge badge-new" *ngIf="product.badge === 'new'">New</span>
                <span class="badge badge-sale" *ngIf="product.badge === 'sale'">Sale</span>
                <span class="badge badge-discount" *ngIf="product.badge === 'discount'">-20%</span>
                <span class="badge badge-sale" *ngIf="!product.inStock" style="background: #6B7280;">Out of Stock</span>
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
              <div class="flex items-center gap-1 mt-1" *ngIf="product.rating">
                <span style="color: #FBBF24;">★</span>
                <span class="text-muted" style="font-size: 0.875rem;">{{ product.rating }} ({{ product.reviewCount }})</span>
              </div>
            </div>
            <div class="product-card__actions">
              <button class="btn btn-primary" style="width: 100%;" [disabled]="!product.inStock">
                {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div class="text-center mt-4" *ngIf="filteredProducts.length === 0">
          <h3 class="mb-2">No products found</h3>
          <p class="text-muted mb-3">Try adjusting your filters or browse all products</p>
          <button class="btn btn-outline" (click)="filterByAge('all')">Clear Filters</button>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class CatalogComponent implements OnInit {
  selectedAge: string = 'all';
  
  products: Product[] = [
    { id: 1, name: 'Cotton Onesie Set (3-Pack)', price: 899, originalPrice: 1199, image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400', ageRange: '0-2 Years', category: 'Baby Wear', badge: 'new', rating: 4.8, reviewCount: 124, inStock: true },
    { id: 2, name: 'Playful Dinosaur T-Shirt', price: 549, image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400', ageRange: '3-5 Years', category: 'Tops', badge: 'new', rating: 4.6, reviewCount: 89, inStock: true },
    { id: 3, name: 'Denim Overalls', price: 1299, image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400', ageRange: '6-8 Years', category: 'Bottoms', badge: 'discount', rating: 4.7, reviewCount: 156, inStock: true },
    { id: 4, name: 'Rainbow Hoodie', price: 999, image: 'https://images.unsplash.com/photo-1519238809107-ee8992a1931c?w=400', ageRange: '9-11 Years', category: 'Outerwear', badge: 'new', rating: 4.9, reviewCount: 201, inStock: true },
    { id: 5, name: 'Summer Dress Collection', price: 799, originalPrice: 1499, image: 'https://images.unsplash.com/photo-1621451537084-482c730a5a68?w=400', ageRange: '3-5 Years', category: 'Dresses', badge: 'sale', rating: 4.5, reviewCount: 78, inStock: true },
    { id: 6, name: 'Sports Jersey Set', price: 649, originalPrice: 1099, image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400', ageRange: '6-8 Years', category: 'Activewear', badge: 'sale', rating: 4.4, reviewCount: 92, inStock: true },
    { id: 7, name: 'Winter Jacket', price: 1599, originalPrice: 2499, image: 'https://images.unsplash.com/photo-1608234807905-4466023792f5?w=400', ageRange: '9-11 Years', category: 'Outerwear', badge: 'sale', rating: 4.8, reviewCount: 167, inStock: true },
    { id: 8, name: 'Formal Shirt & Tie', price: 899, originalPrice: 1399, image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400', ageRange: '12-14 Years', category: 'Formal', badge: 'sale', rating: 4.6, reviewCount: 54, inStock: true },
    { id: 9, name: 'Casual Jeans', price: 1099, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400', ageRange: '12-14 Years', category: 'Bottoms', rating: 4.7, reviewCount: 143, inStock: true },
    { id: 10, name: 'Graphic Tee', price: 449, image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400', ageRange: '15-17 Years', category: 'Tops', rating: 4.5, reviewCount: 87, inStock: true },
    { id: 11, name: 'Baby Romper', price: 599, image: 'https://images.unsplash.com/photo-1555529733-0e670560f7e1?w=400', ageRange: '0-2 Years', category: 'Baby Wear', rating: 4.9, reviewCount: 234, inStock: true },
    { id: 12, name: 'Kids Sneakers', price: 1299, image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400', ageRange: '6-8 Years', category: 'Footwear', rating: 4.6, reviewCount: 112, inStock: true }
  ];

  filteredProducts: Product[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['age']) {
        this.filterByAge(params['age']);
      } else {
        this.filteredProducts = this.products;
      }
    });
  }

  filterByAge(age: string): void {
    this.selectedAge = age;
    if (age === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.ageRange.includes(age.replace('Y', ' Years')));
    }
  }
}
