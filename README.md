# Web Developers — Storytelling Agency Landing Page
> **Studio**: Web Developers  
> **Tagline**: Building ideas online  
> **Location**: Gokak, Karnataka, India  
> **Primary Conversion**: Direct WhatsApp Inquiries (`+91 91089 78522`)

---

## Overview

This is an award-caliber (Awwwards / FWA style) scroll-driven storytelling landing page built to sell websites to local business owners across Gokak, Belagavi, and North Karnataka.

Instead of generic template cards or feature lists, it takes visitors through a **7-act narrative**:
1. **Scene 0 (Hero)**: "Your shop is open. Your website isn't."
2. **Scene 1 (9 PM, Someone is Hungry)**: A customer searches on Google and finds outdated directories with competitor ads.
3. **Scene 2 (The Commission Meter)**: Delivery apps taking ₹280 on a ₹1,000 order.
4. **Scene 3 (The Switch)**: Switching to the owner's own official fast site where 100% of the money stays with them.
5. **Scene 4 (Orders Roll In)**: WhatsApp chat bubbles stacking with real customer orders.
6. **Scene 5 (The Work)**: Pinned horizontal scroll through 4 local flagships (Terrace Town Kitchen 29, Kalburgi Karadantu & Sweets, Punarvi Jewels Showroom, Style Heaven Menswear).
7. **Scene 6 (The Prices)**: Editorial offset layout of 4 transparent packages (₹12k, ₹17k, ₹22k, ₹29k).
8. **Scene 7 (Us vs. The Agency)**: Split timeline comparing 48-hour delivery vs. 6-12 week agency delays.
9. **Scene 8 (The Close)**: "Ready to be the most popular shop in town?" + Massive magnetic WhatsApp button.

---

## How to Edit Text, Prices, and Contact Details

All website copy, phone numbers, WhatsApp messages, package rates, and client details are managed in **ONE single file**:

📄 **`site.config.js`**

### Examples:
- To update the WhatsApp number: change `phoneRaw: "919108978522"` and `phoneDisplay`.
- To update package pricing: edit the `packages` array inside `site.config.js`.
- To change client showcase details: edit the `work` array inside `site.config.js`.

---

## How to Run Locally

You can run this project with Python's built-in HTTP server or any local static server:

```bash
# Using Python
cd "d:\website project\agency-portfolio"
python -m http.server 8092

# Or using Node / npx
npx serve .
```

Open `http://localhost:8092` in your browser.

---

## Tech Stack

- **HTML5 & CSS3**: Pure bespoke warm paper cream (`#F4EFE6`), ink (`#111111`), signal green (`#19C37D`), and commission red (`#E5412D`).
- **Typography**: Google Fonts `Instrument Serif` (Display), `Bricolage Grotesque` (Body), and `JetBrains Mono` (Metadata).
- **GSAP + ScrollTrigger**: Scroll-driven storytelling, typing simulation, commission meter scrub, and pinned horizontal gallery.
- **Lenis**: Smooth inertial scrolling synced with GSAP ScrollTrigger.
- **Responsive**: Mobile-first design tested at 360px, 390px, 768px, and 1440px with zero horizontal overflow.
