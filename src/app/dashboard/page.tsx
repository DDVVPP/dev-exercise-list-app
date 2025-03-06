import { AddItemButton } from '@/components/AddItemButton'
import { getCategories } from '@/lib/models/category'
import { listMyItems } from '@/lib/models/item'
import { getCurrentAuthUser } from '@/lib/models/user'
import { pluralize } from '@/lib/utils'
import { Category } from '@prisma/client'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'

export default async function Home() {
  const authUser = getCurrentAuthUser()
  const items = await listMyItems(authUser)
  const categories = await getCategories()

  return (
    <Stack spacing={2} sx={{ maxWidth: 400 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body1">
          You have{' '}
          <Box component="span" sx={{ fontWeight: 700 }}>
            {items.length.toLocaleString()} {pluralize(items.length, 'item', 'items')}
          </Box>{' '}
          in your list
        </Typography>

        <AddItemButton categories={categories as Category[]}/>
      </Box>
      {items.length > 0 && (
        <Box
          sx={{
            border: 1,
            borderColor: 'grey.200',
            borderRadius: 1,
          }}
        >
          <List disablePadding>
            {items.map((item, index) => (
              <Box key={item.id}>
                <ListItem key={item.id} disableGutters disablePadding>
                  <ListItemButton href={`/dashboard/item/${item.id}`}>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
                {index < items.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Box>
      )}
    </Stack>
  )
}
