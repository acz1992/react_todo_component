import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
	const [newItem, setNewItem] = useState("");
	const [todos, setTodos] = useState(() => {
		const localValue = localStorage.getItem("Items");
		if (localValue == null) return [];
		return JSON.parse(localValue);
	});

	useEffect(() => {
		localStorage.setItem("Items", JSON.stringify(todos));
	}, [todos]);
	function handleSubmit(e) {
		e.preventDefault();

		setTodos((currentTodos) => {
			return [
				...currentTodos,
				{ id: crypto.randomUUID(), title: newItem, completed: false },
			];
		});
		setNewItem("");
	}

	function toggleTodo(id, completed) {
		setTodos((currentTodos) => {
			return currentTodos.map((todo) => {
				if (todo.id === id) {
					return { ...todo, completed };
				}

				return todo;
			});
		});
	}

	function deleteTodo(id) {
		setTodos((currentTodos) => {
			return currentTodos.filter((todo) => todo.id !== id);
		});
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="new-item-form" action="">
				<div className="form-row">
					<label htmlFor="">New Item</label>
					<input
						value={newItem}
						onChange={(e) => setNewItem(e.target.value)}
						type="text"
						id="item"
					/>
				</div>
				<button className="btn">Add</button>
			</form>
			<h1 className="header">To Do List</h1>
			<ul className="list">
				{todos.length === 0 && "Nothing to do"}
				{todos.map((todo) => {
					return (
						<li key={todo.id}>
							<label>
								<input
									type="checkbox"
									onChange={(e) =>
										toggleTodo(todo.id, e.target.checked)
									}
								/>
								{todo.title}
							</label>
							<button
								onClick={() => deleteTodo(todo.id)}
								className="btn btn-danger"
							>
								Delete
							</button>
						</li>
					);
				})}
			</ul>
		</>
	);
}
