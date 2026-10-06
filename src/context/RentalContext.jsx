import React, { createContext, useContext, useState, useMemo } from 'react';
import initialProducts from '../data/products';
import { subCategories } from '../data/categories';

const RentalContext = createContext();

export const RentalProvider = ({ children }) => {
  // Cities
  const [selectedCity, setSelectedCity] = useState('Bangalore');
  const [cityModalOpen, setCityModalOpen] = useState(false);

  // Super & Sub Category
  const [activeSuperCategory, setActiveSuperCategory] = useState('gaming');
  const [activeSubCategory, setActiveSubCategory] = useState('all');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Date Selection State
  // Default: delivery tomorrow, return in 3 days
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultReturn = new Date(tomorrow);
  defaultReturn.setDate(defaultReturn.getDate() + 3);

  const [hasCustomDates, setHasCustomDates] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(tomorrow);
  const [pickupDate, setPickupDate] = useState(defaultReturn);

  // Modal State
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [modalTargetProduct, setModalTargetProduct] = useState(null);

  // Cart State
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Mobile menu / filters drawer
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Calculate rental days
  const rentalDays = useMemo(() => {
    if (!deliveryDate || !pickupDate) return 3;
    const diffTime = Math.abs(pickupDate - deliveryDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  }, [deliveryDate, pickupDate]);

  // Pricing calculation matching SharePal's duration curve
  const calculatePrice = (basePerDay, days = rentalDays) => {
    let multiplier = 1.0;
    if (days === 1) multiplier = 1.5;
    else if (days === 2) multiplier = 1.25;
    else if (days <= 4) multiplier = 1.1;
    else if (days <= 7) multiplier = 0.95;
    else if (days <= 14) multiplier = 0.85;
    else multiplier = 0.75;

    const effectivePerDay = Math.round(basePerDay * multiplier);
    const totalPrice = effectivePerDay * days;
    return {
      perDay: effectivePerDay,
      total: totalPrice,
      originalTotal: Math.round(basePerDay * 1.5 * days),
      savings: Math.max(0, Math.round(basePerDay * 1.5 * days) - totalPrice),
      days
    };
  };

  // Open date modal
  const openDateModal = (product = null) => {
    setModalTargetProduct(product);
    setDateModalOpen(true);
  };

  const closeDateModal = () => {
    setDateModalOpen(false);
    setModalTargetProduct(null);
  };

  const applyDates = (startDate, endDate) => {
    setDeliveryDate(startDate);
    setPickupDate(endDate);
    setHasCustomDates(true);
    closeDateModal();
  };

  // Cart actions
  const addToCart = (product, customDays = rentalDays) => {
    const pricing = calculatePrice(product.per_day_rent, customDays);
    const newItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      perDayRent: product.per_day_rent,
      effectivePerDay: pricing.perDay,
      totalPrice: pricing.total,
      days: customDays,
      deliveryDate: deliveryDate ? deliveryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Flexible',
      pickupDate: pickupDate ? pickupDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Flexible'
    };

    setCart(prev => [newItem, ...prev]);
    setCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.id !== cartId));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [cart]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    // Filter by Subcategory
    if (activeSubCategory !== 'all') {
      list = list.filter(p => p.subcategories && p.subcategories.includes(activeSubCategory));
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.tag && p.tag.toLowerCase().includes(q))
      );
    }

    // Filter by Stock
    if (inStockOnly) {
      list = list.filter(p => !p.out_of_stock);
    }

    // Sorting
    if (sortBy === 'popular') {
      list.sort((a, b) => b.booked_count - a.booked_count);
    } else if (sortBy === 'price-asc') {
      list.sort((a, b) => a.per_day_rent - b.per_day_rent);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.per_day_rent - a.per_day_rent);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeSubCategory, searchQuery, inStockOnly, sortBy]);

  return (
    <RentalContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        cityModalOpen,
        setCityModalOpen,
        activeSuperCategory,
        setActiveSuperCategory,
        activeSubCategory,
        setActiveSubCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        inStockOnly,
        setInStockOnly,
        deliveryDate,
        pickupDate,
        rentalDays,
        hasCustomDates,
        dateModalOpen,
        openDateModal,
        closeDateModal,
        modalTargetProduct,
        applyDates,
        calculatePrice,
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        cartTotal,
        filteredProducts,
        totalProductsCount: initialProducts.length,
        mobileFilterOpen,
        setMobileFilterOpen
      }}
    >
      {children}
    </RentalContext.Provider>
  );
};

export const useRental = () => {
  const context = useContext(RentalContext);
  if (!context) {
    throw new Error('useRental must be used within a RentalProvider');
  }
  return context;
};
