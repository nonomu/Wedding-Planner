const invalidInput = fields => Object.keys(fields).some(i => !fields[i])

export const handleError = input => {
	if (invalidInput(input)) {
		throw new Error('All fields are required')
	}
}

export const validatePassword = (password, confirmPassword) => {
	if (password !== confirmPassword) {
		throw new Error('Password confirmation does not match')
	}
}
