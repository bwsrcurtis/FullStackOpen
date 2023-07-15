

const Notification = ({ successMessage, errorMessage }) => {
	if (successMessage === null && errorMessage === null) {
		return
	}

	if (successMessage) {
		return (
			<div className="success">{successMessage}</div>
		)
	}
	if (errorMessage) {
		return (
			<div className="error">{errorMessage}</div>
		)
	}
}

export default Notification