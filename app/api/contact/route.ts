import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  try {
    // Send email to portfolio owner
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'maafuzayodeji@gmail.com',
      subject: `New Portfolio Message from ${name}`,
      html: `
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    });

    // Send auto-reply to sender
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: `Thank you for contacting Maafuz Ismail`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00d4d4;">Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for contacting me through my portfolio. I've received your message and will get back to you within 24 hours.</p>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Your message:</h3>
            <p style="color: #666; font-style: italic;">"${message}"</p>
          </div>

          <p>Best regards,<br/>
          <strong>Maafuz Ismail</strong><br/>
          Full-Stack Engineer<br/>
          <a href="https://maafuz-portfolio.vercel.app" style="color: #00d4d4;">maafuz-portfolio.vercel.app</a></p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #888;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}