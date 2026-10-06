# SharePal Gaming Gadgets Rental Platform (Bangalore)

A high-performance React application replicating the exact layout hierarchy, interactivity, and design system of the official **SharePal Bangalore Gaming Gadgets Rental Page** ([sharepal.in/bangalore/gaming-gadgets-on-rent](https://sharepal.in/bangalore/gaming-gadgets-on-rent)).

---

## 🎮 Features & Highlights

### 1. Exact Layout Hierarchy & Design System
- **Fixed Brand Header (`#4C187C`)**:
  - Official vector SharePal brand logo with `#9EFF00` lime-green "Pal" badge.
  - Interactive **Bangalore City Selector** with quick city modal (Bangalore, Mumbai, Delhi NCR, Hyderabad, Pune, Chennai).
  - **Rental Dates Pill** (`Delivery Date` | `Pickup Date`) triggering dynamic date modal.
  - Search toggle, active item count cart drawer, and login profile chip.
  - Responsive mobile navigation bar & bottom floating action pill.
- **Sticky Super-Category Bar**:
  - `Photography`, `Gaming` (active with purple underline indicator), `Outdoor`, `Entertainment`.
- **Category Sidebar Navigation**:
  - Vertical sticky navigation with official visual icons for:
    - `All` (29 items catalog)
    - `GTA VI`
    - `PS5 Console`
    - `Xbox Console`
    - `VR`
    - `Racing Wheel`
    - `Big Screen Gaming`
- **Hero Purple Gradient Banner**:
  - `linear-gradient(360deg, #8A2BE2 0%, #4C187C 100%)`
  - High-res console visual elements, title, tagline, and Zero Deposit badges.
- **Product Catalog Grid (`product-list.json`)**:
  - Complete list of products from `product-list.json` (PS5 bundles, FC25, FC26, FC27, Racing Wheel combos, PlayStation Portal, etc.).
  - Real-time category filtering, stock availability filter, search input, and multiple sort orders (`Popularity`, `Price: Low to High`, `Price: High to Low`, `Rating`).
  - Product cards featuring badges (`Trending`, `New`, `Vote to Launch`), real ratings, booked counts, dynamic pricing, and stock status.

### 2. Dynamic Modal Date Selection & Rental Pricing Curve
- Interactive modal with interactive month calendar:
  - Select **Delivery Date** and **Pickup / Return Date**.
  - Quick duration presets: `2 Days (Weekend)`, `3 Days (Standard)`, `7 Days (15% Off)`, `14 Days (25% Off)`, `30 Days (35% Off)`.
  - Dynamic duration-based pricing calculation matching SharePal's curve (per-day rate decreases with tenure).
  - Explicit **Zero Deposit Guarantee (₹0)**, **Free Doorstep Delivery & Pickup**, and **Pay on Delivery**.
  - Selecting dates updates both the header and all product cards across the page in real-time.

### 3. Customer Reviews Carousel
- Real testimonials from SharePal customers (*Satyaki, Afrana, Kanthikiran, Amal, Pankaj, Jayaraman, Manish, Rakesh, Shruti, Amit*).
- 5 Gold Stars, Google icon, author initials avatar, verified badge, and location tags (*Bangalore • Gaming Console*, etc.).
- Smooth horizontal scroll carousel with navigation controls.

### 4. Interactive FAQ Accordions
- Official SharePal FAQs with smooth animated expand/collapse:
  1. *How can I rent from SharePal?*
  2. *If I rent multiple products, do I need to extend the rental duration for all or partial extension is possible?*
  3. *When does the rental start?*
  4. *What will be the condition of the products at the time of delivery?*
  5. *Why is verification required?*
  6. *How is the rental calculated?*
  7. *What is the minimum rental period?*

### 5. Localized Bangalore Content Section
- **Koramangala, Indiranagar, Whitefield, HSR Layout** localized references.
- Categories on rent in Bangalore.
- "Why Renting Beats Buying" breakdown.
- "Why SharePal in Bangalore" USPs (Zero Deposit, Free Delivery, Wide Range, Flexible Tenures, Customer Support).
- Verified Google & Trustpilot review links for SharePal Bangalore.

### 6. Interactive Cart Drawer & WhatsApp Support
- Slide-over rental cart drawer with date ranges, item totals, and zero deposit summary.
- Floating WhatsApp support action button hooked directly into Bangalore support chat.

---

## 🛠️ Project Structure

```
├── package.json               # Dependencies & scripts
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # SharePal brand palette (#4C187C, #8A2BE2, #9EFF00)
├── postcss.config.js          # PostCSS plugins
├── index.html                 # HTML entry point
├── product-list.json          # Original product dataset
├── public/
│   ├── favicon.ico
│   └── assets/                # Local asset cache (banners, categories, icons)
│       ├── banners/
│       ├── categories/
│       └── icons/
├── src/
│   ├── main.jsx               # React DOM root
│   ├── App.jsx                # Main layout composition
│   ├── index.css              # Tailwind & custom animations
│   ├── context/
│   │   └── RentalContext.jsx  # Global state (dates, filtering, cart, city)
│   ├── data/
│   │   ├── products.js        # Enhanced product catalog with categories
│   │   ├── categories.js      # Super & subcategory definitions
│   │   ├── faqs.js            # Official FAQs data
│   │   ├── reviews.js         # Authentic customer reviews
│   │   └── bangaloreInfo.js   # Localized Bangalore SEO & USPs copy
│   └── components/
│       ├── Header.jsx
│       ├── SuperCategoryNav.jsx
│       ├── CategorySidebar.jsx
│       ├── HeroBanner.jsx
│       ├── ProductGrid.jsx
│       ├── ProductCard.jsx
│       ├── DateSelectionModal.jsx
│       ├── CitySelectorModal.jsx
│       ├── CartDrawer.jsx
│       ├── ReviewsCarousel.jsx
│       ├── FAQSection.jsx
│       ├── BangaloreSeoSection.jsx
│       ├── TrustStats.jsx
│       ├── FloatingWhatsApp.jsx
│       ├── MobileBottomBar.jsx
│       ├── Footer.jsx
│       └── common/
│           ├── SharePalLogo.jsx
│           └── RatingStars.jsx
```

---

## 🚀 Getting Started

To run the development server locally:

```bash
# Start development server
npm run dev

# Or build for production
npm run build

# Preview production build
npm run preview
```
