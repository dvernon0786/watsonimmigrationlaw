import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    // Check if API key is available
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured. Email functionality disabled.');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { name, email, phone, message, visaType, preferredContact } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Send email to firm
    const { data, error } = await resend.emails.send({
      from: 'Watson Immigration Law <contact@watsonimmigrationlaw.com>',
      to: ['contact@watsonimmigrationlaw.com'],
      subject: `New Contact Form Submission - ${visaType || 'General Inquiry'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Visa Type:</strong> ${visaType || 'Not specified'}</p>
        <p><strong>Preferred Contact:</strong> ${preferredContact || 'Not specified'}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    const { data: confirmationData, error: confirmationError } = await resend.emails.send({
      from: 'Watson Immigration Law <contact@watsonimmigrationlaw.com>',
      to: [email],
      subject: 'Thank you for contacting Watson Immigration Law',
      html: `
        <h2>Thank you for reaching out, ${name}!</h2>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <p><strong>Your inquiry:</strong> ${visaType || 'General immigration consultation'}</p>
        <p>If you have any urgent questions, please call us at (206) 292-5237.</p>
        <br>
        <p>Best regards,<br>
        Watson Immigration Law Team</p>
      `,
    });

    if (confirmationError) {
      console.warn('Confirmation email failed:', confirmationError);
      // Don't fail the request if confirmation email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}