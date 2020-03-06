import { toast as popup } from 'react-toastify'

export const loadGuestContent = async (auth, wedding, guestManagement) => {
  const userId = auth.id
  if (!wedding.wedding.id) {
    await wedding.getWeddingDetails(userId)
  }
  const weddingId = wedding.wedding.id
  guestManagement.getGuests(weddingId)
  guestManagement.getTables(weddingId)
}

export const loadTableContent = async (auth, wedding, guestManagement) => {
  if (!wedding.wedding.id) {
    const userId = auth.id
    await wedding.getWeddingDetails(userId)
  }
  if (!guestManagement.tables.length) {
    const weddingId = wedding.wedding.id
    guestManagement.getGuests(weddingId)
    guestManagement.getTables(weddingId)
  }
}

export const getRelatedGuests = (guestManagement, relation) => {
  return guestManagement.getRelatedGuests(relation)
}

export const belongsToTable = (guest, tableId) => {
  return guest.tableId === tableId
}


export const addGuestToTable = async (guest, table, manager) => {
  try {
    const addToTable = await manager.addGuestToTable(guest, table)
    popup.success(addToTable)
  } catch (err) {
    popup.error(err.message)
  }
}

export const removeGuestFromTable = async (guest, table, manager) => {
  try {
    const removeFromTable = await manager.removeGuestFromTable(guest, table)
    popup.success(removeFromTable)
  } catch (err) {
    popup.error(err.message)
  }
}

export const getAction = belongsToTable => {
  return belongsToTable ? 'remove_circle' : 'add_circle'
}

export const getIconColor = belongsToTable => {
  return { color: belongsToTable ? 'red' : 'green' }
}