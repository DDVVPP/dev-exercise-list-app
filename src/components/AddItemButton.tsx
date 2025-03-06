'use client'

import { addItemAction } from '@/app/actions'
import { formatErrorMessage } from '@/lib/utils'
import { Add } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material'
import { Category } from '@prisma/client'

import { useSnackbar } from 'notistack'
import { useState } from 'react'

export const AddItemButton = ({categories}: {categories: Category[]}) => {
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)
  const [categoryId, setCategoryId] = useState('');

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }
    const handleChange = (event: SelectChangeEvent) => {
    setCategoryId(event.target.value as string);
  };

  const handleSubmit = async (formData: FormData) => {

    try {
      await addItemAction(formData)
    } catch (error) {
      enqueueSnackbar(formatErrorMessage(error), { variant: 'error' })
      return
    }

    handleClose()
  }

  return (
    <>
      <Button onClick={handleOpen} variant="outlined" startIcon={<Add />}>
        Add item
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth>
        <form action={handleSubmit}>
          <DialogTitle>Add an item to the list</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ my: 2 }}>
              <TextField name="name" label="Name" fullWidth />
              <TextField name="photo" label="Photo URL" fullWidth />

              {categories.length > 0 && (
                <FormControl fullWidth>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId='category-label'
                    id="categoryId"
                    name='categoryId'
                    fullWidth
                    value={categoryId}
                    label="Category"
                    onChange={handleChange}
                  >
                    {
                      categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))
                    }
                </Select>
              </FormControl>
              )}

              <TextField
                name="description"
                label="Description"
                fullWidth
                multiline={true}
                rows={4}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
