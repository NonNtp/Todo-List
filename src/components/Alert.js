import React from 'react'

const Alert = (props) => {
	const { msg, type } = props

	return <p className={`alert ${type}`}>{msg}</p>
}

export default Alert
