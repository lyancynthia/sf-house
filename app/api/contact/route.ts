import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  : null;

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  type: 'inquiry' | 'tour';
  message?: string;
  preferredDate?: string;
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as ContactRequest;

    if (!data.name || !data.email || !data.type) {
      return NextResponse.json(
        { success: false, message: '请填写必填字段' },
        { status: 400 }
      );
    }

    if (!data.email.includes('@')) {
      return NextResponse.json(
        { success: false, message: '请提供有效的电子邮箱地址' },
        { status: 400 }
      );
    }

    // Store in Supabase
    if (supabase) {
      try {
        await supabase.from('leads').insert({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          type: data.type,
          message: data.message || null,
          preferred_date: data.preferredDate || null,
        });
      } catch (err) {
        console.warn('Supabase insert failed:', err);
      }
    }

    // Send email notification
    if (resend) {
      const adminEmail = process.env.HOTEL_ADMIN_EMAIL || '<a href="mailto:cynthiayluo11@gmail.com" class="hover:underline">cynthiayluo11@gmail.com</a>';
      const typeLabel = data.type === 'tour' ? '看房预约' : '普通咨询';

      await resend.emails.send({
        from: 'SF Affordable Short Term Rentals <onboarding@resend.dev>',
        to: adminEmail,
        subject: `【${typeLabel}】${data.name} - SF Affordable Short Term Rentals`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #1B4D3E; color: white; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">SF Affordable Short Term Rentals</h1>
              <p style="margin: 8px 0 0; opacity: 0.8;">新客户${typeLabel}</p>
            </div>
            <div style="background: white; padding: 32px; border: 1px solid #E5E7EB; border-top: none; border-radius: 0 0 8px 8px;">
              <h2 style="color: #1B4D3E; margin-top: 0;">您收到一条新的${typeLabel}</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">姓名</td>
                  <td style="padding: 8px 0; color: #1A1A1A;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">邮箱</td>
                  <td style="padding: 8px 0; color: #1A1A1A;">${data.email}</td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">电话</td>
                  <td style="padding: 8px 0; color: #1A1A1A;">${data.phone}</td>
                </tr>
                ` : ''}
                ${data.preferredDate ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">期望日期</td>
                  <td style="padding: 8px 0; color: #1A1A1A;">${data.preferredDate}</td>
                </tr>
                ` : ''}
                ${data.message ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151; vertical-align: top;">留言</td>
                  <td style="padding: 8px 0; color: #1A1A1A;">${data.message}</td>
                </tr>
                ` : ''}
              </table>
              <p style="color: #6B7280; font-size: 12px; margin-top: 24px;">
                请尽快回复客户。
              </p>
            </div>
          </div>
        `,
      });

      // Auto-reply to customer
      await resend.emails.send({
        from: 'SF Affordable Short Term Rentals <onboarding@resend.dev>',
        to: data.email,
        subject: `【SF Affordable Short Term Rentals】我们已收到您的${typeLabel}，会尽快与您联系`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #1B4D3E; color: white; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">SF Affordable Short Term Rentals</h1>
              <p style="margin: 8px 0 0; opacity: 0.8;">旧金山酒店式公寓转租</p>
            </div>
            <div style="background: white; padding: 32px; border: 1px solid #E5E7EB; border-top: none; border-radius: 0 0 8px 8px;">
              <h2 style="color: #1B4D3E; margin-top: 0;">尊敬的 ${data.name}，</h2>
              <p style="color: #374151; line-height: 1.7;">
                感谢您的${typeLabel}！我们的团队已收到您的请求，
                会在 <strong>24小时内</strong> 与您取得联系。
              </p>
              <p style="color: #374151; line-height: 1.7;">
                如果您有任何紧急问题，欢迎直接回复此邮件。
              </p>
              <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;" />
              <p style="color: #6B7280; font-size: 13px;">
                <strong>联系方式：</strong><br />
                邮箱：${adminEmail}<br />
                网站：${process.env.NEXT_PUBLIC_SITE_URL || 'https://sfaffordableshortterm.com'}
              </p>
            </div>
            <div style="text-align: center; padding: 16px; color: #9CA3AF; font-size: 12px;">
              &copy; ${new Date().getFullYear()} SF Affordable Short Term Rentals. All rights reserved.
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: '您的请求已提交，我们会尽快与您联系！',
    });
  } catch (error: unknown) {
    console.error('Contact API error:', error);
    const message = error instanceof Error ? error.message : '未知错误';
    return NextResponse.json(
      { success: false, message: `提交失败: ${message}` },
      { status: 500 }
    );
  }
}
