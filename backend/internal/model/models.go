package model

import "time"

type Product struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Category    string    `json:"category"`
	Price       float64   `json:"price"`
	Stock       int       `json:"stock"`
	ImageURL    string    `json:"image_url"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
}

type QuoteRequest struct {
	ID           int       `json:"id"`
	CustomerName string    `json:"customer_name"`
	Phone        string    `json:"phone"`
	Location     string    `json:"location"`
	JobType      string    `json:"job_type"`
	Urgency      string    `json:"urgency"`
	Notes        string    `json:"notes"`
	CreatedAt    time.Time `json:"created_at"`
}

type OrderItem struct {
	ProductID int     `json:"product_id"`
	Name      string  `json:"name"`
	Quantity  int     `json:"quantity"`
	Price     float64 `json:"price"`
}

type Order struct {
	ID            int         `json:"id"`
	OrderID       string      `json:"order_id"`
	CustomerName  string      `json:"customer_name"`
	Phone         string      `json:"phone"`
	Address       string      `json:"address"`
	City          string      `json:"city"`
	Pincode       string      `json:"pincode"`
	TotalAmount   float64     `json:"total_amount"`
	PaymentMethod string      `json:"payment_method"`
	PaymentStatus string      `json:"payment_status"`
	Items         []OrderItem `json:"items"`
	CreatedAt     time.Time   `json:"created_at"`
}
