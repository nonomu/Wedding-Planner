export const loadBudgetContent = async (wedding, auth) => {
  const userId = auth.id
  await wedding.getBookedVendors(userId)
		if (!wedding.budget) {
			wedding.getWeddingDetails(userId)
		}
}