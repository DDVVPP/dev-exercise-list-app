'use server'

import { createItem } from '@/lib/models/item'
import { getCurrentAuthUser } from '@/lib/models/user'
import { revalidatePath } from 'next/cache'

export const addItemAction = async (formData: FormData): Promise<void> => {
  const authUser = getCurrentAuthUser()
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const photo = formData.get('photo') as string
  await createItem(authUser, name, photo, description)
  revalidatePath('/')
}
