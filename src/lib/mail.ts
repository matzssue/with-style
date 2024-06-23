import sgMail from '@sendgrid/mail'
import { NextResponse } from 'next/server'

const sendgrid = sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`
  const msg = {
    to: email,
    from: process.env.MAIL_SENDER as string,
    subject: 'Account verification',
    text: `Click the link to verify your account: ${confirmLink}`,
    html: `<p>Click the link to verify your account:</p><a href="${confirmLink}">Verify account</a>`,
  }
  await sgMail.send(msg)
}
