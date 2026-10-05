import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout', standalone: true, imports: [CommonModule],
  template: `
    <section class="checkout">
      <div class="co-head"><p class="eyebrow">CHECKOUT</p><h1>Almost there</h1></div>
      <div class="co-grid">
        <form class="co-form">
          <h3>Contact</h3>
          <div class="field"><label>Email</label><input type="email" placeholder="you@example.com"></div>
          <h3>Shipping</h3>
          <div class="row2"><div class="field"><label>First name</label><input placeholder="Aarav"></div><div class="field"><label>Last name</label><input placeholder="Sharma"></div></div>
          <div class="field"><label>Address</label><input placeholder="123, Main Street"></div>
          <div class="row2"><div class="field"><label>City</label><input placeholder="Mumbai"></div><div class="field"><label>PIN</label><input placeholder="400001"></div></div>
          <div class="field"><label>Phone</label><input type="tel" placeholder="+91 98765 43210"></div>
          <h3>Payment</h3>
          <div class="pay-methods"><label class="pm"><input type="radio" name="pay" checked><span>UPI</span></label><label class="pm"><input type="radio" name="pay"><span>Card</span></label><label class="pm"><input type="radio" name="pay"><span>BHIM</span></label><label class="pm"><input type="radio" name="pay"><span>Net Banking</span></label></div>
          <div class="pay-note">Payments are processed securely via Razorpay. This is a demo — no real charge will be made.</div>
          <button class="pay-btn">Pay ₹1,997</button>
          <p class="co-trust">🔒 SSL secured • 3D Secure enabled</p>
        </form>
        <aside class="co-summary">
          <h3>Order summary</h3>
          <div class="sr"><img src="https://images.unsplash.com/photo-1522771930-78848d9293e8?w=120"><div><p class="sr-name">Cotton Onesie Set (3-Pack)</p><p class="sr-meta">Size 3-4Y • Qty 1</p></div><span>₹899</span></div>
          <div class="sr"><img src="https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=120"><div><p class="sr-name">Playful Dinosaur T-Shirt</p><p class="sr-meta">Size 4-5Y • Qty 2</p></div><span>₹1,098</span></div>
          <div class="sr-row"><span>Subtotal</span><span>₹1,997</span></div>
          <div class="sr-row"><span>Shipping</span><span class="green">Free</span></div>
          <div class="sr-row total"><span>Total</span><span>₹1,997</span></div>
        </aside>
      </div>
    </section>
  `,
  styles: [`
    .checkout{max-width:1200px;margin:auto;padding:48px 48px 80px}.co-head{margin-bottom:28px}.eyebrow{font-size:11px;letter-spacing:2px;font-weight:700;color:#123653;margin:0 0 10px}.checkout h1{font-size:clamp(28px,3vw,40px);letter-spacing:-1px;color:#123653;margin:0}.co-grid{display:grid;grid-template-columns:1fr 360px;gap:32px}@media(max-width:900px){.co-grid{grid-template-columns:1fr}.checkout{padding:32px 20px 40px}}.co-form{background:#f7f9fb;border-radius:10px;padding:20px}.co-form h3{font-size:15px;color:#123653;margin:18px 0 10px}.field{margin-bottom:12px}.field label{display:block;font-size:12px;color:#4a6071;margin:0 0 6px}.field input{width:100%;padding:10px 12px;border:1px solid #d9e2ea;border-radius:6px;font-size:14px}.row2{display:grid;grid-template-columns:1fr 1fr;gap:10px}.pay-methods{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:10px 0}.pm{display:flex;align-items:center;gap:8px;border:1px solid #d9e2ea;border-radius:6px;padding:8px 10px;font-size:12px;color:#4a6071;cursor:pointer}.pm input{accent-color:#123653}.pay-note{font-size:11px;color:#6b7280;margin:10px 0}.pay-btn{width:100%;background:#123653;color:#fff;border:0;padding:12px;border-radius:6px;font-weight:800;cursor:pointer}.co-trust{font-size:11px;color:#6b7280;text-align:center;margin-top:10px}.co-summary{background:#fff;border:1px solid #eef2f6;border-radius:10px;padding:20px;align-self:start}.co-summary h3{font-size:15px;color:#123653;margin:0 0 14px}.sr{display:flex;gap:10px;align-items:center;padding:10px 0;border-bottom:1px dashed #eef2f6}.sr img{width:60px;height:75px;object-fit:cover;border-radius:6px;background:#f7f9fb}.sr-name{font-size:13px;font-weight:700;color:#123653;margin:0 0 2px}.sr-meta{font-size:11px;color:#6b7280;margin:0}.sr-row{display:flex;justify-content:space-between;font-size:13px;color:#4a6071;padding:8px 0}.sr-row.total{border:0;font-size:15px;font-weight:800;color:#123653}.green{color:#10b981;font-weight:700}
  `]
})
export class CheckoutComponent {}
