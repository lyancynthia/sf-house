import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  : null;

interface LeaseRequest {
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  moveInDate: string;
  duration: number;
  nationality?: string;
  occupation?: string;
  timeline?: string;
  intro?: string;
}

const PROPERTY_MAP: Record<string, { name: string; address: string; price: number; priceTwoGuests: number; deposit: number }> = {
  'private-bath': {
    name: 'Private Room + Private Bathroom',
    address: 'The Herbert Hotel, San Francisco, CA 94105',
    price: 1850,
    priceTwoGuests: 2350,
    deposit: 1850,
  },
  'shared-bath': {
    name: 'Private Room + Shared Bathroom',
    address: 'The Herbert Hotel, San Francisco, CA 94105',
    price: 1350,
    priceTwoGuests: 1650,
    deposit: 1350,
  },
};

function generateLease(data: LeaseRequest, property: typeof PROPERTY_MAP[string]): string {
  const endDate = new Date(data.moveInDate);
  endDate.setMonth(endDate.getMonth() + data.duration);
  const executionDate = new Date().toISOString().split('T')[0];

  const moveInFormatted = new Date(data.moveInDate + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const endFormatted = endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return `# SAN FRANCISCO HOTEL SUBLEASE AGREEMENT

Agreement No.: _______________
Execution Date: ${executionDate}
Jurisdiction: San Francisco, California, USA

---

## ARTICLE I — PARTIES

### 1.1 Landlord

Name: Cynthia Luo (Yan Luo)
Contact: iMessage/Text <a href="tel:+14152839224" class="hover:underline">+1 (415) 283-9224</a> | Email <a href="mailto:cynthiayluo11@gmail.com" class="hover:underline">cynthiayluo11@gmail.com</a>
(hereinafter referred to as "Landlord")

### 1.2 Tenant

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
${data.nationality ? `Nationality: ${data.nationality}` : ''}
${data.occupation ? `Occupation: ${data.occupation}` : ''}
${data.timeline ? `Timeline: ${data.timeline}` : ''}

(hereinafter referred to as "Tenant")

---

## ARTICLE II — PREMISES

### 2.1 Property Address

${property.address}

### 2.2 Room Type

${property.name}

### 2.3 Amenities

- In-room: Queen bed, table, chair, closet
- Shared: Kitchen, laundry (washer/dryer)
- Common areas: Large lobby (work/meeting/dining)

Note: We operate three hotels, all within a 1-2 min walk. Amenities are shared among all properties.

---

## ARTICLE III — LEASE TERM

### 3.1 Move-In Date
${moveInFormatted} (${data.moveInDate})

### 3.2 Move-Out Date
${endFormatted} (${endDate.toISOString().split('T')[0]})

### 3.3 Duration
This agreement is for **${data.duration} month${data.duration > 1 ? 's' : ''}**.

Minimum stay: 1 month. Move-in date is flexible.

### 3.4 Renewal
To renew, Tenant must give Landlord at least 30 days written notice before lease end.

---

## ARTICLE IV — RENT AND PAYMENT

### 4.1 Monthly Rent
Tenant agrees to pay **$${property.price} USD/month** for 1 guest.
For 2 guests sharing one room: **$${property.priceTwoGuests} USD/month** (insurance required).

### 4.2 Security Deposit
Deposit: **$${property.deposit} USD** (one month rent)
Deposit is fully refundable upon move-out, provided no damage and agreed timeline is met.

### 4.3 Payment Methods

| Method | Account |
|--------|---------|
| Zelle | <a href="tel:+14152839224" class="hover:underline">4152839228</a> (Yan Luo) |
| PayPal | <a href="mailto:cynthiayluo11@gmail.com" class="hover:underline">cynthiayluo11@gmail.com</a> (Yan Luo) |

Note: PayPal processing fees are the sender's responsibility. Our side needs to receive the exact amount.

---

## ARTICLE V — MOVE-IN PROCEDURE

### 5.1 Booking Confirmation
Booking is confirmed once lease is signed and payment is received.

### 5.2 Check-in Location
**Hotel Stratford (front desk shared)**

Bring your physical ID. The front desk will provide a printed lease for in-person signing.

Note: The front desk serves all affiliated hotels. For living assistance after check-in, visit Hotel Stratford front desk.

### 5.3 Check-in Time
Check-in is available after **3:00 PM** on your lease start date.

For early check-in (before 3pm), you must:
- Complete payment and signature at least 2 days before move-in date
- Notify Cynthia in advance

---

## ARTICLE VI — SECURITY DEPOSIT RETURN

Deposit is fully refundable. Return conditions:
- No damage to the room
- Timeline met as agreed
- No outstanding bills

Deposit will be returned within 14 business days after move-out.

Deductions may include:
- Damage beyond normal wear
- Unpaid utility bills
- Cleaning fee if room is not returned to move-in cleanliness standard

---

## ARTICLE VII — HOUSE RULES

Tenant agrees to the following:

1. **Minimum stay**: 1 month. Stays less than 1 month — do not reach out.
2. **No smoking** inside any area
3. **Pet policy**: Contact manager for approval
4. **Quiet hours**: After 10pm, please keep noise down
5. **Guests**: Overnight guests allowed with prior notice (max 3 nights per visit)
6. **Facility care**: Handle all facilities with care
7. **Cleanliness**: Keep the room clean and dispose of garbage properly
8. **Security**: Lock doors and windows when leaving
9. **Internet**: For daily use only, no illegal activities
10. **2 guests**: $1,650/mo (shared bath) / $2,350/mo (private bath) — price increases due to insurance

---

## ARTICLE VIII — CONTACTS

### Landlord (Cynthia)
- iMessage/Text (preferred): <a href="tel:+14152839224" class="hover:underline">+1 (415) 283-9224</a>
- Email: <a href="mailto:cynthiayluo11@gmail.com" class="hover:underline">cynthiayluo11@gmail.com</a>

### Front Desk
Hotel Stratford (shared front desk for all affiliated hotels)

### Ongoing Matters
- Extended stays, payments, room changes → Text Cynthia directly
- Other questions → Hotel Stratford front desk

---

## ARTICLE IX — EARLY TERMINATION

To terminate early:
1. Give at least 30 days written notice
2. Deposit returned after deductions for applicable charges

---

## ARTICLE X — INSURANCE & PRICE ADJUSTMENT

If two guests share one room, price increases due to expanded insurance coverage. Contact Cynthia for details.

**Price Update (effective May 7, 2026 or move-in after June 1, 2026):** All room prices increase by $200/room/month.
- Option 1 (Shared Bath): $1,550/mo (1 person) / $1,850/mo (2 people)
- Option 2 (Private Bath): $2,050/mo (1 person) / $2,550/mo (2 people)

Book now to lock in current rates!

---

## ARTICLE XI — MISCELLANEOUS

1. This agreement constitutes the entire agreement between parties.
2. Any modifications require written consent from both parties.
3. If any provision is invalid, remaining provisions remain in effect.
4. This agreement is governed by California law.

---

## SIGNATURES

### Landlord

Signature: _________________________
Name: Cynthia Luo (Yan Luo)
Date: _________________________

### Tenant

Signature: _________________________
Name: ${data.name}
Date: _________________________

---

*This document was AI-assisted. Specific terms are subject to the final signed version.*

Cynthia Luo | <a href="tel:+14152839224" class="hover:underline">+1 (415) 283-9224</a> | <a href="mailto:cynthiayluo11@gmail.com" class="hover:underline">cynthiayluo11@gmail.com</a>
The Herbert Hotel, San Francisco, CA 94105
`;
}

async function sendLeaseEmail(
  email: string,
  name: string,
  leaseContent: string,
  propertyName: string,
  phone?: string,
  moveInDate?: string,
  duration?: number,
  nationality?: string,
  occupation?: string,
  intro?: string
) {
  if (!resend) {
    console.log('Resend not configured, skipping email');
    return;
  }

  const adminEmail = process.env.HOTEL_ADMIN_EMAIL || '<a href="mailto:cynthiayluo11@gmail.com" class="hover:underline">cynthiayluo11@gmail.com</a>';

  try {
    await resend.emails.send({
      from: 'SF Affordable Short Term Rentals <onboarding@resend.dev>',
      to: email,
      subject: `[SF Affordable Short Term Rentals] Your Sublease Agreement — ${propertyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1B4D3E; color: white; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">SF Affordable Short Term Rentals</h1>
            <p style="margin: 8px 0 0; opacity: 0.8;">San Francisco Hotel Sublease</p>
          </div>
          <div style="background: white; padding: 32px; border: 1px solid #E5E7EB; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1B4D3E; margin-top: 0;">Dear ${name},</h2>
            <p style="color: #374151; line-height: 1.7;">
              Thank you for your booking! Your sublease agreement is ready — see below.
            </p>
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;" />
            <h3 style="color: #1B4D3E;">Sublease Agreement:</h3>
            <pre style="background: #F9FAFB; padding: 16px; border-radius: 6px; font-size: 12px; overflow-x: auto; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word; max-height: 400px; overflow-y: auto;">${leaseContent.slice(0, 3000)}${leaseContent.length > 3000 ? '\n...(content truncated)' : ''}</pre>
            <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px; padding: 16px; margin-top: 20px;">
              <h4 style="color: #166534; margin: 0 0 8px;">Payment Details</h4>
              <p style="color: #15803D; font-size: 14px; margin: 0;">
                <strong>Zelle:</strong> <a href="tel:+14152839224" class="hover:underline">4152839228</a> (Yan Luo)<br/>
                <strong>PayPal:</strong> <a href="mailto:cynthiayluo11@gmail.com" class="hover:underline">cynthiayluo11@gmail.com</a> (Yan Luo)
              </p>
              <p style="color: #166534; font-size: 12px; margin: 8px 0 0;">
                PayPal fees are the sender&apos;s responsibility — we need to receive the exact amount.
              </p>
            </div>
            <p style="color: #6B7280; font-size: 12px; margin-top: 24px;">
              For questions, text Cynthia: <a href="tel:+14152839224" class="hover:underline">+1 (415) 283-9224</a>
            </p>
          </div>
          <div style="text-align: center; padding: 16px; color: #9CA3AF; font-size: 12px;">
            &copy; ${new Date().getFullYear()} SF Affordable Short Term Rentals. All rights reserved.
          </div>
        </div>
      `,
    });

    await resend.emails.send({
      from: 'SF Affordable Short Term Rentals <onboarding@resend.dev>',
      to: adminEmail,
      subject: `【New Booking】${name} - ${propertyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1B4D3E;">New Booking Notification</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold;">Name</td><td>${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td>${email}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Phone</td><td>${phone || 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Room</td><td>${propertyName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Move-in</td><td>${moveInDate || 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Duration</td><td>${duration ? `${duration} month${duration > 1 ? 's' : ''}` : 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Nationality</td><td>${nationality || 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Occupation</td><td>${occupation || 'N/A'}</td></tr>
            ${intro ? `<tr><td style="padding: 8px 0; font-weight: bold;">About</td></tr><tr><td colspan="2" style="padding: 8px 0 8px 16px; color: #374151;">${intro}</td></tr>` : ''}
          </table>
        </div>
      `,
    });
  } catch (err) {
    console.error('Failed to send email:', err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as LeaseRequest;

    if (!data.name || !data.email || !data.phone || !data.propertyId || !data.moveInDate || !data.duration) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    if (!data.email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const property = PROPERTY_MAP[data.propertyId];
    if (!property) {
      return NextResponse.json(
        { success: false, message: 'Invalid room ID' },
        { status: 400 }
      );
    }

    const leaseContent = generateLease(data, property);

    let leaseUrl: string | null = null;
    if (supabase) {
      try {
        const fileName = `leases/${data.email}_${Date.now()}.txt`;
        const { data: uploadData, error } = await supabase.storage
          .from('leases')
          .upload(fileName, leaseContent, { contentType: 'text/plain' });

        if (!error && uploadData) {
          const { data: urlData } = supabase.storage
            .from('leases')
            .getPublicUrl(fileName);
          leaseUrl = urlData.publicUrl;
        }
      } catch (err) {
        console.warn('Supabase storage upload failed:', err);
      }

      try {
        await supabase.from('leads').insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          type: 'booking',
          property_id: data.propertyId,
          preferred_date: data.moveInDate,
        });
      } catch (err) {
        console.warn('Supabase leads insert failed:', err);
      }

      try {
        await supabase.from('bookings').insert({
          property_id: data.propertyId,
          move_in_date: data.moveInDate,
          duration_months: data.duration,
          lease_url: leaseUrl,
          status: 'pending',
        });
      } catch (err) {
        console.warn('Supabase bookings insert failed:', err);
      }
    }

    await sendLeaseEmail(data.email, data.name, leaseContent, property.name, data.phone, data.moveInDate, data.duration, data.nationality, data.occupation, data.intro);

    return NextResponse.json({
      success: true,
      leaseUrl,
      message: 'Lease sent. We\'ll contact you within 24 hours.',
    });
  } catch (error: unknown) {
    console.error('Lease generation error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, message: `Failed: ${message}` },
      { status: 500 }
    );
  }
}