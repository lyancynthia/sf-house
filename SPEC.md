# SF Hotel Sublease Platform - Project Specification

## 1. Project Overview

**Project Name:** SF House
**Type:** Full-stack Web Application
**Core Functionality:** A San Francisco hotel sublease booking platform with an AI chatbot that helps prospective tenants discover properties, schedule tours, and complete lease agreements. All customer interactions are consolidated into one CRM system.
**Target Users:** International tenants seeking short-to-medium term housing in San Francisco, primarily Chinese-speaking professionals and students.
**Deployment:** Vercel

---

## 2. Design Language

### Aesthetic Direction
Warm, professional hotel aesthetic blending San Francisco's sophisticated urban energy with a welcoming, home-like feel. Think boutique hotel meets modern SaaS — premium without being cold.

### Color Palette
| Role | Name | Hex |
|------|------|-----|
| Primary | Deep Forest Green | `#1B4D3E` |
| Primary Light | Sage | `#77A58C` |
| Accent | Warm Gold | `#D4A853` |
| Background | Warm White | `#FAFAF8` |
| Surface | Pure White | `#FFFFFF` |
| Text | Deep Charcoal | `#1A1A1A` |
| Text Muted | Gray | `#6B7280` |
| Border | Light Gray | `#E5E7EB` |
| Success | Emerald | `#10B981` |
| Error | Rose | `#EF4444` |

### Typography
- **Headings:** "DM Serif Display" — elegant serif with character, Google Fonts
- **Body:** "Inter" — clean, highly readable sans-serif, Google Fonts
- **Fallbacks:** Georgia, system-ui

### Spatial System
- Base unit: 4px
- Content max-width: 1280px
- Section padding: 80px vertical (desktop), 48px (mobile)
- Card border-radius: 12px
- Button border-radius: 8px

### Motion Philosophy
- Entrance animations: fade-in + slide-up on scroll (IntersectionObserver)
- Chat panel: slides up from bottom-right with 0.3s ease-out
- Hover states: subtle scale(1.02) + shadow lift on cards
- Typing indicator: pulsing dots animation
- Page transitions: no jarring changes

### Visual Assets
- Icons: Lucide React (consistent 24px stroke icons)
- Images: Unsplash high-quality SF/hotel imagery via CDN
- Decorative: subtle gradient overlays, gold accent lines

---

## 3. Layout Structure

### Page Architecture
```
Header (sticky, transparent → solid on scroll)
├── Logo + Brand
├── Navigation links
└── CTA button ("预约看房")

Hero Section (full-viewport)
├── Headline (Chinese)
├── Subheadline
├── Primary CTA + Secondary CTA
└── Background image with overlay

Property Listings (scroll-animated grid)
├── Section title
└── 3-column card grid (1 on mobile)

How It Works (3-step horizontal layout)
Features Section (icon + text grid)
Booking Form (multi-step, modal or section)
Tour Scheduler (inline component)
Footer
└── Contact info, links, social
```

### Responsive Strategy
- Mobile-first breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Single column on mobile, multi-column on tablet/desktop
- Chatbot: full-screen on mobile, fixed 400x600px panel on desktop

---

## 4. Features & Interactions

### 4.1 AI Chatbot
**Trigger:** Floating bubble in bottom-right corner (green with chat icon)

**States:**
- Closed: 56px circle with chat icon, subtle pulse on first visit
- Open: 400x600px panel on desktop, full-screen on mobile
- Typing: Three animated dots in AI message bubble

**Quick Actions (shown at start of conversation):**
- "了解房源" — Browse property listings
- "预约看房" — Schedule a tour
- "直接预订" — Make a direct booking

**Conversation Flow:**
1. User selects quick action or types freely
2. AI responds in Chinese with relevant info
3. For booking intents, AI collects info progressively (name → email → date → phone)
4. On booking confirmation, AI triggers /api/lease endpoint
5. Success message shown with next steps

**Data Flow:**
- Messages stored in localStorage for session persistence
- Booking submissions stored in Supabase
- Email notifications sent via Resend

### 4.2 Property Listings
- Cards display: image, property name, location, price, key amenities
- Hover: scale(1.02) + shadow elevation
- Click: opens detail modal or scrolls to booking form
- Data from static array (expandable to Supabase)

### 4.3 Booking Form (Multi-Step)
- Step 1: Select property (card selection)
- Step 2: Personal info (name, email, phone, move-in date, duration)
- Step 3: Review & confirm
- Progress indicator shown
- Client-side validation before submission
- Submits to /api/lease

### 4.4 Tour Scheduler
- Inline date picker (HTML date input, styled)
- Fields: name, email, phone, preferred date/time
- Submits to /api/contact with type="tour"
- Confirmation toast shown after submission

### 4.5 Contact Form
- General inquiry form in footer/section
- Fields: name, email, subject, message
- Submits to /api/contact

---

## 5. Component Inventory

### Chatbot
- **Default:** Floating green bubble, bottom-right
- **Hover:** Scale up slightly, shadow
- **Open:** Full chat panel slides up
- **Loading:** Animated dots in AI message

### PropertyCard
- **Default:** White card, image, title, price, amenities
- **Hover:** Lift shadow, scale(1.02)
- **Loading:** Skeleton placeholder

### Button
- **Primary:** Green bg (#1B4D3E), white text
- **Secondary:** Outlined green border
- **Ghost:** Transparent, green text
- **Disabled:** Grayed out, no pointer events
- **Loading:** Spinner icon

### Input / Textarea
- Border: #E5E7EB, focus: #1B4D3E with ring
- Error: Red border + error message below

### Badge
- Variants: default, success, warning
- Small rounded pill

---

## 6. Technical Architecture

### Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** Anthropic Claude API (via @anthropic-ai/sdk)
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage (lease PDFs)
- **Email:** Resend
- **Deployment:** Vercel

### API Design

#### POST /api/chat
Request:
```json
{ "message": "string", "history": [{ "role": "user"|"assistant", "content": "string" }] }
```
Response:
```json
{ "response": "string", "suggestedAction?: "listing"|"tour"|"booking" }
```

#### POST /api/lease
Request:
```json
{ "name": "string", "email": "string", "phone": "string", "propertyId": "string", "moveInDate": "string", "duration": "number" }
```
Response:
```json
{ "success": boolean, "leaseUrl?: string", "message?: "string" }
```

#### POST /api/contact
Request:
```json
{ "name": "string", "email": "string", "phone": "string", "type": "inquiry"|"tour", "message": "string", "preferredDate?: "string" }
```
Response:
```json
{ "success": boolean, "message": "string" }
```

### Data Model (Supabase)

**leads**
- id (uuid)
- name (text)
- email (text)
- phone (text)
- type (enum: inquiry, tour, booking)
- property_id (text)
- message (text)
- preferred_date (timestamptz)
- created_at (timestamptz)

**bookings**
- id (uuid)
- lead_id (uuid FK)
- property_id (text)
- move_in_date (date)
- duration_months (int)
- lease_url (text)
- status (enum: pending, confirmed, cancelled)
- created_at (timestamptz)

### Environment Variables
- ANTHROPIC_API_KEY — Claude API key
- SUPABASE_URL — Supabase project URL
- SUPABASE_ANON_KEY — Supabase anonymous key (client-safe)
- SUPABASE_SERVICE_ROLE_KEY — Supabase service role (server-only)
- RESEND_API_KEY — Resend API key
- HOTEL_ADMIN_EMAIL — Admin notification email
- NEXT_PUBLIC_SITE_URL — Public site URL for emails

### Claude Prompt Strategy
System prompt instructs Claude to:
- Always respond in Simplified Chinese
- Act as a knowledgeable SF hotel concierge
- Help users discover properties, understand amenities, book tours
- Collect booking information progressively
- Be warm, professional, and concise
- Include specific property details when relevant
- Trigger tour/booking actions when user confirms intent
