export const isBookedCategory = (categories, category) => {
	return categories.some(c => c === category)
}

export const loadPageContent = async (auth, vendors, wedding) => {
	!vendors.vendors.length && vendors.getVendors()
	if (!wedding.wedding.id) {
		await wedding.getWeddingDetails(auth.id)
		const weddingId = wedding.wedding.id
		wedding.getBookedVendors(weddingId)
	}
}

export const loadBookVendorContent = async (vendors, auth, wedding) => {
	if (!vendors._vendors.length) {
		vendors.getVendors()
	}
	if (!wedding.wedding.id) {
		wedding.getWeddingDetails(auth.id)
	}
}
