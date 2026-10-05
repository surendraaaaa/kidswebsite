import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail', standalone: true, imports: [CommonModule],
  template: `
    <section class="product-page">
      <div class="product-grid">
        <div class="media-col">
          <div class="main-image-wrap">
            <img class="main-image" [src]="selected" [alt]="product.name">
          </div>
          <div class="thumbs">
            <button *ngFor="let img of product.images; let i=index" class="thumb" [class.active]="selected===img" (click)="selected=img"><img [src]="img" [alt]="product.name"></button>
          </div>
        </div>
        <div class="info-col">
          <p class="cat">{{product.category}}</p>
          <h1>{{product.name}}</h1>
          <div class="rating"><span class="stars">{{'★'.repeat(Math.floor(product.rating))}}{{'☆'.repeat(5-Math.floor(product.rating))}}</span><span class="count">{{product.reviewCount}} reviews</span></div>
          <div class="price-block"><span class="price">₹{{product.price}}</span><span class="was" *ngIf="product.originalPrice">₹{{product.originalPrice}}</span><span class="disc" *ngIf="product.originalPrice">-{{disc}}%</span></div>
          <p class="age"><span class="pill">{{product.ageRange}}</span></p>
          <div class="block"><p class="label">Size</p><div class="sizes"><button *ngFor="let s of sizes" class="size" [class.active]="size===s" (click)="size=s">{{s}}</button></div></div>
          <div class="block"><p class="label">Quantity</p><div class="qty"><button class="qty-btn" (click)="qty=qty>1?qty-1:1">−</button><span class="qty-val">{{qty}}</span><button class="qty-btn" (click)="qty=qty+1">+</button></div></div>
          <button class="add-cart">Add to cart — ₹{{product.price*qty}}</button>
          <div class="trust"><div class="t"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#123653" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><span>Secure checkout</span></div><div class="t"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#123653" stroke-width="2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg><span>Free shipping over ₹499</span></div><div class="t"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#123653" stroke-width="2"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg><span>Easy 30-day returns</span></div></div>
          <div class="details"><h3>Details</h3><ul><li>100% premium cotton — breathable & soft</li><li>Hypoallergenic dyes — safe for sensitive skin</li><li>Tagless design — no irritation</li><li>Nickel-free snaps — allergy-free</li><li>Machine washable — easy care</li></ul></div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .product-page{max-width:1400px;margin:auto;padding:48px 48px 80px}.product-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:48px;align-items:start}@media(max-width:1000px){.product-grid{grid-template-columns:1fr;gap:28px}.product-page{padding:32px 20px 40px}}.main-image-wrap{background:#f7f9fb;border-radius:12px;overflow:hidden;box-shadow:0 18px 40px #1236530d}.main-image{width:100%;height:auto;display:block;transition:transform .35s}.main-image-wrap:hover .main-image{transform:scale(1.04)}.thumbs{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:14px}.thumb{border:2px solid transparent;border-radius:8px;overflow:hidden;background:#f7f9fb;cursor:pointer;padding:0}.thumb.active{border-color:#123653}.thumb img{width:100%;height:90px;object-fit:cover;display:block}.cat{font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 10px}.product-page h1{font-size:clamp(26px,3vw,38px);letter-spacing:-1px;color:#123653;margin:0 0 10px}.rating{display:flex;align-items:center;gap:8px;margin-bottom:14px}.stars{color:#f59e0b;font-size:16px}.count{font-size:12px;color:#6b7280}.price-block{display:flex;align-items:baseline;gap:10px;margin-bottom:12px}.price{font-size:28px;font-weight:800;color:#123653}.was{font-size:16px;color:#9aa5b1;text-decoration:line-through}.disc{background:#10b981;color:#fff;font-size:11px;font-weight:800;padding:3px 8px;border-radius:999px}.pill{display:inline-block;background:#f0f4f8;color:#123653;font-size:12px;font-weight:700;padding:6px 10px;border-radius:999px}.block{margin:18px 0}.label{font-size:12px;color:#6b7280;margin:0 0 8px}.sizes{display:flex;gap:8px;flex-wrap:wrap}.size{background:#fff;border:1px solid #d9e2ea;color:#123653;padding:8px 12px;border-radius:6px;font-size:13px;font-weight:700;cursor:pointer}.size:hover{border-color:#123653}.size.active{background:#123653;color:#fff;border-color:#123653}.qty{display:inline-flex;align-items:center;border:1px solid #d9e2ea;border-radius:6px;overflow:hidden}.qty-btn{background:#f7f9fb;border:0;width:36px;height:36px;font-size:18px;font-weight:800;cursor:pointer;color:#123653}.qty-val{min-width:28px;text-align:center;font-weight:700}.add-cart{width:100%;background:#123653;color:#fff;border:0;padding:14px 18px;border-radius:8px;font-size:14px;font-weight:800;cursor:pointer;margin:18px 0 14px}.add-cart:hover{background:#0f2a42}.trust{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:18px 0}.t{display:flex;align-items:center;gap:8px;font-size:12px;color:#4a6071}.details h3{font-size:16px;color:#123653;margin:0 0 10px}.details ul{margin:0;padding-left:18px;color:#4a6071;line-height:1.7;font-size:14px}
  `]
})
export class ProductDetailComponent implements OnInit {
  selected = '';
  size = '3-4Y';
  qty = 1;
  sizes = ['2-3Y','3-4Y','4-5Y','5-6Y','6-7Y','7-8Y'];
  product = {
    id: 1, name: 'Cotton Onesie Set (3-Pack)', price: 899, originalPrice: 1199,
    category: 'Baby Wear', ageRange: '0–2 Years', rating: 4.8, reviewCount: 124,
    images: [
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=900',
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=900',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=900',
      'https://images.unsplash.com/photo-1519238809107-ee8992a1931c?w=900'
    ]
  };
  disc = 0;
  constructor(private route: ActivatedRoute){}
  ngOnInit(){ this.selected = this.product.images[0]; this.disc = Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100); }
  Math = Math;
}
