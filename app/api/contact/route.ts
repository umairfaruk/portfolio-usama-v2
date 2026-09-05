import nodemailer from 'nodemailer'
import ejs from 'ejs'
import path from 'path'

const notificationTemplatePath = path.join(process.cwd(), 'emails/contact-notification.ejs')
const acknowledgmentTemplatePath = path.join(process.cwd(), 'emails/contact-acknowledgment.ejs')

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json()

  if (!name || !email || !subject || !message) {
    return Response.json({ error: 'All fields are required.' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  const now = new Date()
  const year = now.getFullYear()

  try {
    const notificationHtml = await ejs.renderFile(notificationTemplatePath, {
      name,
      email,
      subject,
      messageHtml: ejs.escapeXML(message).replace(/\n/g, '<br />'),
      submittedAt: now.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
      replySubject: encodeURIComponent(`Re: ${subject}`),
      year,
    })

    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_TO_EMAIL,
      subject: `[Portfolio Contact] ${subject}`,
      text: `From: ${name} (${email})\n\n${message}`,
      html: notificationHtml,
    })
  } catch (error) {
    console.error('Contact notification email failed:', error)
    return Response.json({ error: 'Failed to send message.' }, { status: 500 })
  }

  try {
    const acknowledgmentHtml = await ejs.renderFile(acknowledgmentTemplatePath, {
      name,
      subject,
      messageExcerpt: message.length > 200 ? `${message.slice(0, 200)}…` : message,
      year,
    })

    await transporter.sendMail({
      from: `"Usama Asif" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Got your message, ${name} — I'll be in touch soon`,
      text: `Hi ${name},\n\nThanks for reaching out! Your message about "${subject}" has been received, and I'll get back to you within 24 hours.\n\nTalk soon,\nUsama Asif`,
      html: acknowledgmentHtml,
    })
  } catch (error) {
    console.error('Acknowledgment email failed:', error)
  }

  return Response.json({ success: true })
}
