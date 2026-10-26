// =============================================================================
// Web Developers — Studio Configuration & Content File
// Edit all text, packages, contact details, and client stories here.
// =============================================================================

window.SITE_CONFIG = {
  // Brand Basics
  brand: {
    name: "Web Developers",
    tagline: "Building ideas online",
    location: "Gokak, Karnataka 591307",
    region: "Gokak • Belagavi • North Karnataka",
    phoneDisplay: "+91 9XXXXXXXXX",
    phoneRaw: "919XXXXXXXXX",
    turnaround: "5–7 Days",
  },

  // WhatsApp Routing Helper
  whatsapp: {
    baseUrl: "https://wa.me/919XXXXXXXXX",
    defaultMessage: "Hello Web Developers! I have a shop in Gokak/North Karnataka and want to get a website with WhatsApp ordering.",
    packageMessage: (pkgName, price) => 
      `Hello Web Developers! I am interested in the ${pkgName} (${price}) for my business. Please share details on how we can get started.`,
  },

  // Scene 0 — Hero
  hero: {
    headlineLine1: "Your shop is open.",
    headlineLine2: "Your website isn't.",
    subheadline: "We build fast websites that send orders straight to your WhatsApp. No commission. Delivered in 5 to 7 days.",
    ctaPrimary: "Chat on WhatsApp",
    ctaSecondary: "See packages ↓",
    scrollCue: "Scroll to see the story",
  },

  // Scene 1 — The Lost Customer (Search without your site)
  scene1: {
    badge: "Search Intent • Customer In Town",
    query: "Your Business Name Gokak",
    captionTitle: "They searched for your name.",
    captionSubtitle: "Directories showed them your competitors.",
    body: "Whether you run a car service garage, machinery shop, clinic, clothing store, engineering firm, or restaurant: without your own website, search engines push your customers to directory portals that sell their phone numbers to your competitors.",
  },

  // Scene 2 — The Middleman Tax (Commission & Lead Cut)
  scene2: {
    badge: "The Middleman / Directory Tax",
    captionTitle: "You did the work.",
    captionSubtitle: "The middleman took the cut.",
    body: "Lead brokers, booking aggregators, and directory platforms charge 20% to 30% on your business. You pay for the rent, machinery, inventory, and staff—and they walk away with your margin.",
    sampleOrder: {
      dish1: "1x Service Booking / Product Order — ₹600",
      dish2: "1x Spare Parts / Materials / Consultation — ₹400",
      total: "₹1,000",
      cut: "₹280 (28% Platform / Lead Fee Cut)",
      kept: "₹720 Left for You",
    }
  },

  // Scene 3 — The Direct Switch (Your Official Website)
  scene3: {
    badge: "The Direct Switch",
    captionTitle: "Your website. Your customers.",
    captionSubtitle: "100% of the money in your pocket.",
    body: "Now imagine that exact customer finding your own official website. Clean photos, clear prices, and a big green 'Order / Inquire on WhatsApp' button. Zero commission. The entire ₹1,000 goes straight to your UPI.",
    counterSaved: "₹0 Commission Paid",
  },

  // Scene 4 — Orders & Inquiries Roll In Across Every Industry
  scene4: {
    badge: "Live Phone Counter",
    captionTitle: "Orders land on WhatsApp.",
    captionSubtitle: "Manage everything with one app you already use.",
    body: "No complicated merchant dashboard. No training staff on tablet POS software. Every reservation, car service booking, doctor consultation, machinery quote, or product order arrives as a clean itemized message on your phone.",
    incomingMessages: [
      { sender: "Auto Care & Garage (Car Service)", text: "Namaskara! Need full synthetic oil change & brake pad inspection for Hyundai Creta tomorrow 10 AM. Can I drop the car?", time: "8:42 PM" },
      { sender: "Industrial Hardware (Machinery & Spares)", text: "Hello, need quote for 5HP Submersible Pump set + 50m heavy duty cable. Is delivery to industrial area available?", time: "8:47 PM" },
      { sender: "Healthcare Clinic (Doctor Appointment)", text: "Hello doctor, want to book evening consultation appointment (6:30 PM) for dental cleaning & checkup.", time: "8:53 PM" },
      { sender: "Modern Apparel & Retail (Cloth Store)", text: "Hello! Need 6 formal linen shirts (Size 42) from your lookbook. Can you send payment QR code on WhatsApp?", time: "8:59 PM" },
    ]
  },

  // Scene 5 — The Work (Client Flagships)
  work: [
    {
      id: "dining",
      name: "Pure Veg Dining & Banquet System",
      type: "Hospitality & Rooftop Dining",
      location: "Active Client System • Gokak",
      result: "Direct WhatsApp food menu + 65-seat AC banquet booking engine.",
      stat: "100% Direct Orders",
      image: "images/terrace_thumb.jpg",
      url: "https://ozone-thereafter-recall-antarctica.trycloudflare.com",
      tags: ["Digital Menu", "WhatsApp Cart", "Banquet Booking", "4.1★ Maps Sync"]
    },
    {
      id: "sweets",
      name: "Heritage Food & Corporate Gifting Store",
      type: "Confectionery & Bulk Orders",
      location: "Active Client System • North Karnataka",
      result: "Pan-India festival gifting catalog + corporate bulk orders.",
      stat: "Pan-India Reach",
      image: "images/kalburgi_thumb.jpg",
      url: "#",
      tags: ["Corporate Gifting", "Bulk Order Flow", "UPI QR Checkout", "4.2★ Authority"]
    },
    {
      id: "jewels",
      name: "Bridal Gold & Diamond Lookbook",
      type: "Luxury Jewellery Showroom",
      location: "Active Client System • Gokak",
      result: "Interactive wedding lookbook allowing families to shortlist before visiting.",
      stat: "High-Ticket Inquiries",
      image: "images/punarvi_thumb.jpg",
      url: "#",
      tags: ["Bridal Lookbook", "Gold & Diamond Sets", "VIP Consultation", "4.8★ Trusted"]
    },
    {
      id: "apparel",
      name: "Modern Apparel & Retail Storefront",
      type: "Streetwear & Multi-Store Chain",
      location: "Active Client System • 3 Outlets",
      result: "Interactive garment catalog + 3-store city locator with live stock checks.",
      stat: "Tri-City Walk-ins",
      image: "images/styleheaven_thumb.jpg",
      url: "#",
      tags: ["Multi-Store Locator", "Garment Stack", "Instant Size Check", "60 FPS Motion"]
    },
    {
      id: "more-shops",
      name: "(And Many More Shops & Showrooms)",
      type: "Car Servicing • Machinery • Clinics • Retail",
      location: "Across Gokak & North Karnataka",
      result: "Custom WhatsApp catalog and direct appointment engines built for any local business.",
      stat: "25+ Local Systems",
      image: "fan-deck",
      url: "https://wa.me/919XXXXXXXXX",
      tags: ["Car Service", "Machinery", "Clinics", "Hardware", "Textiles"]
    }
  ],

  // Scene 6 — The Packages (Classic Agency Tiers)
  packages: [
    {
      id: "basic",
      name: "Basic",
      price: "₹12,000",
      cadence: "one-time",
      desc: "Perfect for small local shops, service counters, and personal brands.",
      popular: false,
      included: [
        "Up to 5 Custom Pages",
        "100% Mobile & Tablet Responsive",
        "Fast Loading Speed & Clean Code",
        "Direct WhatsApp Chat & Inquiry Button",
        "Google Maps Location & Click-to-Call",
        "1st Year Domain (.in / .com) Included",
        "1st Year Fast Cloud Hosting & SSL Included",
        "15 Days Free Edits & Friendly Support",
      ],
      whatsappPrefill: "Basic Package (₹12,000)",
    },
    {
      id: "standard",
      name: "Standard",
      price: "₹17,000",
      cadence: "one-time",
      desc: "Ideal for growing shops, showrooms, restaurants, and local businesses.",
      popular: true,
      tag: "Most Popular",
      included: [
        "Custom High-End Modern Design",
        "Custom Modern UI/UX Layout",
        "Mobile + Tablet Optimized",
        "Digital Product / Service Showcase",
        "Interactive WhatsApp Inquiry Form",
        "Google Maps & Local Search SEO Setup",
        "Social Media & Instagram Sync",
        "1st Year Domain & Fast Cloud Hosting Included",
        "3 Months Friendly Support & Edits",
      ],
      whatsappPrefill: "Standard Package (₹17,000)",
    },
    {
      id: "premium",
      name: "Premium",
      price: "₹22,000",
      cadence: "one-time",
      desc: "For established businesses and multi-branch showrooms.",
      popular: false,
      included: [
        "Premium Design & Smooth Motion",
        "Complete Flagship Showcase & Branding",
        "Deep Product / Service Catalog (Direct WhatsApp)",
        "Multi-Location Google Maps & Direct Routing",
        "Advanced Local SEO & Google Search Setup",
        "Counter QR Standee Printable Design",
        "1st Year Premium Domain & Fast Cloud Hosting Included",
        "6 Months Ongoing Priority Support & Edits",
      ],
      whatsappPrefill: "Premium Package (₹22,000)",
    },
    {
      id: "vip-blogger",
      name: "VIP + Local Blogger",
      price: "₹29,000",
      cadence: "one-time",
      desc: "Complete digital presence combined with a local blogger to visit and cover your business.",
      popular: false,
      tag: "Maximum Traction",
      included: [
        "Everything in Premium (₹22,000), plus:",
        "Local Blogger Visit to Cover Your Shop & Business",
        "Custom Promotional Reel for Instagram & WhatsApp Status",
        "Google Business Profile Review Acceleration Strategy",
        "Dedicated Day-1 Launch Push Across Town",
        "1st Year Premium Domain & Cloud Hosting Included",
        "1 Year Priority Technical Support & Upkeep",
      ],
      whatsappPrefill: "VIP + Local Blogger Package (₹29,000)",
    }
  ],

  // Scene 7 — Us vs. The Agency
  comparison: [
    {
      metric: "Delivery Speed",
      us: "5 to 7 Days",
      usNote: "Carefully built & tested, live next week",
      agency: "6 to 12 Weeks",
      agencyNote: "Endless meetings and delays",
    },
    {
      metric: "Total Cost",
      us: "₹12,000 – ₹29,000 (One-Time)",
      usNote: "Clear, transparent one-time pricing",
      agency: "₹75,000 to ₹1,50,000+",
      agencyNote: "Plus ₹10,000/month retainer fees",
    },
    {
      metric: "Domain & Cloud Hosting",
      us: "Included Free (1st Year)",
      usNote: "We handle DNS, SSL, and server setup",
      agency: "Surprise Extra Invoices",
      agencyNote: "Hidden charges for hosting & SSL certificates",
    },
    {
      metric: "Order Management",
      us: "Your WhatsApp Phone",
      usNote: "Zero learning curve, works on any phone",
      agency: "Complex Software Portals",
      agencyNote: "Confusing dashboards nobody on staff uses",
    },
    {
      metric: "Ongoing Commissions",
      us: "0% Commission Ever",
      usNote: "Every rupee lands in your account",
      agency: "25% to 30% App Dependence",
      agencyNote: "Swiggy and Zomato keep taking a bite",
    },
  ],

  // Scene 8 — The Close
  close: {
    headline: "Ready to be the most popular shop in town?",
    subheadline: "Message us on WhatsApp. We'll check your Google ranking and share a custom preview plan for your business.",
    cta: "Message on WhatsApp (+91 9XXXXXXXXX) →",
    phoneNote: "Direct line: +91 9XXXXXXXXX • Varadai Complex, Gokak",
  }
};
