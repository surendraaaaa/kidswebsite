# KidsKart - Premium Kids Clothing E-commerce Website

A modern, professional e-commerce platform for kids clothing (ages 0-17 years) built with Angular and Go.

![KidsKart](https://images.unsplash.com/photo-1522771930-78848d9293e8?w=1200)

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, professional design with brand colors (Marine Blue, Bright Red, Butter Yellow)
- 📱 **Mobile-First Responsive** - Optimized for all devices
- 👶 **Age-Based Filtering** - Easy browsing by age groups (0-2Y, 3-5Y, 6-8Y, 9-11Y, 12-14Y, 15-17Y)
- 🛒 **Shopping Cart** - Add to cart functionality with quantity selector
- 🔒 **Secure Checkout** - PCI DSS compliant with Razorpay integration (UPI, Cards, BHIM, Net Banking)
- 🚚 **Trust Signals** - Free shipping, easy returns, secure checkout badges
- 🔍 **Product Zoom** - Image zoom on hover for detailed viewing
- ⭐ **Product Ratings** - Customer reviews and ratings
- 💬 **WhatsApp Support** - Direct customer support integration

## 🛠️ Tech Stack

### Frontend
- **Framework**: Angular 17+
- **Styling**: SCSS with CSS Custom Properties
- **Build Tool**: Angular CLI

### Backend
- **Language**: Go (Golang)
- **Database**: PostgreSQL
- **Payment**: Razorpay (UPI, Cards, BHIM, Net Banking)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **Go** (v1.21 or higher) - [Download](https://go.dev/)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/surendraaaaa/kidswebsite.git
cd kidswebsite
```

### 2. Frontend Setup (Angular)

```bash
cd frontend
npm install
ng serve
```

The frontend will be available at `http://localhost:4200`

### 3. Backend Setup (Go)

```bash
cd backend
go mod download

# Set environment variables
export DB_HOST=localhost
export DB_PORT=5432
export DB_USER=postgres
export DB_PASSWORD=your_password
export DB_NAME=kidskart
export RAZORPAY_KEY_ID=your_razorpay_key_id
export RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Run database migrations
psql -U postgres -d kidskart -f schema.sql

# Start backend server
go run cmd/main.go
```

The backend API will be available at `http://localhost:8080`

## 📁 Project Structure

```
kidswebsite/
├── frontend/              # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # header, footer
│   │   │   ├── pages/        # home, catalog, product-detail
│   │   │   └── services/
│   │   ├── styles.scss
│   │   └── index.html
│   ├── angular.json
│   └── package.json
├── backend/               # Go backend
│   ├── cmd/
│   │   └── main.go
│   ├── internal/
│   ├── schema.sql
│   └── go.mod
└── README.md
```

## 🎨 Brand Colors

- **Marine Blue**: `#0047AB` - Primary (navigation, headers, trust badges)
- **Bright Red**: `#FF0033` - CTAs, sale badges
- **Butter Yellow**: `#FFF14D` - Highlights, age filters, new badges

## 📦 Available Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, categories, new arrivals, sale items |
| Catalog | `/catalog` | Product listing with age filters |
| Product Detail | `/product/:id` | Images, zoom, size selector, cart |
| Cart | `/cart` | Shopping cart with quantity updates |
| Checkout | `/checkout` | Secure checkout with Razorpay |
| About | `/about` | Company information |
| FAQ | `/faq` | Frequently asked questions |

## 🔧 Development Commands

### Frontend
```bash
ng serve                    # Start dev server
ng build --configuration production  # Production build
ng test                     # Run tests
```

### Backend
```bash
go run cmd/main.go          # Start dev server
go build -o kidskart-api    # Production build
go test ./...               # Run tests
```

## 🌐 Production Deployment

### Frontend (Vercel/Netlify)
```bash
ng build --configuration production
vercel deploy --prod
```

### Backend (Railway/Render)
```bash
go build -o kidskart-api
railway up
```

## 🔐 Security Features

- ✅ SSL/TLS - HTTPS everywhere
- ✅ PCI DSS Compliant - Razorpay integration
- ✅ 3D Secure 2.0 - Dynamic authentication
- ✅ CORS Protection
- ✅ Input Validation
- ✅ Rate Limiting

## 📞 Customer Support

- **WhatsApp**: +91 98765 43210
- **Email**: support@kidskart.in
- **Hours**: Mon-Sat, 9 AM - 6 PM IST

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

## 👨‍💻 Author

**Surendra Prajapati**
- GitHub: [@surendraaaaa](https://github.com/surendraaaaa)
- Location: Toronto, Ontario, Canada

## 🙏 Acknowledgments

- Product images from Unsplash
- Icons from Heroicons
- Payment integration by Razorpay

---

**Built with ❤️ for kids everywhere**
