import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface CartItem {
  id: number; name: string; price: number; image: string; size: string; qty: number;
}

@Component({
  selector: 'app-cart', standalone: true, imports: [CommonModule, RouterLink],
  template: `
    <section class="cart-page">
      <div class="cart-head"><p class="eyebrow">YOUR BAG</p><h1>Let's make it official</h1></div>
      <div class="cart-layout">
        <div class="cart-items">
          <div class="cart-row" *ngFor="let item of items">
            <img class="item-img" [src]="item.image" [alt]="item.name">
            <div class="item-info">
              <p class="item-name">{{item.name}}</p>
              <p class="item-meta">Size: {{item.size}}</p>
              <p class="item-price">₹{{item.price}}</p>
            </div>
            <div class="item-qty">
              <button class="mini" (click)="item.qty=item.qty>1?item.qty-1:1">−</button>
              <span>{{item.qty}}</span>
              <button class="mini" (click)="item.qty=item.qty+1">+</button>
            </div>
            <div class="item-total">₹{{item.price*item.qty}}</div>
          </div>
          <div class="empty-cart" *ngIf="!items.length">
            <h3>Your bag is empty</h3>
            <p>Looks like you haven't added anything yet.</p>
            <a class="btn" routerLink="/catalog">Start shopping</a>
          </div>
        </div>
        <aside class="summary">
          <h3>Order summary</h3>
          <div class="row"><span>Subtotal</span><span>₹{{subtotal}}</span></div>
          <div class="row"><span>Shipping</span><span class="green" *ngIf="subtotal>=499">Free</span><span *ngIf="subtotal<499">₹{{shipping}}</span></div>
          <div class="row total"><span>Total</span><span>₹{{total}}</span></div>
          <p class="note" *ngIf="subtotal<499">Add ₹{{499-subtotal}} more for free shipping</p>
          <a class="checkout-btn" routerLink="/checkout">Proceed to checkout</a>
          <div class="trust-mini"><span>🔒 Secure</span><span>💳 UPI • Cards • BHIM</span></div>
        </aside>
      </div>
    </section>
  `,
  styles: [`
    .cart-page{max-width:1200px;margin:auto;padding:48px 48px 80px}.cart-head{margin-bottom:28px}.eyebrow{font-size:11px;letter-spacing:2px;font-weight:700;color:#123653;margin:0 0 10px}.cart-page h1{font-size:clamp(28px,3vw,40px);letter-spacing:-1px;color:#123653;margin:0}.cart-layout{display:grid;grid-template-columns:1fr 360px;gap:32px}@media(max-width:900px){.cart-layout{grid-template-columns:1fr}.cart-page{padding:32px 20px 40px}}.cart-row{display:grid;grid-template-columns:90px 1fr auto auto;gap:16px;align-items:center;padding:16px 0;border-bottom:1px solid #eef2f6}.item-img{width:90px;height:110px;object-fit:cover;border-radius:6px;background:#f7f9fb}.item-info{min-width:0}.item-name{font-size:14px;font-weight:700;color:#123653;margin:0 0 4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.item-meta{font-size:12px;color:#6b7280;margin:0 0 4px}.item-price{font-size:13px;font-weight:700;color:#123653}.item-qty{display:flex;align-items:center;gap:8px;border:1px solid #d9e2ea;border-radius:6px;padding:4px}.mini{width:28px;height:28px;border:0;background:#f7f9fb;color:#123653;font-size:16px;font-weight:800;cursor:pointer;border-radius:4px}.item-total{font-size:14px;font-weight:800;color:#123653;min-width:70px;text-align:right}.empty-cart{text-align:center;padding:60px 20px}.empty-cart h3{font-size:22px;color:#123653;margin:0 0 8px}.empty-cart p{color:#6b7280;margin:0 0 18px}.btn{display:inline-block;background:#123653;color:#fff!important;padding:10px 18px;border-radius:6px;text-decoration:none;font-weight:700}.summary{background:#f7f9fb;border-radius:10px;padding:20px;align-self:start}.summary h3{font-size:16px;color:#123653;margin:0 0 14px}.row{display:flex;justify-content:space-between;font-size:13px;color:#4a6071;padding:8px 0;border-bottom:1px dashed #d9e2ea}.row.total{border:0;font-size:15px;font-weight:800;color:#123653}.green{color:#10b981;font-weight:700}.note{font-size:11px;color:#6b7280;margin:10px 0 14px}.checkout-btn{display:block;width:100%;background:#123653;color:#fff!important;text-align:center;padding:12px;border-radius:6px;text-decoration:none;font-weight:800}.trust-mini{display:flex;justify-content:space-between;font-size:11px;color:#6b7280;margin-top:10px}
  `]
})
export class CartComponent {
  items: CartItem[] = [
    {id:1,name:'Cotton Onesie Set (3-Pack)',price:899,image:'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=300',size:'3-4Y',qty:1},
    {id:2,name:'Playful Dinosaur T-Shirt',price:549,image:'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=300',size:'4-5Y',qty:2}
  ];
  get subtotal(){return this.items.reduce((s,i)=>s+i.price*i.qty,0);}
  get shipping(){return this.subtotal>=499?0:99;}
  get total(){return this.subtotal+this.shipping;}
}
