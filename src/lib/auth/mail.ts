import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/auth/new-verification?token=${token}`
  const msg = {
    to: email,
    from: process.env.MAIL_SENDER as string,
    subject: 'Account verification',
    text: `Click the link to verify your account: ${confirmLink}`,
    html: `<p>Click the link to verify your account:</p><a href="${confirmLink}">Verify account</a>`,
  }
  await sgMail.send(msg)
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/auth/new-password?token=${token}`
  const msg = {
    to: email,
    from: process.env.MAIL_SENDER as string,
    subject: 'Reset email',
    text: `Click the link to reset your password: ${resetLink}`,
    html: `<p>Click the link to reset your:</p><a href="${resetLink}">Password</a>`,
  }

  await sgMail.send(msg)
}
