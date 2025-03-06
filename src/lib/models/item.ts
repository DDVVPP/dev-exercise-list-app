import { z } from 'zod'
import { fromError } from 'zod-validation-error'
import prisma from '../prisma'
import { AuthUser } from './user'

type ListItem = {
  id: string
  name: string
  categoryId: string
  photo: string
}

type ListItemDetails = {
  id: string
  name: string
  photo: string
  categoryId: string
  description: string | null
}

export const listMyItems = async (authUser: AuthUser): Promise<ListItem[]> => {
  const items = await prisma.listItem.findMany({ where: { authorId: authUser.id } })
  return items.map((item) => ({ id: item.id, name: item.name, photo: item.photo, categoryId: item.categoryId}))
}

export const getItemDetails = async (
  authUser: AuthUser,
  id: string,
): Promise<ListItemDetails | null> => {
  const listItem = await prisma.listItem.findFirst({ where: { id, authorId: authUser.id } })
  if (!listItem) return null
  return { id: listItem.id, name: listItem.name, photo: listItem.photo, categoryId: listItem.categoryId, description: listItem.description }
}

export const createItem = async (
  authUser: AuthUser,
  name: string,
  photo: string,
  categoryId: string,
  description: string,
): Promise<ListItem> => {
  const schema = z.object({
    name: z.string().trim().min(1),
    photo: z.string().trim().url(),
    categoryId: z.string().trim(),
    description: z.string().trim().optional(),
  })

  const parse = schema.safeParse({ name, photo,categoryId,  description })

  if (!parse.success) {
    throw fromError(parse.error)
  }

  const data = parse.data
  const listItem = await prisma.listItem.create({
    data: { name: data.name, photo: data.photo, categoryId: data.categoryId, description: data.description, authorId: authUser.id },
  })
  return { id: listItem.id, name: listItem.name, photo: listItem.photo, categoryId: listItem.categoryId }
}
