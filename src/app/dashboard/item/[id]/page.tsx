import Image from "next/image";
import { getItemDetails } from '@/lib/models/item'
import { getCurrentAuthUser } from '@/lib/models/user'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button, Typography } from '@mui/material'

export default async function Page({ params }: { params: { id: string } }) {
  const authUser = getCurrentAuthUser()
  const itemDetails = await getItemDetails(authUser, params.id)

  return (
    <Box>
      <Button href={'/dashboard'} startIcon={<ArrowBackIcon />}>
        Back to all items
      </Button>
      {itemDetails ? (
        <>
        <div style={{display: 'flex'}}>
            <Image
              src={itemDetails.photo}
              alt="veggie-image"
              width={300}
              height={0}
              style={{height: 'auto'}}
            />
          </div>
          <Typography variant="h4">{itemDetails.name}</Typography>
          <Typography variant="h6">{itemDetails.categoryName || 'No category'}</Typography>
          <Typography color={itemDetails.description ? 'text.primary' : 'text.secondary'}>
            {itemDetails.description || 'No description'}
          </Typography>
        </>
      ) : (
        <Typography color="text.secondary">Item not found</Typography>
      )}
    </Box>
  )
}
