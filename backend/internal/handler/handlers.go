package handler

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"kidscloth-website/internal/model"

	"github.com/google/uuid"
)

type APIHandler struct {
	DB *sql.DB
}

func NewAPIHandler(db *sql.DB) *APIHandler {
	return &APIHandler{DB: db}
}

func EnableCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		next(w, r)
	}
}

func (h *APIHandler) GetProducts(w http.ResponseWriter, r *http.Request) {
	category := r.URL.Query().Get("category")
	query := "SELECT id, name, category, price, stock, image_url, description FROM products"
	var rows *sql.Rows
	var err error

	if category != "" {
		query += " WHERE category = $1"
		rows, err = h.DB.QueryContext(r.Context(), query, category)
	} else {
		rows, err = h.DB.QueryContext(r.Context(), query)
	}

	if err != nil {
		http.Error(w, `{"error":"Failed to retrieve products"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	products := make([]model.Product, 0)
	for rows.Next() {
		var p model.Product
		if err := rows.Scan(&p.ID, &p.Name, &p.Category, &p.Price, &p.Stock, &p.ImageURL, &p.Description); err == nil {
			products = append(products, p)
		}
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(products)
}

func (h *APIHandler) CreateQuote(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, `{"error":"Method not allowed"}`, http.StatusMethodNotAllowed)
		return
	}

	r.Body = http.MaxBytesReader(w, r.Body, 1048576) // Max 1MB payload to prevent DoS
	var req model.QuoteRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"error":"Invalid payload"}`, http.StatusBadRequest)
		return
	}

	query := `INSERT INTO quote_requests (customer_name, phone, location, job_type, urgency, notes) 
	          VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`
	err := h.DB.QueryRowContext(r.Context(), query, req.CustomerName, req.Phone, req.Location, req.JobType, req.Urgency, req.Notes).Scan(&req.ID)
	if err != nil {
		http.Error(w, `{"error":"Database insertion failed"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"status":   "success",
		"quote_id": req.ID,
		"message":  "Quote request registered. We will contact you shortly.",
	})
}

func (h *APIHandler) CreateOrder(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, `{"error":"Method not allowed"}`, http.StatusMethodNotAllowed)
		return
	}

	r.Body = http.MaxBytesReader(w, r.Body, 1048576) // Max 1MB payload
	var ord model.Order
	if err := json.NewDecoder(r.Body).Decode(&ord); err != nil {
		http.Error(w, `{"error":"Invalid order body"}`, http.StatusBadRequest)
		return
	}

	if len(ord.Items) == 0 {
		http.Error(w, `{"error":"Cart cannot be empty"}`, http.StatusBadRequest)
		return
	}

	// Production Security: Calculate order total entirely on the backend from verified DB prices.
	// Never trust the client-supplied total_amount.
	var verifiedTotal float64
	for i, item := range ord.Items {
		var dbPrice float64
		var dbStock int
		err := h.DB.QueryRowContext(r.Context(), "SELECT price, stock FROM products WHERE id = $1", item.ProductID).Scan(&dbPrice, &dbStock)
		if err != nil {
			http.Error(w, fmt.Sprintf(`{"error":"Product ID %d not found"}`, item.ProductID), http.StatusBadRequest)
			return
		}
		if item.Quantity <= 0 || item.Quantity > 50 {
			http.Error(w, `{"error":"Invalid item quantity"}`, http.StatusBadRequest)
			return
		}
		if dbStock < item.Quantity {
			http.Error(w, fmt.Sprintf(`{"error":"Insufficient stock for product ID %d"}`, item.ProductID), http.StatusConflict)
			return
		}
		ord.Items[i].Price = dbPrice
		verifiedTotal += dbPrice * float64(item.Quantity)
	}
	ord.TotalAmount = verifiedTotal

	ord.OrderID = fmt.Sprintf("KC-%s", uuid.New().String()[:8])
	itemsJSON, _ := json.Marshal(ord.Items)

	query := `INSERT INTO orders (order_id, customer_name, phone, address, city, pincode, total_amount, payment_method, payment_status, items)
	          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'CONFIRMED', $9) RETURNING id`

	err := h.DB.QueryRowContext(r.Context(), query, ord.OrderID, ord.CustomerName, ord.Phone, ord.Address, ord.City, ord.Pincode, ord.TotalAmount, ord.PaymentMethod, itemsJSON).Scan(&ord.ID)
	if err != nil {
		http.Error(w, `{"error":"Failed to record order"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	_ = json.NewEncoder(w).Encode(ord)
}
