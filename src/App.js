import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import List from './components/List'
import Alert from './components/Alert'

const App = () => {
	const [name, setName] = useState('')
	const [list, setList] = useState([])
	const [alert, setAlert] = useState({ show: false, msg: '', type: '' })
	const [checkEdit, setCheckEdit] = useState(false)
	const [editId, setEditId] = useState(null)

	const submitHandler = (event) => {
		event.preventDefault()

		if (!name) {
			setAlert({ show: true, msg: 'Please enter a value', type: 'error' })
		} else if (checkEdit && name) {
			// Update Item
			const editResult = list.map((item) => {
				if (item.id === editId) {
					return { ...item, title: name }
				}
				return item
			})
			setList(editResult)
			setName('')
			setCheckEdit(false)
			setEditId(null)
			setAlert({ show: true, msg: 'Edited item success', type: 'success' })
		} else {
			const newItem = {
				id: uuidv4(),
				title: name,
			}
			setList([...list, newItem])
			setName('')
			setAlert({ show: true, msg: 'saved value success', type: 'success' })
		}
	}

	const inputNameHandler = (event) => {
		setName(event.target.value)
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			setAlert({ show: false, msg: '', type: '' })
		}, 3000)
		return () => clearTimeout(timeout)
	})

	const removeItemHandler = (id) => {
		const result = list.filter((item) => item.id !== id)
		setList(result)
		setAlert({ show: true, msg: 'Deleted value', type: 'error' })
	}

	const editItemHandler = (id) => {
		setCheckEdit(true)
		setEditId(id)
		const searchItem = list.find((item) => item.id === id)
		setName(searchItem.title)
	}

	return (
		<section className='container'>
			<h1>To-do-list App</h1>
			{alert.show && <Alert {...alert} />}
			<form onSubmit={submitHandler} className='form-group'>
				<div className='form-control'>
					<input
						type='text'
						className='text-input'
						onChange={inputNameHandler}
						value={name}
					/>
					<button type='submit' className='submit-btn'>
						{checkEdit ? 'Edit-Todo' : 'Add-Todo'}
					</button>
				</div>
			</form>
			<section className='list-container'>
				{list.map((data, index) => {
					return (
						<List
							key={index}
							{...data}
							onRemove={removeItemHandler}
							onEdit={editItemHandler}
						/>
					)
				})}
			</section>
		</section>
	)
}

export default App
