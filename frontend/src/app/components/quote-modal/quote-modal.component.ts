import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-quote-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-backdrop" (click)="backdropClick($event)">
      <div class="modal-window">
        <button class="close-btn" (click)="close.emit()">✕</button>
        <span class="badge">Custom Stitching & Design</span>
        <h2>Request a Tailoring Quote</h2>
        <p class="subtitle">Tell us what you'd like crafted for you or your little one. Master tailors at Krishiv Creation will connect within 2 hours.</p>

        <form [formGroup]="quoteForm" (ngSubmit)="submitQuote()">
          <div class="form-group">
            <label>Customer Name *</label>
            <input type="text" formControlName="customer_name" placeholder="E.g., Anjali Mehta" />
          </div>

          <div class="form-group">
            <label>Phone / WhatsApp Number (India) *</label>
            <input type="tel" formControlName="phone" placeholder="98XXXXXXXX" />
          </div>

          <div class="form-group">
            <label>Location / City *</label>
            <input type="text" formControlName="location" placeholder="E.g., Surat, Mumbai, Bangalore" />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Job Type *</label>
              <select formControlName="job_type">
                <option value="Kids Birthday/Party Wear">Kids Birthday / Party Wear</option>
                <option value="Mom-Child Coordinated Set">Mom-Child Coordinated Set</option>
                <option value="Women Festive Kurti/Lehenga">Women Festive Kurti/Lehenga</option>
                <option value="Bulk School / Dance Uniform">Bulk School / Dance Uniform</option>
                <option value="Custom Fit Alteration">Custom Fit Alteration</option>
              </select>
            </div>

            <div class="form-group">
              <label>Urgency *</label>
              <select formControlName="urgency">
                <option value="urgent-48h">Immediate (48 Hours)</option>
                <option value="within-1-week">Within 1 Week</option>
                <option value="flexible">Flexible (10-15 Days)</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Notes / Measurement Details</label>
            <textarea formControlName="notes" rows="3" placeholder="Specify child's age, preferred fabric (organza, silk, cotton), reference theme..."></textarea>
          </div>

          <button type="submit" [disabled]="quoteForm.invalid || isSubmitting" class="btn-primary w-100">
            {{ isSubmitting ? 'Sending Request...' : 'Submit Request' }}
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed; inset: 0; background: rgba(30, 41, 59, 0.65); display: flex;
      align-items: center; justify-content: center; z-index: 1000; padding: 1rem;
    }
    .modal-window {
      background: #ffffff; width: 100%; max-width: 520px; border-radius: 18px;
      padding: 2.2rem; position: relative; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    }
    .close-btn {
      position: absolute; top: 1.2rem; right: 1.2rem; border: none; background: #f1f5f9;
      width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 1rem;
    }
    .badge {
      background: #ffe5ec; color: var(--primary); font-size: 0.75rem; font-weight: 700;
      padding: 0.25rem 0.6rem; border-radius: 20px;
    }
    h2 { margin-top: 0.5rem; font-size: 1.6rem; }
    .subtitle { font-size: 0.9rem; color: #64748b; margin-bottom: 1.2rem; }
    .form-group { display: flex; flex-direction: column; margin-bottom: 0.9rem; }
    .form-row { display: flex; gap: 0.8rem; }
    .form-row .form-group { flex: 1; }
    label { font-size: 0.82rem; font-weight: 700; color: #334155; margin-bottom: 0.3rem; }
    input, select, textarea {
      padding: 0.65rem 0.8rem; border: 1.5px solid #cbd5e1; border-radius: 8px; font-family: inherit; font-size: 0.9rem;
      &:focus { outline: none; border-color: var(--primary); }
    }
    .w-100 { width: 100%; justify-content: center; margin-top: 0.5rem; }
  `]
})
export class QuoteModalComponent {
  @Output() close = new EventEmitter<void>();
  quoteForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.quoteForm = this.fb.group({
      customer_name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s-]{10,14}$/)]],
      location: ['', Validators.required],
      job_type: ['Kids Birthday/Party Wear', Validators.required],
      urgency: ['within-1-week', Validators.required],
      notes: ['']
    });
  }

  backdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close.emit();
    }
  }

  submitQuote() {
    if (this.quoteForm.invalid) return;
    this.isSubmitting = true;
    this.api.submitQuote(this.quoteForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        alert('Thank you! Your quote request has been received by Krishiv Creation.');
        this.close.emit();
      },
      error: () => {
        this.isSubmitting = false;
        alert('Could not submit request. Please try calling us directly.');
      }
    });
  }
}
