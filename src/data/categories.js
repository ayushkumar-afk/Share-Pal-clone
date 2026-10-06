export const superCategories = [
  {
    id: 'photography',
    name: 'Photography',
    url: '/bangalore/photography-on-rent',
    active: false,
    bannerLeft: 'https://images.sharepal.in/super-categories/camera-left.webp',
    bannerRight: 'https://images.sharepal.in/super-categories/camera-right.webp'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    url: '/bangalore/gaming-gadgets-on-rent',
    active: true,
    bannerLeft: '/assets/banners/gaming-left.webp',
    bannerRight: '/assets/banners/gaming-right.webp',
    fallbackLeft: 'https://images.sharepal.in/super-categories/gaming-left.webp',
    fallbackRight: 'https://images.sharepal.in/super-categories/gaming-right.webp'
  },
  {
    id: 'outdoor',
    name: 'Outdoor',
    url: '/bangalore/outdoor-gears-on-rent',
    active: false,
    bannerLeft: 'https://images.sharepal.in/super-categories/outdoor-left.webp',
    bannerRight: 'https://images.sharepal.in/super-categories/outdoor-right.webp'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    url: '/bangalore/entertainment-on-rent',
    active: false,
    bannerLeft: 'https://images.sharepal.in/super-categories/entertainment-left.webp',
    bannerRight: 'https://images.sharepal.in/super-categories/entertainment-right.webp'
  }
];

export const subCategories = [
  {
    id: 'all',
    name: 'All',
    image: '/assets/categories/all.webp',
    fallback: 'https://images.sharepal.in/category-icons/action-cameras-on-rent.webp',
    iconFallback: 'Gamepad2'
  },
  {
    id: 'gta-vi',
    name: 'GTA VI',
    image: '/assets/categories/gta-vi.webp',
    fallback: 'https://images.sharepal.in/category-icons/gta-vi.webp',
    iconFallback: 'Flame'
  },
  {
    id: 'ps5-console',
    name: 'PS5 Console',
    image: '/assets/categories/ps5-console.webp',
    fallback: 'https://images.sharepal.in/sub-category-card/ps5-console-on-rent-sharepal.webp',
    iconFallback: 'Tv'
  },
  {
    id: 'xbox-console',
    name: 'Xbox Console',
    image: '/assets/categories/xbox-console.webp',
    fallback: 'https://images.sharepal.in/sub-category-card/xbox-console-on-rent-sharepal.webp',
    iconFallback: 'Box'
  },
  {
    id: 'vr',
    name: 'VR',
    image: '/assets/categories/vr.webp',
    fallback: 'https://images.sharepal.in/sub-category-card/vr-on-rent-sharepal.webp',
    iconFallback: 'Glasses'
  },
  {
    id: 'racing-wheel',
    name: 'Racing Wheel',
    image: '/assets/categories/racing-wheel.webp',
    fallback: 'https://images.sharepal.in/categories/gaming-consoles/gaming-accessories/logitech-G29-driving-force-racing-wheel/logitech-g29-racing-wheel-on-rent-sharepal-1.webp',
    iconFallback: 'Disc'
  },
  {
    id: 'big-screen-gaming',
    name: 'Big Screen Gaming',
    image: '/assets/categories/big-screen-gaming.webp',
    fallback: 'https://images.sharepal.in/categories/gaming-consoles/big-screen-gaming/products/ps5-with-2-controllers-with-projector-on-rent+.webp',
    iconFallback: 'MonitorPlay'
  }
];

export const availableCities = [
  { id: 'bangalore', name: 'Bangalore', state: 'Karnataka', popular: true },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', popular: true },
  { id: 'delhi', name: 'Delhi NCR', state: 'Delhi', popular: true },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', popular: true },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', popular: true },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', popular: true },
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', popular: false },
  { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', popular: false }
];
