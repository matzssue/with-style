import prisma from '@/lib/prisma';

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verticationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    return verticationToken;
  } catch (error) {}
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verticationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });
    return verticationToken;
  } catch (error) {}
};
