import React from 'react';
import Header from './components/Header';
import SuperCategoryNav from './components/SuperCategoryNav';
import CategorySidebar from './components/CategorySidebar';
import HeroBanner from './components/HeroBanner';
import ProductGrid from './components/ProductGrid';
import ReviewsCarousel from './components/ReviewsCarousel';
import FAQSection from './components/FAQSection';
import BangaloreSeoSection from './components/BangaloreSeoSection';
import TrustStats from './components/TrustStats';
import Footer from './components/Footer';
import DateSelectionModal from './components/DateSelectionModal';
import CitySelectorModal from './components/CitySelectorModal';
import CartDrawer from './components/CartDrawer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import MobileBottomBar from './components/MobileBottomBar';

export function App() {
  return (
    <div id="top" className="min-h-screen bg-[#F8F9FA] flex flex-col antialiased selection:bg-purple-200 selection:text-purple-900">
      {/* Fixed Header */}
      <Header />

      {/* Sticky Super Category Navigation */}
      <SuperCategoryNav />

      {/* Main Body Layout */}
      <main className="flex-1 container mx-auto px-2.5 sm:px-4 lg:px-6 pt-5 pb-16">
        {/* 2-Column Layout: Sidebar + Main Content */}
        <div className="flex gap-3 sm:gap-5 lg:gap-8 items-start">
          {/* Left Category Sidebar */}
          <CategorySidebar />

          {/* Right Main Content */}
          <div className="flex-1 min-w-0 space-y-6 sm:space-y-8">
            {/* Hero Gradient Banner */}
            <HeroBanner />

            {/* Product Grid with Filters & Sort */}
            <ProductGrid />

            {/* Customer Reviews Carousel */}
            <ReviewsCarousel />

            {/* Impact & Trust Statistics */}
            <TrustStats />

            {/* FAQ Accordions */}
            <FAQSection />

            {/* Localized Bangalore Information Section */}
            <BangaloreSeoSection />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Floating Overlays */}
      <DateSelectionModal />
      <CitySelectorModal />
      <CartDrawer />
      <FloatingWhatsApp />
      <MobileBottomBar />
    </div>
  );
}

export default App;
