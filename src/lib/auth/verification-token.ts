import prisma from '@/lib/prisma'

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verticationToken = await prisma.verificationToken.findUnique({
      where: { token },
    })
    return verticationToken
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verticationToken = await prisma.verificationToken.findFirst({
      where: { email },
    })
    return verticationToken
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}
