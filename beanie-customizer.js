/**
 * Beanie Customizer Module
 * Handles all product customization logic for Handmade by K
 * This file can be shared between choose.html and index.html
 */

// ========================================
// COLOR DATA - Lion Brand Wool-Ease Thick & Quick
// ========================================
const YARN_COLORS = {
  // Solids - Premium warm tones
  solids: [
    { id: "fisherman", name: "Fisherman", hex: "#F5F2E8", category: "neutral" },
    { id: "oatmeal", name: "Oatmeal", hex: "#D4C9B5", category: "neutral" },
    { id: "barley", name: "Barley", hex: "#C4B69C", category: "neutral" },
    { id: "wheat", name: "Wheat", hex: "#D9C9A5", category: "neutral" },
    { id: "linen", name: "Linen", hex: "#C8B896", category: "neutral" },
    {
      id: "grey-marble",
      name: "Grey Marble",
      hex: "#9A9A9A",
      category: "neutral",
    },
    { id: "charcoal", name: "Charcoal", hex: "#4A4A4A", category: "neutral" },
    { id: "black", name: "Black", hex: "#1A1A1A", category: "neutral" },
    { id: "cranberry", name: "Cranberry", hex: "#8B2942", category: "warm" },
    { id: "spice", name: "Spice", hex: "#C4673B", category: "warm" },
    { id: "pumpkin", name: "Pumpkin", hex: "#E87A3B", category: "warm" },
    {
      id: "butterscotch",
      name: "Butterscotch",
      hex: "#D4A84B",
      category: "warm",
    },
    { id: "mustard", name: "Mustard", hex: "#C9A227", category: "warm" },
    { id: "kale", name: "Kale", hex: "#5D7052", category: "cool" },
    { id: "cilantro", name: "Cilantro", hex: "#4A6741", category: "cool" },
    { id: "navy", name: "Navy", hex: "#1F3A5F", category: "cool" },
    { id: "denim", name: "Denim", hex: "#4A6B8A", category: "cool" },
    { id: "claret", name: "Claret", hex: "#6B2C47", category: "warm" },
    { id: "raisin", name: "Raisin", hex: "#51394A", category: "warm" },
    { id: "fig", name: "Fig", hex: "#6B4F5D", category: "warm" },
  ],

  // Prints & Stripes (Variegated)
  prints: [
    {
      id: "carousel",
      name: "Carousel",
      hex: "linear-gradient(135deg, #E8A4B8 0%, #7BB8D9 50%, #F5D76E 100%)",
      category: "multi",
      description: "Pinks, blues, yellows",
    },
    {
      id: "hudson-bay",
      name: "Hudson Bay",
      hex: "linear-gradient(135deg, #FFFFFF 0%, #1F4E79 33%, #C41E3A 66%, #F5D76E 100%)",
      category: "multi",
      description: "White, blue, red, yellow",
    },
    {
      id: "astroland",
      name: "Astroland",
      hex: "linear-gradient(135deg, #2C3E6E 0%, #4A3B6B 50%, #6B4F7D 100%)",
      category: "multi",
      description: "Deep blues and purples",
    },
    {
      id: "coney-island",
      name: "Coney Island",
      hex: "linear-gradient(135deg, #E87A3B 0%, #D4658A 50%, #F5A07D 100%)",
      category: "multi",
      description: "Warm oranges and pinks",
    },
    {
      id: "city-lights",
      name: "City Lights",
      hex: "linear-gradient(135deg, #1A1A1A 0%, #E53935 25%, #00BCD4 50%, #FFEB3B 75%, #1A1A1A 100%)",
      category: "multi",
      description: "Dark with neon flecks",
    },
    {
      id: "fossil",
      name: "Fossil",
      hex: "linear-gradient(135deg, #C4B69C 0%, #F5F2E8 50%, #9A9A9A 100%)",
      category: "multi",
      description: "Earthy tan, cream, grey",
    },
    {
      id: "arctic-ice",
      name: "Arctic Ice",
      hex: "linear-gradient(135deg, #B8D4E8 0%, #FFFFFF 50%, #9CB4C4 100%)",
      category: "multi",
      description: "Cool blues and whites",
    },
    {
      id: "sequoia",
      name: "Sequoia",
      hex: "linear-gradient(135deg, #6B4423 0%, #4A6741 50%, #8B6B4A 100%)",
      category: "multi",
      description: "Rich browns and greens",
    },
    {
      id: "black-walnut",
      name: "Black Walnut",
      hex: "linear-gradient(135deg, #3D2B1F 0%, #5D4037 50%, #6B4423 100%)",
      category: "multi",
      description: "Dark warm wood tones",
    },
    {
      id: "bedrock",
      name: "Bedrock",
      hex: "linear-gradient(135deg, #6B6B6B 0%, #4A4A4A 50%, #8B8B8B 100%)",
      category: "multi",
      description: "Mixed grey tones",
    },
  ],

  // Metallics (With Sparkle)
  metallics: [
    {
      id: "blackstone",
      name: "Blackstone",
      hex: "#2A2A2A",
      category: "metallic",
      description: "Dark charcoal with silver shimmer",
    },
    {
      id: "starlight",
      name: "Starlight",
      hex: "#F8F5E8",
      category: "metallic",
      description: "Cream with gold shimmer",
    },
    {
      id: "galaxy",
      name: "Galaxy",
      hex: "#2C3E6E",
      category: "metallic",
      description: "Deep blue with silver shimmer",
    },
    {
      id: "constellation",
      name: "Constellation",
      hex: "#1A2744",
      category: "metallic",
      description: "Night sky with sparkle",
    },
  ],
};

// Flatten all colors into one array for easy access
const ALL_COLORS = [
  ...YARN_COLORS.solids,
  ...YARN_COLORS.prints,
  ...YARN_COLORS.metallics,
];

// ========================================
// PRE-MADE COMBOS (Best Sellers)
// ========================================
const PRESET_COMBOS = [
  {
    id: "santa-classic",
    name: "Santa Classic",
    crown: "cranberry",
    stripe: "fisherman",
    base: "kale",
    price: 32.0,
    image: "santa1.png",
  },
  {
    id: "noir-cocoa",
    name: "Noir & Cocoa",
    crown: "black",
    stripe: "butterscotch",
    base: "charcoal",
    price: 30.0,
    image: "b&b.png",
  },
  {
    id: "brooklyn-bridge",
    name: "Brooklyn Bridge",
    crown: "grey-marble",
    stripe: "navy",
    base: "charcoal",
    price: 32.0,
    image: "bridge2s.png",
  },
  {
    id: "shimmer-luxe",
    name: "Shimmer Luxe",
    crown: "starlight",
    stripe: "galaxy",
    base: "blackstone",
    price: 36.0,
    image: "brillo.png",
  },
  {
    id: "garden-bloom",
    name: "Garden Bloom",
    crown: "carousel",
    stripe: "fisherman",
    base: "kale",
    price: 34.0,
    image: "florb.png",
  },
  {
    id: "tropical-escape",
    name: "Tropical Escape",
    crown: "coney-island",
    stripe: "fisherman",
    base: "spice",
    price: 34.0,
    image: "tropical.png",
  },
  {
    id: "fresh-mint",
    name: "Fresh Mint",
    crown: "arctic-ice",
    stripe: "fisherman",
    base: "kale",
    price: 34.0,
    image: "menta.png",
  },
  {
    id: "autumn-harvest",
    name: "Autumn Harvest",
    crown: "sequoia",
    stripe: "mustard",
    base: "kale",
    price: 34.0,
    image: "forestb.png",
  },
];

// ========================================
// PRICING
// ========================================
const BASE_PRICE = 28.0;
const METALLIC_UPCHARGE = 4.0;
const PRINT_UPCHARGE = 2.0;

// ========================================
// HELPER FUNCTIONS
// ========================================
function getColorById(colorId) {
  return ALL_COLORS.find((c) => c.id === colorId) || null;
}

function getColorCategory(colorId) {
  const color = getColorById(colorId);
  return color ? color.category : null;
}

function calculatePrice(crownId, stripeId, baseId) {
  let price = BASE_PRICE;

  [crownId, stripeId, baseId].forEach((id) => {
    const category = getColorCategory(id);
    if (category === "metallic") {
      price += METALLIC_UPCHARGE;
    } else if (category === "multi") {
      price += PRINT_UPCHARGE;
    }
  });

  return price;
}

function generateProductImagePath(crownId, stripeId, baseId) {
  // Format: crownColor_stripeColor_baseColor.jpg
  return `${crownId}_${stripeId}_${baseId}.jpg`;
}

function formatColorForDisplay(colorId) {
  const color = getColorById(colorId);
  return color ? color.name : "Unknown";
}

// ========================================
// BEANIE CUSTOMIZER CLASS
// ========================================
class BeanieCustomizer {
  constructor(options = {}) {
    this.crown = options.crown || "fisherman";
    this.stripe = options.stripe || "grey-marble";
    this.base = options.base || "charcoal";
    this.onUpdate = options.onUpdate || (() => {});
    this.imageElement = options.imageElement || null;
    this.placeholderImage =
      options.placeholderImage || "beanie-placeholder.png";
  }

  setColors(crown, stripe, base) {
    this.crown = crown;
    this.stripe = stripe;
    this.base = base;
    this.update();
  }

  setCrown(colorId) {
    this.crown = colorId;
    this.update();
  }

  setStripe(colorId) {
    this.stripe = colorId;
    this.update();
  }

  setBase(colorId) {
    this.base = colorId;
    this.update();
  }

  loadPreset(presetId) {
    const preset = PRESET_COMBOS.find((p) => p.id === presetId);
    if (preset) {
      this.crown = preset.crown;
      this.stripe = preset.stripe;
      this.base = preset.base;
      this.update();
      return preset;
    }
    return null;
  }

  getPrice() {
    return calculatePrice(this.crown, this.stripe, this.base);
  }

  getFormattedPrice() {
    return `$${this.getPrice().toFixed(2)}`;
  }

  getSummary() {
    return {
      crown: formatColorForDisplay(this.crown),
      stripe: formatColorForDisplay(this.stripe),
      base: formatColorForDisplay(this.base),
      price: this.getPrice(),
      formattedPrice: this.getFormattedPrice(),
    };
  }

  getImagePath() {
    return generateProductImagePath(this.crown, this.stripe, this.base);
  }

  update() {
    if (this.imageElement) {
      this.updateImage();
    }
    this.onUpdate(this.getSummary());
  }

  updateImage() {
    if (!this.imageElement) return;

    const imagePath = this.getImagePath();
    const img = new Image();

    img.onload = () => {
      this.imageElement.src = imagePath;
      this.imageElement.classList.remove("loading");
    };

    img.onerror = () => {
      // If specific combo image doesn't exist, use placeholder or preset image
      const preset = PRESET_COMBOS.find(
        (p) =>
          p.crown === this.crown &&
          p.stripe === this.stripe &&
          p.base === this.base,
      );
      this.imageElement.src = preset ? preset.image : this.placeholderImage;
      this.imageElement.classList.remove("loading");
    };

    this.imageElement.classList.add("loading");
    img.src = imagePath;
  }

  addToCart() {
    const summary = this.getSummary();
    const cartItem = {
      id: Date.now(),
      name: "Custom Handmade Beanie",
      price: summary.price,
      quantity: 1,
      image: this.getImagePath(),
      details: `Crown: ${summary.crown}, Stripe: ${summary.stripe}, Base: ${summary.base}`,
      colors: {
        crown: this.crown,
        stripe: this.stripe,
        base: this.base,
      },
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Dispatch event for cart badge update
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cartItem }));

    return cartItem;
  }
}

// ========================================
// EXPORT FOR MODULE USE
// ========================================
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    YARN_COLORS,
    ALL_COLORS,
    PRESET_COMBOS,
    BASE_PRICE,
    getColorById,
    calculatePrice,
    BeanieCustomizer,
  };
}

// Make available globally for non-module scripts
window.BeanieCustomizer = BeanieCustomizer;
window.YARN_COLORS = YARN_COLORS;
window.ALL_COLORS = ALL_COLORS;
window.PRESET_COMBOS = PRESET_COMBOS;
window.getColorById = getColorById;
