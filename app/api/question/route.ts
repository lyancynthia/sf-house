import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(req: NextRequest) {
  try {
    const { name, email, question, phone } = (await req.json()) as {
      name: string;
      email: string;
      question: string;
      phone?: string;
    };

    if (!name || !email || !question) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all fields' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const adminEmail = process.env.HOTEL_ADMIN_EMAIL || 'cynthiayluo11@gmail.com';

    if (resend) {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: adminEmail,
        subject: `【Question】${name} - ${email}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1B4D3E;">New Question from Website</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold;">Name</td><td>${name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td>${email}</td></tr>
              ${phone ? `<tr><td style="padding: 8px 0; font-weight: bold;">Phone</td><td>${phone}</td></tr>` : ''}
              <tr><td style="padding: 8px 0; font-weight: bold;">Question</td></tr>
            </table>
            <div style="background: #F9FAFB; border-radius: 8px; padding: 16px; margin-top: 8px;">
              <p style="color: #374151; margin: 0; white-space: pre-wrap;">${question}</p>
            </div>
          </div>
        `,
      });

      // Send confirmation email to user
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Your question has been received',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #1B4D3E; color: white; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">SF Affordable Short Term Rentals</h1>
            </div>
            <div style="background: white; padding: 32px; border: 1px solid #E5E7EB; border-top: none; border-radius: 0 0 8px 8px;">
              <h2 style="color: #1B4D3E; margin-top: 0;">Hi ${name},</h2>
              <p style="color: #374151; line-height: 1.7;">
                Thank you for reaching out! I've received your question and will get back to you within 24 hours.
              </p>
              <div style="background: #F9FAFB; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <p style="color: #6B7280; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.5px;">Your question:</p>
                <p style="color: #374151; margin: 0; white-space: pre-wrap;">${question}</p>
              </div>
              <p style="color: #6B7280; font-size: 12px; margin-top: 24px;">
                For urgent matters, feel free to text Cynthia: <a href="tel:+14152839224" style="color: #1B4D3E;">+1 (415) 283-9224</a>
              </p>
              ${phone ? `<p style="color: #6B7280; font-size: 12px; margin-top: 8px;">Your phone: ${phone}</p>` : ''}
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, message: 'Question submitted successfully' });
  } catch (error) {
    console.error('Question submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit question' },
      { status: 500 }
    );
  }
}