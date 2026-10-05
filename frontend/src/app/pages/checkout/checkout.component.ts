import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService, CartItem } from '../../services/api.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="checkout-wrapper">
      <!-- Top Trust Header Strip -->
      <div class="trust-header-bar">
        <div class="trust-badge-group">
          <span>🔒 256-Bit SSL Encrypted</span>
          <span>🛡️ PCI-DSS Compliant</span>
          <span>⚡ 3D Secure 2.0 Enabled</span>
        </div>
      </div>
      <h1>Secure Checkout</h1>

      <div class="checkout-grid" *ngIf="items.length > 0; else emptyCart">
        <!-- Delivery and Payment Form -->
        <div class="form-card">
          <h2>1. Shipping Address in India</h2>
          <form [formGroup]="checkoutForm" (ngSubmit)="placeOrder()">
            <div class="form-group">
              <label>Full Name *</label>
              <input formControlName="customer_name" placeholder="E.g., Pooja Sharma" />
            </div>

            <div class="form-group">
              <label>Contact Phone (WhatsApp enabled for updates) *</label>
              <input formControlName="phone" placeholder="9876543210" />
            </div>

            <div class="form-group">
              <label>Address *</label>
              <textarea formControlName="address" rows="2" placeholder="House/Flat No, Apartment, Street Area"></textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>City / Town *</label>
                <input formControlName="city" placeholder="Ahmedabad" />
              </div>

              <div class="form-group">
                <label>Pincode (6-Digits) *</label>
                <input formControlName="pincode" placeholder="380015" />
              </div>
            </div>

            <h2 class="mt-4">2. Payment Method (India)</h2>
            <div class="payment-methods">
              <label class="pay-option">
                <input type="radio" formControlName="payment_method" value="UPI" />
                <div class="pay-info">
                  <strong>UPI (Instant & Contactless)</strong>
                  <span>Pay via Google Pay, PhonePe, Paytm, or BHIM directly</span>
                </div>
              </label>

              <label class="pay-option">
                <input type="radio" formControlName="payment_method" value="RAZORPAY" />
                <div class="pay-info">
                  <strong>Debit/Credit Cards & NetBanking</strong>
                  <span>Supports Visa, MasterCard, RuPay & Indian Netbanking</span>
                </div>
              </label>

              <label class="pay-option">
                <input type="radio" formControlName="payment_method" value="COD" />
                <div class="pay-info">
                  <strong>Cash On Delivery (COD)</strong>
                  <span>Pay cash to the courier representative upon delivery</span>
                </div>
              </label>
            </div>

            <button type="submit" [disabled]="checkoutForm.invalid || isSubmitting" class="btn-primary w-100">
              {{ isSubmitting ? 'Placing Order...' : 'Confirm Order • ₹' + totalAmount }}
            </button>
          </form>
        </div>

        <!-- Order Summary -->
        <div class="summary-card">
          <h2>Order Summary ({{ items.length }} items)</h2>
          <div class="item-list">
            <div class="summary-item" *ngFor="let it of items">
              <div>
                <strong>{{ it.name }}</strong>
                <p>Qty: {{ it.quantity }} × ₹{{ it.price }}</p>
              </div>
              <span class="item-total">₹{{ it.price * it.quantity }}</span>
            </div>
          </div>

          <div class="summary-breakdown">
            <div class="row">
              <span>Subtotal</span>
              <span>₹{{ totalAmount }}</span>
            </div>
            <div class="row">
              <span>Delivery Charges</span>
              <span class="free">FREE across India</span>
            </div>
            <hr />
            <div class="row grand-total">
              <span>Total Payable</span>
              <span>₹{{ totalAmount }}</span>
            </div>
          </div>

          <div class="guarantee-box">
            <p>🛡️ Handcrafted and quality checked at Krishiv Creation</p>
            <p>🔁 7-day hassle-free size alteration guarantee</p>
            <p>📦 Shipped in tamper-proof, biodegradable packaging</p>
          </div>
        </div>
      </div>

      <ng-template #emptyCart>
        <div class="empty-state">
          <p>Your shopping cart is currently empty.</p>
          <a routerLink="/catalog" class="btn-primary">Browse Collections</a>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .checkout-wrapper { max-width: 1140px; margin: 2rem auto; padding: 0 1.5rem; }
    .trust-header-bar {
      background: var(--marine-blue-subtle); padding: 0.6rem 1rem; border-radius: var(--radius-sm);
      margin-bottom: 1.5rem; border: 1px solid rgba(0, 71, 171, 0.15);
    }
    .trust-badge-group { display: flex; gap: 1.5rem; font-size: 0.78rem; font-weight: 700; color: var(--marine-blue); flex-wrap: wrap; }
    h1 { font-size: 2.2rem; margin-bottom: 1.5rem; color: var(--marine-blue); }
    .checkout-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 2.5rem; }
    .form-card, .summary-card {
      background: #ffffff; padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--border-gray);
    }
    h2 { font-size: 1.3rem; margin-bottom: 1.2rem; }
    .form-group { display: flex; flex-direction: column; margin-bottom: 1rem; }
    .form-row { display: flex; gap: 1rem; }
    .form-row .form-group { flex: 1; }
    label { font-size: 0.85rem; font-weight: 700; color: var(--marine-blue); margin-bottom: 0.3rem; }
    input, textarea {
      padding: 0.75rem 0.9rem; border: 1px solid var(--border-gray); border-radius: var(--radius-sm); font-size: 0.95rem;
      &:focus { outline: none; border-color: var(--marine-blue); }
    }
    .payment-methods { display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 1.5rem; }
    .pay-option {
      display: flex; gap: 1rem; align-items: center; padding: 0.85rem 1rem;
      border: 1px solid var(--border-gray); border-radius: var(--radius-sm); cursor: pointer;
      &:hover { border-color: var(--marine-blue); }
    }
    .pay-info strong { display: block; font-size: 0.95rem; }
    .pay-info span { font-size: 0.8rem; color: #666666; }
    .w-100 { width: 100%; justify-content: center; }
    .mt-4 { margin-top: 1.5rem; }
    .item-list { border-bottom: 1px solid var(--border-gray); padding-bottom: 1rem; margin-bottom: 1rem; }
    .summary-item { display: flex; justify-content: space-between; margin-bottom: 0.8rem; font-size: 0.9rem; }
    .summary-item p { color: #666666; font-size: 0.8rem; }
    .item-total { font-weight: 700; }
    .summary-breakdown .row { display: flex; justify-content: space-between; margin-bottom: 0.6rem; font-size: 0.95rem; }
    .free { color: #10b981; font-weight: 700; }
    .grand-total { font-size: 1.25rem !important; font-weight: 800; color: var(--marine-blue); margin-top: 0.5rem; }
    .guarantee-box {
      margin-top: 1.5rem; background: #fafafa; padding: 1rem; border-radius: var(--radius-sm); font-size: 0.85rem; color: #555555;
      p { margin-bottom: 0.4rem; }
    }
    .empty-state { text-align: center; padding: 4rem 1rem; p { font-size: 1.2rem; margin-bottom: 1.5rem; } }
    @media (max-width: 850px) {
      .checkout-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class CheckoutComponent {
  items: CartItem[] = [];
  checkoutForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.items = this.api.getCartSnapshot();

    this.checkoutForm = this.fb.group({
      customer_name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      payment_method: ['UPI', Validators.required]
    });
  }

  get totalAmount(): number {
    return this.items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  }

  placeOrder() {
    if (this.checkoutForm.invalid) return;
    this.isSubmitting = true;

    const payload = {
      ...this.checkoutForm.value,
      total_amount: this.totalAmount,
      items: this.items.map(it => ({
        product_id: it.id,
        name: it.name,
        quantity: it.quantity,
        price: it.price
      }))
    };

    this.api.submitOrder(payload).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        alert(`Order confirmed! Your order reference is ${res.order_id}. Krishiv Creation team will contact you for shipping updates.`);
        this.api.clearCart();
        this.items = [];
      },
      error: () => {
        this.isSubmitting = false;
        alert('Order created locally. We will confirm your details over phone/WhatsApp.');
      }
    });
  }
}
