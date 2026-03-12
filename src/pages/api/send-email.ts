import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const phone = (data.get('phone') as string) || 'Not provided';
    const message = data.get('message') as string;
    
    // We expect botcheck to be empty. If it's filled, it's a bot.
    const botcheck = data.get('botcheck') as string;
    if (botcheck) {
      return new Response(JSON.stringify({ success: false, message: 'Spam detected' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const userEmail = 'Whitewolffurniture@gmail.com';
    const appPassword = 'pykm ewol mssp rjil';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: userEmail,
        pass: appPassword,
      },
    });

    const mailOptions = {
        from: `"White Wolf Website" <${userEmail}>`,
        to: userEmail,
        replyTo: email,
        subject: `New Inquiry from ${name} — White Wolf Furniture`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                <h2 style="color: #333; border-bottom: 2px solid #caa359; padding-bottom: 10px;">New Project Inquiry</h2>
                <div style="margin-top: 20px;">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                </div>
                <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 6px;">
                    <p style="margin: 0; font-weight: bold; margin-bottom: 10px;">Message Outline:</p>
                    <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
                <div style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
                    This email was sent from the White Wolf Furniture website contact form.
                </div>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true, message: 'Email sent successfully' }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ success: false, message: 'Failed to send email. Please try again later.' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    });
  }
};
