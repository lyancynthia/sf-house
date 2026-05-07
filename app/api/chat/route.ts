import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// English fallback responses when API is unavailable
const FALLBACK_RESPONSES: Record<string, string> = {
  'greeting': `Hi! Welcome to SF Affordable Short Term Rentals! 🏠

I'm your AI concierge for San Francisco hotel sublease rooms.

📍 Location: 4 min walk to Powell BART
💰 Price: $1,350~$1,850/mo
✅ Minimum 1 month stay

I can help you with:
• Room details and pricing
• Tour scheduling
• Direct booking

For fastest response, reach out to Cynthia directly.`,

  'listings': `Our rooms are at The Herbert Hotel, 4 min walk to Powell BART:

**Room A: Private Room + Private Bathroom**
• $1,850/mo/person
• Deposit: $1,850 (fully refundable)
• Queen bed, private bathroom
• Available from April 8, 2026

**Room B: Private Room + Shared Bathroom (Recommended)** ⭐
• $1,350/mo/person
• Deposit: $1,350 (fully refundable)
• Queen bed, 6 rooms share 2 bathrooms (cleaned multiple times daily)
• Available now

🔑 Minimum stay: 1 month
👥 2 guests: price increases due to insurance — reach out to Cynthia for details

Need help choosing? Reach out to Cynthia directly!`,

  'tour': `Scheduling a tour is easy!

📅 Tours available on weekdays, every 30 min (9am–2:30pm)
📍 Location: The Herbert Hotel

**Recommended steps:**
1. Text Cynthia directly
2. Tell her your preferred time and contact info
3. Cynthia will arrange everything

Tours are available on weekdays — come see for yourself!`,

  'booking': `Ready to book? Great! Please provide:

1. **Name** (your full legal name)
2. **Email** (for receiving the lease)
3. **Phone** (for follow-up)
4. **Move-in date** (preferred)
5. **Duration** (how many months)
6. **Room preference** (private bath or shared bath)

Or reach out to Cynthia directly for fastest booking!

💡 Tips:
• Deposit is fully refunded on move-out
• Pay via Zelle or PayPal
• Minimum 1 month
• Check-in: after 3pm (need to pay + sign 2 days in advance)`,

  'payment': `Payment details:

💰 **Rent Payment**
• **Zelle**: contact Cynthia for details
• **PayPal**: contact Cynthia for details

⚠️ PayPal fees are the sender's responsibility — we need to receive the exact amount.

📧 After signing the lease, complete payment to confirm your booking.`,

  'default': `Hi there! Thanks for reaching out.

I can help you with:
• 📋 Room details and pricing
• 📅 Tour scheduling (weekdays 9am–2:30pm)
• ✅ Direct booking

For fastest response, reach out to Cynthia directly! 🏠`,
};

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('room') || lower.includes('available') || lower.includes('what do you have') || lower.includes('listing') || lower.includes('房源')) {
    return FALLBACK_RESPONSES['listings'];
  }
  if (lower.includes('tour') || lower.includes('看房') || lower.includes('visit') || lower.includes('see') || lower.includes('schedule')) {
    return FALLBACK_RESPONSES['tour'];
  }
  if (lower.includes('book') || lower.includes('预订') || lower.includes('rent') || lower.includes('reserve')) {
    return FALLBACK_RESPONSES['booking'];
  }
  if (lower.includes('payment') || lower.includes('pay') || lower.includes('zelle') || lower.includes('transfer') || lower.includes('支付')) {
    return FALLBACK_RESPONSES['payment'];
  }
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.includes('你好') || lower.includes('您好')) {
    return FALLBACK_RESPONSES['greeting'];
  }

  return FALLBACK_RESPONSES['default'];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [] } = body as { message: string; history: Message[] };

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message cannot be empty' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    // If no API key, use fallback immediately
    if (!apiKey) {
      return NextResponse.json({ response: getFallbackResponse(message) });
    }

    const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.minimax.chat/v1';
    const model = process.env.OPENAI_MODEL || 'abab6.5s-chat';

    const SYSTEM_PROMPT = `You are an AI concierge for SF Affordable Short Term Rentals — a San Francisco hotel sublease service.

## Basic Info
- Location: The Herbert Hotel, San Francisco, CA 94105
- 4 min walk to Powell BART
- Safe: I and my friends have been living here for months
- We operate 3 hotels within 1-2 min walk of each other, amenities shared

## Room Options (only 2 rooms)

### Room A: Private Room + Private Bathroom
- $1,850/mo/person
- Deposit: $1,850 (fully refundable)
- Queen bed, private bathroom
- Available from April 8, 2026

### Room B: Private Room + Shared Bathroom (Recommended)
- $1,350/mo/person
- Deposit: $1,350 (fully refundable)
- Queen bed, 6 rooms share 2 bathrooms (cleaned multiple times daily)
- Available now

## Important Notes
- Minimum stay: 1 month, flexible move-in date
- Less than 1 month: please do not reach out
- 2 guests: price increases due to insurance — contact Cynthia
- Room amenities: table, chair, closet, shared kitchen, laundry, lobby (work/meeting/dining)
- All amenities available at all 3 hotels

## Payment Info
- Zelle: contact Cynthia for details
- PayPal: contact Cynthia for details
- PayPal fees are the sender's responsibility

## Booking Process
1. Contact Cynthia directly with your name, email, timeline, nationality, occupation, preferred room
2. For tours: available on weekdays 9am–2:30pm
3. Confirm booking: sign lease + make payment
4. Check-in at Hotel Stratford front desk (bring physical ID, after 3pm)

## Contact
- Reach out to Cynthia directly for any inquiries

## Response Rules
1. Always reply in English
2. When asked about rooms, give detailed comparison of both options
3. For tour requests, mention weekday availability and recommend texting Cynthia
4. For booking, collect: name, email, phone, timeline, nationality, occupation, move-in date, duration
5. If user needs human help, tell them to reach out to Cynthia directly
6. Remind: less than 1 month — please do not reach out
7. Never display phone numbers or email addresses in your responses
8. Keep responses concise, well-formatted with line breaks
9. Can answer questions about SF transit, safety, community`;

    const allMessages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-10).map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    const response = await fetch(`${baseUrl}/text/chatcompletion_v2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: allMessages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as {
        error?: { message?: string; type?: string };
      };
      const errorType = errorData?.error?.type || '';
      const errorMsg = errorData?.error?.message || `API error: ${response.status}`;

      if (errorType === 'insufficient_balance_error' || errorMsg.includes('insufficient balance')) {
        return NextResponse.json({ response: getFallbackResponse(message) });
      }

      return NextResponse.json({ response: getFallbackResponse(message) });
    }

    const data = await response.json() as {
      choices?: Array<{
        message?: { content?: string };
      }>;
    };

    const responseText = data.choices?.[0]?.message?.content?.trim();
    if (!responseText) {
      return NextResponse.json({ response: getFallbackResponse(message) });
    }

    return NextResponse.json({ response: responseText });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Chat API error:', errorMsg);
    return NextResponse.json({ response: getFallbackResponse('default') });
  }
}