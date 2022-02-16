import React from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'

const List = (props) => {
	const { id, title, onRemove, onEdit } = props

	return (
		<div className='list-item'>
			<p className='title'>{title}</p>
			<div className='button-container'>
				<BiEdit onClick={() => onEdit(id)} className='btn' />
				<BiTrash onClick={() => onRemove(id)} className='btn' />
			</div>
		</div>
	)
}

export default List
