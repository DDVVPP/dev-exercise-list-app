import prisma from '../prisma'

export type Category = {
  id: string
  name: string
  description: string | null
}

export const getCategories = async (): Promise<Category[] | undefined> => {
  try {
    const categories = await prisma.category.findMany()
    return categories.map((category) => ({id: category.id, name: category.name, description: category.description}))
  } catch (error) {
    console.error('Error returning categories', error)
  }
}
