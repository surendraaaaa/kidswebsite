import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  ageRange: string;
  category: string;
  badge?: 'new' | 'sale' | 'discount';
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

@Component({
  selector: 'app-catalog', standalone: true, imports: [CommonModule, RouterLink],
  template: `
    <section class="catalog">
      <div class="catalog-head">
        <div><p class="eyebrow">THE COLLECTION</p><h1>Everything they'll love</h1></div>
        <div class="filters-bar">
          <div class="age-chips">
            <button class="age-chip" [class.active]="age==='all'" (click)="setAge('all')">All</button>
            <button class="age-chip" [class.active]="age==='0-2Y'" (click)="setAge('0-2Y')">0–2Y</button>
            <button class="age-chip" [class.active]="age==='3-5Y'" (click)="setAge('3-5Y')">3–5Y</button>
            <button class="age-chip" [class.active]="age==='6-8Y'" (click)="setAge('6-8Y')">6–8Y</button>
            <button class="age-chip" [class.active]="age==='9-11Y'" (click)="setAge('9-11Y')">9–11Y</button>
            <button class="age-chip" [class.active]="age==='12-14Y'" (click)="setAge('12-14Y')">12–14Y</button>
            <button class="age-chip" [class.active]="age==='15-17Y'" (click)="setAge('15-17Y')">15–17Y</button>
          </div>
          <select class="sort" (change)="setSort($event)"><option value="featured">Sort: Featured</option><option value="price-asc">Price: Low → High</option><option value="price-desc">Price: High → Low</option><option value="newest">Newest</option></select>
        </div>
        <p class="results">Showing {{filtered.length}} of {{products.length}} items</p>
      </div>
      <div class="product-grid">
        <div class="product-card" *ngFor="let p of filtered" [class.out]="!p.inStock">
          <a [routerLink]="['/product', p.id]" class="card-media">
            <div class="media-wrap">
              <img class="img-main" [src]="p.images[0]" [alt]="p.name">
              <img class="img-hover" [src]="p.images[1]||p.images[0]" [alt]="p.name">
            </div>
            <div class="badges">
              <span class="badge" *ngIf="p.badge==='new'">New</span>
              <span class="badge sale" *ngIf="p.badge==='sale'">Sale</span>
              <span class="badge disc" *ngIf="p.badge==='discount'">-20%</span>
              <span class="badge out" *ngIf="!p.inStock">Out</span>
            </div>
          </a>
          <div class="card-body">
            <p class="cat">{{p.category}}</p>
            <a [routerLink]="['/product', p.id]" class="name">{{p.name}}</a>
            <p class="age">{{p.ageRange}}</p>
            <div class="price-row"><span class="price">₹{{p.price}}</span><span class="was" *ngIf="p.originalPrice">₹{{p.originalPrice}}</span></div>
            <div class="meta"><span class="stars">{{'★'.repeat(Math.floor(p.rating))}}{{'☆'.repeat(5-Math.floor(p.rating))}}</span><span class="count">{{p.reviewCount}}</span></div>
          </div>
        </div>
      </div>
      <div class="empty" *ngIf="!filtered.length"><h3>No matches</h3><p>Try a different age or clear filters.</p><button class="btn" (click)="setAge('all')">Clear filters</button></div>
    </section>
  `,
  styles: [`
    .catalog{max-width:1500px;margin:auto;padding:48px 48px 80px}.catalog-head{margin-bottom:32px}.eyebrow{font-size:11px;letter-spacing:2px;font-weight:700;color:#123653;margin:0 0 14px}.catalog h1{font-size:clamp(32px,4vw,52px);letter-spacing:-2px;color:#123653;margin:0 0 24px}.filters-bar{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:14px}.age-chips{display:flex;gap:8px;flex-wrap:wrap}.age-chip{background:#f0f4f8;border:1px solid #d9e2ea;color:#123653;padding:8px 14px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;transition:all .2s}.age-chip:hover{border-color:#123653}.age-chip.active{background:#123653;color:#fff;border-color:#123653}.sort{background:#fff;border:1px solid #d9e2ea;border-radius:6px;padding:8px 12px;font-size:12px}.results{font-size:12px;color:#6b7280}.product-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}@media(max-width:1100px){.product-grid{grid-template-columns:repeat(3,1fr)}}@media(max-width:700px){.product-grid{grid-template-columns:repeat(2,1fr)}.catalog{padding:32px 20px 40px}.filters-bar{flex-direction:column;align-items:stretch}}.product-card{background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 8px 20px #12365308;transition:transform .25s,box-shadow .25s;position:relative}.product-card:hover{transform:translateY(-6px);box-shadow:0 18px 36px #12365314}.product-card.out{opacity:.7}.card-media{display:block;position:relative;overflow:hidden}.media-wrap{position:relative;padding-top:125%}.media-wrap img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:opacity .35s}.img-hover{opacity:0}.card-media:hover .img-hover{opacity:1}.badges{position:absolute;top:10px;left:10px;display:flex;flex-direction:column;gap:6px}.badge{background:#123653;color:#fff;font-size:10px;font-weight:800;padding:5px 9px;border-radius:999px;letter-spacing:.5px}.badge.sale{background:#e52b38}.badge.disc{background:#10b981}.badge.out{background:#6b7280}.card-body{padding:14px}.cat{font-size:10px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px}.name{font-size:14px;font-weight:700;color:#123653;text-decoration:none;display:block;margin:0 0 6px;line-height:1.3}.age{font-size:11px;color:#6b7280;margin:0 0 10px}.price-row{display:flex;align-items:baseline;gap:8px;margin-bottom:8px}.price{font-size:16px;font-weight:800;color:#123653}.was{font-size:12px;color:#9aa5b1;text-decoration:line-through}.meta{display:flex;align-items:center;gap:6px;font-size:11px}.stars{color:#f59e0b}.count{color:#6b7280}.empty{text-align:center;padding:60px 20px}.empty h3{font-size:22px;color:#123653;margin:0 0 8px}.empty p{color:#6b7280;margin:0 0 18px}.btn{background:#123653;color:#fff;border:0;padding:10px 18px;border-radius:6px;font-weight:700;cursor:pointer}
  `]
})
export class CatalogComponent implements OnInit {
  age = 'all';
  sort = 'featured';
  products: Product[] = [
    {id:1,name:'Cotton Onesie Set (3-Pack)',price:899,originalPrice:1199,image:'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600',images:['https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600','https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=600'],ageRange:'0–2 Years',category:'Baby Wear',badge:'new',rating:4.8,reviewCount:124,inStock:true},
    {id:2,name:'Playful Dinosaur T-Shirt',price:549,image:'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=600',images:['https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=600','https://images.unsplash.com/photo-1519238809107-ee8992a1931c?w=600'],ageRange:'3–5 Years',category:'Tops',badge:'new',rating:4.6,reviewCount:89,inStock:true},
    {id:3,name:'Denim Overalls',price:1299,image:'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600',images:['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600','https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600'],ageRange:'6–8 Years',category:'Bottoms',badge:'discount',rating:4.7,reviewCount:156,inStock:true},
    {id:4,name:'Rainbow Hoodie',price:999,image:'https://images.unsplash.com/photo-1519238809107-ee8992a1931c?w=600',images:['https://images.unsplash.com/photo-1519238809107-ee8992a1931c?w=600','https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600'],ageRange:'9–11 Years',category:'Outerwear',badge:'new',rating:4.9,reviewCount:201,inStock:true},
    {id:5,name:'Summer Dress',price:799,originalPrice:1499,image:'https://images.unsplash.com/photo-1621451537084-482c730a5a68?w=600',images:['https://images.unsplash.com/photo-1621451537084-482c730a5a68?w=600','https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600'],ageRange:'3–5 Years',category:'Dresses',badge:'sale',rating:4.5,reviewCount:78,inStock:true},
    {id:6,name:'Sports Jersey Set',price:649,originalPrice:1099,image:'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600',images:['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600','https://images.unsplash.com/photo-1519238809107-ee8992a1931c?w=600'],ageRange:'6–8 Years',category:'Activewear',badge:'sale',rating:4.4,reviewCount:92,inStock:true},
    {id:7,name:'Winter Jacket',price:1599,originalPrice:2499,image:'https://images.unsplash.com/photo-1608234807905-4466023792f5?w=600',images:['https://images.unsplash.com/photo-1608234807905-4466023792f5?w=600','https://images.unsplash.com/photo-1519238809107-ee8992a1931c?w=600'],ageRange:'9–11 Years',category:'Outerwear',badge:'sale',rating:4.8,reviewCount:167,inStock:true},
    {id:8,name:'Formal Shirt & Tie',price:899,originalPrice:1399,image:'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600',images:['https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600','https://images.unsplash.com/photo-1519238809107-ee8992a1931c?w=600'],ageRange:'12–14 Years',category:'Formal',badge:'sale',rating:4.6,reviewCount:54,inStock:true},
    {id:9,name:'Casual Jeans',price:1099,image:'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600',images:['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600','https://images.unsplash.com/photo-1519238809107-ee8992a1931c?w=600'],ageRange:'12–14 Years',category:'Bottoms',rating:4.7,reviewCount:143,inStock:true},
    {id:10,name:'Graphic Tee',price:449,image:'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600',images:['https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600','https://images.unsplash.com/photo-1519238809107-ee8992a1931c?w=600'],ageRange:'15–17 Years',category:'Tops',rating:4.5,reviewCount:87,inStock:true},
    {id:11,name:'Baby Romper',price:599,image:'https://images.unsplash.com/photo-1555529733-0e670560f7e1?w=600',images:['https://images.unsplash.com/photo-1555529733-0e670560f7e1?w=600','https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600'],ageRange:'0–2 Years',category:'Baby Wear',rating:4.9,reviewCount:234,inStock:true},
    {id:12,name:'Kids Sneakers',price:1299,image:'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600',images:['https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600','https://images.unsplash.com/photo-1519238809107-ee8992a1931c?w=600'],ageRange:'6–8 Years',category:'Footwear',rating:4.6,reviewCount:112,inStock:true}
  ];
  filtered: Product[] = [];
  constructor(private route: ActivatedRoute){}
  ngOnInit(){ this.route.queryParams.subscribe(p=>{ if(p['age']) this.setAge(p['age']); else this.apply(); }); }
  setAge(a:string){ this.age=a; this.apply(); }
  setSort(e:Event){ this.sort=(e.target as HTMLSelectElement).value; this.apply(); }
  apply(){
    let list=[...this.products];
    if(this.age!=='all') list=list.filter(p=>p.ageRange.includes(this.age.replace('Y','')));
    if(this.sort==='price-asc') list.sort((a,b)=>a.price-b.price);
    if(this.sort==='price-desc') list.sort((a,b)=>b.price-a.price);
    if(this.sort==='newest') list=list.reverse();
    this.filtered=list;
  }
  Math=Math;
}
