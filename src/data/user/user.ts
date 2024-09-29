import prisma from '@/lib/prisma'

export const getuserByEmail = (email: string) => {
  try {
    const user = prisma.user.findUnique({ where: { email } })
    return user
  } catch {
    return null
  }
}
export const getuserById = (id: string) => {
  try {
    const user = prisma.user.findUnique({ where: { id } })
    return user
  } catch {
    return null
  }
}
