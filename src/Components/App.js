import React, { useState, useEffect, useRef, useCallback } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import "../Styles/App.css";

const App = () => {
	const [currentItem, setCurrentItem] = useState("");
	const [itemList, updateItemList] = useState([]);
	const [openEdit, setOpenEdit] = useState(false);

	const todoFormInputRef = useRef();

	const addItemToList = useCallback(() => {
		if (!currentItem) {
			return;
		}
		updateItemList([...itemList, { itemBody: currentItem, key: Date.now() }]);
		setCurrentItem("");
	}, [currentItem, itemList]);

	const addItemToListOnEnter = useCallback(
		(e) => {
			if (e.code === "Enter") {
				addItemToList();
			}
		},
		[addItemToList]
	);

	const addKeydownListener = useCallback(() => {
		if (!openEdit || openEdit) {
			document.addEventListener("keydown", addItemToListOnEnter);
			return () => {
				document.removeEventListener("keydown", addItemToListOnEnter);
			};
		}
	}, [addItemToListOnEnter, openEdit]);

	useEffect(() => {
		addKeydownListener();
	}, [addItemToListOnEnter, addKeydownListener]);

	useEffect(() => {}, [itemList]);

	return (
		<div className="app-container">
			<div className="app-wrapper">
				<div className="header-container">
					<h2>What's the plan for today?</h2>
				</div>
				{!openEdit ? (
					<div className="form-container">
						<TodoForm
							currentItem={currentItem}
							setCurrentItem={setCurrentItem}
							addItemToList={addItemToList}
							openEdit={openEdit}
							forwardedRef={todoFormInputRef}
						/>
					</div>
				) : null}
				<div className="todo-list-container">
					<TodoList
						itemList={itemList}
						updateItemList={updateItemList}
						openEdit={openEdit}
						setOpenEdit={setOpenEdit}
					/>
				</div>
			</div>
		</div>
	);
};

export default App;
