# SF House - San Francisco Hotel Sublease Platform

A modern Next.js web application for a San Francisco hotel sublease booking platform featuring an AI chatbot, lease generation, and CRM integration.

## Features

- **AI Chatbot** — Conversational interface powered by Claude API for property discovery, tour scheduling, and bookings
- **Property Listings** — Browse available sublease units with details and pricing
- **Multi-step Booking** — Streamlined reservation flow with lease generation
- **Tour Scheduler** — Book property tours with email notifications
- **CRM** — All customer data stored in Supabase
- **Email Automation** — Lease documents and notifications sent via Resend
- **Fully Responsive** — Mobile-first design with premium hotel aesthetic

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Anthropic Claude API
- Supabase (Database + Storage)
- Resend (Transactional Email)
- Vercel (Deployment)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Accounts: Anthropic, Supabase, Resend

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd sf-house

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Fill in your credentials in .env.local
```

### Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Anthropic Claude API key |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `RESEND_API_KEY` | Resend API key |
| `HOTEL_ADMIN_EMAIL` | Admin notification email |
| `NEXT_PUBLIC_SITE_URL` | Public site URL |

### Deployment to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
vercel env add ANTHROPIC_API_KEY
vercel env add SUPABASE_URL
# ... etc

# Production deploy
vercel --prod
```

## Project Structure

```
sf-house/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── chat/          # AI chatbot endpoint
│   │   ├── lease/         # Lease generation
│   │   └── contact/       # Contact form handler
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Chatbot.tsx        # AI chatbot widget
│   ├── Header.tsx         # Navigation header
│   ├── HeroSection.tsx    # Hero banner
│   ├── PropertyListings.tsx # Property cards
│   ├── BookingForm.tsx    # Multi-step booking
│   ├── TourScheduler.tsx  # Tour booking
│   └── ui/                # shadcn-style primitives
├── lib/                   # Utilities
│   ├── supabase.ts        # Supabase client
│   ├── resend.ts          # Resend client
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Helper functions
├── templates/             # Email & lease templates
└── public/               # Static assets
```

## Supabase Setup

### Database Schema

Run the following SQL in the Supabase SQL Editor:

```sql
-- Leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  type TEXT NOT NULL CHECK (type IN ('inquiry', 'tour', 'booking')),
  property_id TEXT,
  message TEXT,
  preferred_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  property_id TEXT NOT NULL,
  move_in_date DATE NOT NULL,
  duration_months INT NOT NULL,
  lease_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (configure policies as needed)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
```

## License

MIT
