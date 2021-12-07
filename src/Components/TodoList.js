import React, { useState, useEffect, useRef } from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ itemList, updateItemList, openEdit, setOpenEdit }) => {
	const [editItem, setEditItem] = useState("");
	const [selectedItem, setSelectedItem] = useState(null);

	const itemsToUnhideRef = useRef();

	const handleUserInput = (e) => {
		setEditItem(e.target.value);
	};

	const handleDeleteItem = (key) => {
		const newList = itemList.filter((item) => {
			return item.key !== key;
		});

		updateItemList(newList);
	};

	const handleEditItem = (selectedItem) => {
		itemList.filter((item) => {
			if (item.key === selectedItem.key && editItem) {
				return (item.itemBody = editItem);
			}
			return null;
		});
	};

	const openEditInput = () => {
		setOpenEdit(true);
	};

	const closeEditInput = () => {
		setOpenEdit(false);
		updateItemList(itemsToUnhideRef.current);
	};

	const finishedTodoEffectToggle = (e) => {
		const currentDiv = e.currentTarget.classList;
		currentDiv.contains("finished")
			? currentDiv.remove("finished")
			: currentDiv.add("finished");
	};

	useEffect(() => {
		if (!openEdit) itemsToUnhideRef.current = itemList;
	}, [openEdit, itemList]);

	const createNewItem = itemList.map((item) => {
		return (
			<div
				className={"item-container "}
				key={item.key}
				onClick={finishedTodoEffectToggle}
			>
				<TodoItem itemBody={item.itemBody} />
				<div className="icon-container">
					<i
						className="large edit outline icon"
						onClick={() => [
							openEditInput(item),
							setSelectedItem(item),
							setEditItem(item.itemBody),
						]}
						key={item.key}
					></i>
					<i
						className="large close icon"
						onClick={() => handleDeleteItem(item.key)}
					></i>
				</div>
			</div>
		);
	});

	if (openEdit) {
		return (
			<div className="edit-item-container">
				<input
					className="edit-item-input"
					type="text"
					value={editItem}
					onChange={handleUserInput}
					autoFocus
				/>
				<button
					className="edit-item-button"
					onClick={() => [handleEditItem(selectedItem), closeEditInput()]}
				>
					Update
				</button>
			</div>
		);
	}

	return <>{createNewItem}</>;
};

export default TodoList;
