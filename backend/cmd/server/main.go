package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"kidscloth-website/internal/handler"
	"kidscloth-website/internal/repository"
)

func spaHandler(w http.ResponseWriter, r *http.Request) {
	distCandidates := []string{
		"/home/ashukumavat555/kidscloth-website/frontend/dist/krishiv-creation/browser",
		filepath.Join("..", "frontend", "dist", "krishiv-creation", "browser"),
		filepath.Join(".", "frontend", "dist", "krishiv-creation", "browser"),
	}

	for _, distDir := range distCandidates {
		targetPath := filepath.Join(distDir, filepath.Clean(r.URL.Path))
		if info, err := os.Stat(targetPath); err == nil && !info.IsDir() {
			http.ServeFile(w, r, targetPath)
			return
		}

		indexPath := filepath.Join(distDir, "index.html")
		if _, err := os.Stat(indexPath); err == nil {
			http.ServeFile(w, r, indexPath)
			return
		}
	}

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Krishiv Creation API</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 680px; margin: 40px auto; padding: 20px; line-height: 1.6; color: #1e293b; background: #fff8f9; }
    h1 { color: #ff4d6d; }
    .card { background: white; padding: 20px; border-radius: 12px; border: 1px solid #fecdd3; margin-top: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
    code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-weight: 600; color: #e11d48; }
    ul { list-style: none; padding: 0; }
    li { margin: 10px 0; }
    a { color: #ff4d6d; text-decoration: none; font-weight: bold; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>✨ Krishiv Creation API Server is Live!</h1>
  <p>The Go backend server is running and connected to PostgreSQL.</p>
  <div class="card">
    <h3>Active API Endpoints:</h3>
    <ul>
      <li>📦 <a href="/api/products" target="_blank">/api/products</a> - Product Catalog (GET)</li>
      <li>✂️ <code>POST /api/quotes</code> - Custom Tailoring Request</li>
      <li>🛍️ <code>POST /api/orders</code> - Orders &amp; Indian Payment Processing</li>
    </ul>
  </div>
  <div class="card">
    <h3>Start Frontend UI:</h3>
    <p>Run the Angular development server:<br><code>cd /home/ashukumavat555/kidscloth-website/frontend && npm start -- --host 0.0.0.0 --port 4200</code><br>Or run <code>npm run build</code> inside <code>frontend</code> to serve it directly from this port.</p>
  </div>
</body>
</html>`))
}

func main() {
	db, err := repository.InitDB()
	if err != nil {
		log.Printf("Warning: Failed to connect to PostgreSQL (%v). Check DATABASE_URL.", err)
	} else {
		defer db.Close()
		log.Println("PostgreSQL connection established successfully.")
	}

	h := handler.NewAPIHandler(db)

	http.HandleFunc("/api/products", handler.EnableCORS(h.GetProducts))
	http.HandleFunc("/api/quotes", handler.EnableCORS(h.CreateQuote))
	http.HandleFunc("/api/orders", handler.EnableCORS(h.CreateOrder))
	http.HandleFunc("/", spaHandler)

	port := ":8080"
	log.Printf("Krishiv Creation API server is running on http://localhost%s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatalf("Server stopped: %v", err)
	}
}
