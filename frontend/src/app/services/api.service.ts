import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image_url: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface QuotePayload {
  customer_name: string;
  phone: string;
  location: string;
  job_type: string;
  urgency: string;
  notes: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private quoteModalOpen = new BehaviorSubject<boolean>(false);
  quoteModalOpen$ = this.quoteModalOpen.asObservable();
  cart$ = this.cartItems.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(category?: string): Observable<Product[]> {
    const url = category ? `${this.baseUrl}/products?category=${category}` : `${this.baseUrl}/products`;
    return this.http.get<Product[]>(url);
  }

  submitQuote(payload: QuotePayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/quotes`, payload);
  }

  submitOrder(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders`, payload);
  }

  openQuoteModal() {
    this.quoteModalOpen.next(true);
  }

  closeQuoteModal() {
    this.quoteModalOpen.next(false);
  }

  addToCart(product: Product) {
    const current = this.cartItems.value;
    const existingIndex = current.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
      current[existingIndex].quantity += 1;
      this.cartItems.next([...current]);
    } else {
      this.cartItems.next([...current, { ...product, quantity: 1 }]);
    }
  }

  getCartSnapshot(): CartItem[] {
    return this.cartItems.value;
  }

  clearCart() {
    this.cartItems.next([]);
  }
}
